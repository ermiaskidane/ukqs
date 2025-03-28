import { onGetCertificateByID } from "@/actions/certificate"
import { generatePDF } from "@/lib/pdf-generator"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useStudentCertificate = (params: string) => {
  const router = useRouter()

  const { data: certificate, isLoading} = useQuery({
    queryKey: ["certificate-by-id"],
    queryFn: () => onGetCertificateByID(params)
  })

  const handleDownload = async () => {
    if (!certificate?.certificate) return
    await generatePDF(certificate.certificate)
  }

  return {
    certificate,
    isLoading,
    handleDownload,
    router,
  }
}
