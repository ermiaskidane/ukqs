import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { CertificateFormSchema, certificateFormSchema } from "@/components/forms/certificates/schema"
import { onGetUsers } from "@/actions/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { onCreateCertificate, onGetCertificateByID, onUpdateCertificate } from "@/actions/certificate"

export const useCertificates = () => {
  const router = useRouter()
  const client = useQueryClient()
  const [certificateId, setCertificateId] = useState<string | null>(null)
  // const [users, setUsers] = useState<User[]>([])
  // const [isLoadingUsers, setIsLoadingUsers] = useState(true)

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => onGetUsers(),
  })

  const { data: certificates, isLoading: isLoadingCertificates } = useQuery({
    queryKey: ["certificate-by-id"],
    queryFn: () => onGetCertificateByID(certificateId ?? ""),
    enabled: !!certificateId
  })

  // Start with minimal default values
  const defaultValues: Partial<CertificateFormSchema> = {
    centreNo: "",
    centreName: "",
    country: "",
    candidateName: "",
    courseTitle: "",
    level: "",
    certificateNumber: "",
    learnerReferenceNumber: "",
    userId: "",
  }

  const loadCertificateData = (certificateId: string) => {
    setCertificateId(certificateId)
  }

  // Reset form to empty state
  const resetForm = () => {
    // Only set propertyId to null if it's not already null
    // This prevents triggering the useEffect again
    if (certificateId !== null) {
      setCertificateId(null);
    }
    form.reset(defaultValues);
    
    // // Optionally select a default agent if available
    // if (Agents?.allAgents && Agents.allAgents.length > 0) {
    //   setSelectedAgent(Agents.allAgents[0] as AgentWithUser);
    //   form.setValue("agentId", Agents.allAgents[0].id);
    // }
  };

  const form = useForm<CertificateFormSchema>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues
  })

  const { mutate: createMutation, isPending: isCreatingCertificate } = useMutation({
    mutationKey: ["create-certificate"],
    mutationFn: async (data: CertificateFormSchema) => {
      return await onCreateCertificate(data)
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
      return await client.invalidateQueries({
        queryKey: ["get-certificates"],
      })
    },
  })  

  const { mutate: updatedMutation, isPending: isUpdatingCertificate } = useMutation({
    mutationKey: ["update-certificate"],
    mutationFn: async(data: CertificateFormSchema) => {
       return await onUpdateCertificate(data);
    },
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success("Success", {
          description: data?.message || "Property updated successfully",
        })
        router.push('/admin/dashboard')
      } else {
        toast.error("Error", {
          description: data?.message || "Failed to update property",
        })
      }
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["get-certificates", "certificate-by-id"],
      });
    },
  })

  async function onSubmit(values: CertificateFormSchema) {
    try {

      const formattedValues = {
        ...values,
        id: certificateId || undefined
      }

      if(certificateId){
        await updatedMutation(formattedValues)
      } else {
        await createMutation(values)
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while creating the certificate.")
    }
  }

  useEffect(() => {
    if (certificates?.certificate) {
      const certificate = certificates.certificate;
      
      // Reset form with new values
      form.reset({
        id: certificate.id,
        centreNo: certificate.centreNo,
        centreName: certificate.centreName,
        country: certificate.country,
        candidateName: certificate.candidateName,
        dateOfBirth: certificate.dateOfBirth,
        courseTitle: certificate.courseTitle,
        level: certificate.level,
        awardDate: certificate.awardDate,
        certificateNumber: certificate.certificateNumber,
        learnerReferenceNumber: certificate.learnerReferenceNumber,
        userId: certificate.userId,
      });
    }
  }, [certificates, form]);

  return {
    form,
    onSubmit,
    users,
    isLoadingUsers,
    isLoadingCertificates,
    isCreatingCertificate,
    isUpdatingCertificate,
    router,
    loadCertificateData,
    resetForm,
  }
}

