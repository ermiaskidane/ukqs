import { onGetCertificateByID } from "@/actions/certificate";
import CertificateForm from "@/components/forms/certificates"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function NewCertificatePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }>}) {

  const {id} = await searchParams

  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["certificate-by-id"],
    queryFn: () => onGetCertificateByID(id)
  })
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <main className="flex-1 px-4 py-8 md:px-6">
        <CertificateForm />
      </main>
    </HydrationBoundary>
  )
}

