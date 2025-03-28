import { onGetCertificateByID } from "@/actions/certificate"
import StudentCertificate from "@/components/global/certificate"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
// import type { Certificate } from "@/lib/types"

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const client = new QueryClient()

  await client.prefetchQuery({
    queryKey: ["certificate-by-id"],
    queryFn: () => onGetCertificateByID(id)
  })


  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="container mx-auto px-4 py-12">
        <StudentCertificate params={id} />
      </div>
    </HydrationBoundary>
  )
}

