"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query";
import { onGetUser } from "@/actions/auth";
import { cn } from "@/lib/utils";

const Home = ({ session }: { session: any }) => {

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => onGetUser(),
  })

  // console.log("user", user)
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to UKQS E-Certificate System
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            Verify your certificate or check your course completion status.
          </p>
        </div>
        <div className="space-x-4">
          <Link href="/verify">
            <Button className="cursor-pointer">Verify Certificate</Button>
          </Link>
          {session ? (
            <Link href="/admin/dashboard">
              <Button variant="outline" className="cursor-pointer">Admin Dashboard</Button>
            </Link>
          ): (
            <Link href="/sign-in">
              <Button variant="outline" className="cursor-pointer">Admin Login</Button>
            </Link>
          )}
          {/* {(user?.user?.role === "ADMIN" || user?.user?.role === "AGENT") && (
            <Link href="/admin/dashboard">
              <Button variant="outline">Admin Dashboard</Button>
            </Link>
          )}
            <Link href="/sign-in" className={cn(user?.user && "hidden")}>
              <Button variant="outline">Admin Login</Button>
            </Link> */}
        </div>
      </div>
    </div>
  )
};

export default Home;