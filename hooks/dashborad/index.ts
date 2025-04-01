import { useState, useEffect } from "react"
import { Certificate } from "@/types/certificate"
import { onCreateCertificate, onDeleteCertificate, onGetCertificates, onCreateManyCertificate    } from "@/actions/certificate"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CertificateFormSchema } from "@/components/forms/certificates/schema"

export const useDashboard = () => {
  const router = useRouter()
  const queryClient = new QueryClient()
  
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCertificateId, setSelectedCertificateId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10

  const { data: certificates, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["certificates"],
    queryFn: () => onGetCertificates(),
  })


  const handleDelete = (id: string) => {
    setIsDeleteModalOpen(true)
    setSelectedCertificateId(id)
  }

  // Filter certificates based on search query
  const filteredCertificates = certificates?.certificates?.filter(
    (cert) =>
      cert.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.learnerReferenceNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil((filteredCertificates?.length ?? 0) / itemsPerPage)
  const paginatedCertificates = filteredCertificates?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryParams = new URLSearchParams()

    queryParams.set("search", e.target.value)
    queryParams.set("page", currentPage.toString())

    router.push(`/admin/dashboard?${queryParams.toString()}`)

    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on new search
  }

  const handleConfirmDelete = async () => {
    if (!selectedCertificateId) return

    setIsDeleting(true);

    try {
      const response = await onDeleteCertificate(selectedCertificateId)

      if (response.status === 200) {
        toast.success("Success", {
          description: response.message || "Certificate deleted successfully"
        })

        await queryClient.invalidateQueries({ queryKey: ["get-certificates"] });
        router.push("/admin/dashboard")
        router.refresh();
      } else {
        toast.error("Error", {
          description: response.message || "Failed to delete Certificate"
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred"
      });
      console.error("Error deleting certificate:", error)
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }

    // const response = await onDeleteCertificate(selectedCertificateId)
  }

  const { mutate: createManyMutation, isPending: isCreatingCertificate } = useMutation({
    mutationKey: ["createMany-certificate"],
    mutationFn: async (data: CertificateFormSchema[]) => {
      return await onCreateManyCertificate(data)
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("Success", {
          description: data?.message || "Certificate created successfully",
        })
        router.push('/admin/dashboard')
      } else {
        toast.error("Error", {
          description: data?.message || "Failed to create Certificate",
        })
      }
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["get-certificates"],
      })
    },
  }) 

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      // console.log("Raw CSV text:", text);

      // Split by newlines and handle different line endings
      const rows = text
        .split(/\r?\n/)
        .filter(row => row.trim()) // Remove empty rows
        .map(row => {
          // Split by comma, but respect quoted values
          const cells = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          return cells.map(cell => cell.replace(/^"|"$/g, '').trim());
        });

      // Remove header row
      const headers = rows[0];

      // Filter out rows that don't match header count and remove empty rows
      const data = rows.slice(1)
        .filter(row => row.length === headers.length && row.some(cell => cell.trim() !== ''));

      // Validate headers
      const expectedHeaders = [
        "ID",
        "Number",  // Certificate Number
        "Name",    // Candidate Name
        "Number",  // Learner Reference Number
        "Name",    // Centre Name
        "Number",  // Centre Number
        "Title",   // Course Title
        "Level",
        "Country",
        "Birth",   // Date of Birth
        "Date",    // Award Date
        "At",      // Created At
        "At",      // Updated At
        "ID",      // User ID
        "Name",    // User Name
        "Email"    // User Email
      ];

      // Log the actual headers we received
      console.log("Received headers:", headers);
      console.log("Expected headers:", expectedHeaders);

      // Case-insensitive header matching
      const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
      const normalizedExpectedHeaders = expectedHeaders.map(h => h.toLowerCase().trim());
      
      const missingHeaders = normalizedExpectedHeaders.filter(expectedHeader => 
        !normalizedHeaders.some(actualHeader => actualHeader === expectedHeader)
      );

      if (missingHeaders.length > 0) {
        toast.error("Invalid CSV format", {
          description: `Missing required columns: ${missingHeaders.map(h => 
            expectedHeaders[normalizedExpectedHeaders.indexOf(h)]
          ).join(', ')}`
        });
        return;
      }

      // Transform data to match API format
      const certificates = data.map(row => {
        // Parse dates from the CSV format (DD/MM/YYYY, HH:mm:ss)
        const parseDate = (dateStr: string) => {
          const [datePart, timePart] = dateStr.split(', ');
          const [day, month, year] = datePart.split('/');
          const [hours, minutes, seconds] = timePart ? timePart.split(':') : ['00', '00', '00'];
          
          // Create and return Date object
          return new Date(
            parseInt(year),
            parseInt(month) - 1, // months are 0-based in JavaScript
            parseInt(day),
            parseInt(hours),
            parseInt(minutes),
            parseInt(seconds)
          );
        };

        return {
          centreNo: row[5],
          centreName: row[4],
          country: row[8],
          candidateName: row[2],
          dateOfBirth: parseDate(row[9]),
          courseTitle: row[6],
          level: row[7],
          awardDate: parseDate(row[10]),
          certificateNumber: row[1],
          learnerReferenceNumber: row[3],
          userId: row[13]
        };
      });

      console.log("Transformed certificates:", certificates);

      await createManyMutation(certificates)
      
      if (certificates.length === 0) {
        toast.error("No valid data found", {
          description: "The CSV file appears to be empty or contains no valid rows"
        });
        return;
      }

      toast.success("CSV file processed successfully", {
        description: `Found ${certificates.length} certificates to import`
      });

      // Reset file input
      e.target.value = '';
    } catch (error) {
      console.error("CSV Import Error:", error);
      toast.error("Failed to import CSV file", {
        description: "Please check the file format and try again"
      });
    }
  }

  const handleExportCSV = () => {
    if (!certificates?.certificates || certificates.certificates.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      // Define CSV headers
      const headers = [
        "ID",
        "Certificate Number",
        "Candidate Name",
        "Learner Reference Number",
        "Centre Name",
        "Centre Number",
        "Course Title",
        "Level",
        "Country",
        "Date of Birth",
        "Award Date",
        "Created At",
        "Updated At",
        "User ID",
        "User Name",
        "User Email"
      ];

    // Convert certificates to CSV rows
    const csvRows = certificates.certificates.map((cert: any) => [
      cert.id,
      cert.certificateNumber,
      cert.candidateName,
      cert.learnerReferenceNumber,
      cert.centreName,
      cert.centreNo,
      cert.courseTitle,
      cert.level,
      cert.country,
      // new Date(cert.dateOfBirth).toLocaleDateString(),
      // new Date(cert.awardDate).toLocaleDateString(),
      new Date(cert.dateOfBirth).toLocaleString(),
      new Date(cert.awardDate).toLocaleString(),
      new Date(cert.createdAt).toLocaleString(),
      new Date(cert.updatedAt).toLocaleString(),
      cert.userId,
      cert.user.name,
      cert.user.email
    ]);

    console.log("csvRows", csvRows)
    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    console.log("csvContent", csvContent)

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `certificates_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL object
    URL.revokeObjectURL(url);

    toast.success("CSV file downloaded successfully");
    } catch (error) {
      console.error("CSV Export Error:", error);
      toast.error("Failed to export certificates");
    }
    
  }

  return {
    setCurrentPage,
    certificates,
    isLoading,
    searchQuery,
    currentPage,
    totalPages,
    handleSearch,
    handleExportCSV,
    handleImportCSV,
    paginatedCertificates,
    isDeleteModalOpen,
    selectedCertificateId,
    handleDelete,
    setIsDeleteModalOpen,
    isDeleting,
    handleConfirmDelete
  }
}
