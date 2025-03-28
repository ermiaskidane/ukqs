"use client"
import { useRouter } from "next/navigation"
import { useStudentCertificate } from "@/hooks/studentCertificate"
import { Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"  

type CertificateProps = {
  params: string
}

const StudentCertificate = ({ params }: CertificateProps) => {
  const { certificate, handleDownload, isLoading, router } = useStudentCertificate(params)

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    )
  }

  if (!certificate?.certificate) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Certificate not found</h1>
          <p className="mt-2 text-gray-500">The certificate you are looking for does not exist.</p>
          <Button className="mt-4" onClick={() => router.push("/verify")}>
            Go back to verification
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.push("/verify")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to verification
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>

        <Card className="border-2 border-blue-900">
          <CardContent className="p-0">
            <div className="certificate-container p-8">
              <div className="certificate-header flex justify-between items-center border-b pb-4">
                <img src="/logo.png" alt="UKQS Logo" className="h-16 w-auto" />
                <div className="text-right">
                  <h2 className="text-xl font-bold text-blue-900">UK QUALIFICATIONS FOR SKILLS</h2>
                  <p className="text-sm text-gray-500">Certificate of Achievement</p>
                </div>
              </div>

              <div className="certificate-body py-8 text-center">
                <h1 className="text-2xl font-bold mb-6">CERTIFICATE</h1>
                <p className="text-lg mb-4">This is to certify that</p>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">{certificate.certificate.candidateName}</h2>
                <p className="text-lg mb-6">has successfully completed</p>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{certificate.certificate.courseTitle}</h3>
                <p className="text-lg mb-2">Level: {certificate.certificate.level}</p>
                <p className="text-lg mb-6">Awarded on: {new Date(certificate.certificate.awardDate).toLocaleDateString()}</p>

                <div className="certificate-details mt-8 grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-gray-500">Certificate Number:</p>
                    <p className="font-medium">{certificate.certificate.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Learner Reference Number:</p>
                    <p className="font-medium">{certificate.certificate.learnerReferenceNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Centre:</p>
                    <p className="font-medium">{certificate.certificate.centreName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country:</p>
                    <p className="font-medium">{certificate.certificate.country}</p>
                  </div>
                </div>
              </div>

              <div className="certificate-footer border-t pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Verified at: ukqs.org.uk/verify</p>
                </div>
                <div className="text-right">
                  <img src="/signature.png" alt="Signature" className="h-12 w-auto mb-2" />
                  <p className="text-sm font-medium">Director of Certification</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export default StudentCertificate
