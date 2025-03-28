import { onGetUser } from "@/actions/auth"
import { onGetCertificates } from "@/actions/certificate"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prisma"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const User = await client.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      role: true,
    },
  })

  if(User?.role !== "ADMIN" && User?.role !== "AGENT"){
    redirect("/")
  }

  const clients = new QueryClient()

  await clients.prefetchQuery({
    queryKey: ["get-certificates"],
    queryFn: () => onGetCertificates(),
  })

  await clients.prefetchQuery({
    queryKey: ["get-user"],
    queryFn: () => onGetUser(),
  })

  return (
    <HydrationBoundary state={dehydrate(clients)}>
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    </HydrationBoundary>
  )
}

export default AdminLayout
