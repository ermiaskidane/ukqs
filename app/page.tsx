import { onGetUser } from "@/actions/auth"
import Home from "@/components/global/home"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function HomePage() {

  const session = await auth.api.getSession({
    headers: await headers()
})

// if(session){
//   redirect("/admin/dashboard")
// }
  const client = new QueryClient()

  await client.prefetchQuery({
    queryKey: ["get-user"],
    queryFn: () => onGetUser(),
  })

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <main className="flex-1">
        <Home session={session?.user} />
      </main>
    </HydrationBoundary>      
  )
}

