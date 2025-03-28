"use client"

import Link from "next/link"
import { Download, Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDashboard } from "@/hooks/dashborad"
import DiscoverLoading from "@/app/admin/dashboard/loading"
import { ConfirmationModal } from "@/components/ui/confirmation-modal"

const Dashboard = () => {
  const { 
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
    handleDelete,
    isDeleteModalOpen,
    selectedCertificateId,
    setIsDeleteModalOpen,
    isDeleting,
    handleConfirmDelete
  } = useDashboard()

  console.log(certificates)

  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <h1 className="text-2xl font-bold">Certificate Management</h1>
          <div className="flex flex-col w-full md:flex-row gap-2 md:justify-end">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              id="csv-import"
              onChange={(e) => handleImportCSV(e)}
            />
            <Button variant="outline" className="cursor-pointer" onClick={() => document.getElementById('csv-import')?.click()}>
              <Download className="mr-2 h-4 w-4" /> Import CSV
            </Button>
            <Button variant="default" className="cursor-pointer" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Link href="/admin/certificates/new" className="w-full md:w-auto">
              <Button className="w-full cursor-pointer">
                <Plus className="mr-2 h-4 w-4" /> Add Certificate
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name, certificate number or reference number..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading certificates...</div>
          // <DiscoverLoading />
        ) : paginatedCertificates?.length === 0 ? (
          <div className="text-center py-8">
            {searchQuery ? "No certificates match your search" : "No certificates found"}
          </div>
        ) : (
          <>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate No.</TableHead>
                    <TableHead>Candidate Name</TableHead>
                    <TableHead className="hidden md:table-cell">Course Title</TableHead>
                    <TableHead className="hidden md:table-cell">Award Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Centre</TableHead>
                    <TableHead className="hidden lg:table-cell">Learner Reference Number</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCertificates?.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="font-medium">{certificate.certificateNumber}</TableCell>
                      <TableCell>{certificate.candidateName}</TableCell>
                      <TableCell className="hidden md:table-cell">{certificate.courseTitle}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(certificate.awardDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{certificate.centreName}</TableCell>
                      <TableCell className="hidden lg:table-cell">{certificate.learnerReferenceNumber}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/certificates/new?id=${certificate.id}`}>
                            <Button variant="ghost" size="icon" className="cursor-pointer">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="cursor-pointer"
                            onClick={() => handleDelete(certificate.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-1 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center mx-2">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Property"
        description="Are you sure you want to delete this property? This action cannot be undone."
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  )
}

export default Dashboard