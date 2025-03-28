import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { toast } from "sonner"
import { loginFormSchema } from "@/components/forms/adminForm/schema"

export const useAdmin = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)

    console.log(values)
    // try {
    //   // In a real application, this would be an API call to authenticate
    //   // For demo purposes, we'll just simulate a successful login
    //   await new Promise((resolve) => setTimeout(resolve, 1000))

    //   // Redirect to admin dashboard
    //   router.push("/admin/dashboard")

    //   toast.success("Login successful", {
    //     // title: "Login successful",
    //     description: "Welcome to the admin dashboard.",
    //   })
    // } catch (error) {
    //   toast.error("Login failed", {
    //     // title: "Login   failed",
    //     description: "Invalid email or password. Please try again.",
    //     // variant: "destructive",
    //   })
    // } finally {
    //   setIsLoading(false)
    // }
  }
  return { form, onSubmit, isLoading }
}

