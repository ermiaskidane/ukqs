import { onVerifyCertificate } from "@/actions/verify"
import { verifyFormSchema } from "@/components/forms/verifyForm/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import { z } from "zod"

export const useVerify = () => {
  const router = useRouter()
  const client = useQueryClient()
  // const [verifyValues, setVerifyValues] = useState<z.infer<typeof verifyFormSchema>>({
  //   fullName: "",
  //   learnerReferenceNumber: "",
  //   certificateNumber: "",
  // })

  const form = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      fullName: "",
      learnerReferenceNumber: "",
      certificateNumber: "",
    },
  })

  // const { data: verifyCertificate, isLoading: isVerifyingCertificate, isError, isSuccess } = useQuery({
  //   queryKey: ["verify-certificate", verifyValues],
  //   queryFn: async () => {
  //     return await onVerifyCertificate(verifyValues)
  //   },
  //   // onSuccess: (data) => {
  //   //   if (data?.status === 200) {
  //   //     toast.success("Success", {
  //   //       description: data?.message || "Certificate verified successfully",
  //   //     })
  //   //   }
  //   // },
  //   // onError: (error) => {
  //   //   toast.error("Error", {
  //   //     description: error?.message || "Failed to verify certificate",
  //   //   })
  //   // },
  //   enabled: !!verifyValues.certificateNumber,
  // })

  // if (isSuccess) {
  //   toast.success("Success", {
  //     description: verifyCertificate?.message || "Certificate verified successfully",
  //   })
  // }

  // if (isError) {
  //   toast.error("Error", {
  //     description: verifyCertificate?.message || "Failed to verify certificate",
  //   })
  // }

  const { mutate: verifyCertificate, isPending: isVerifyingCertificate } = useMutation({
    mutationKey: ["verify-certificate"],
    mutationFn: async (data: z.infer<typeof verifyFormSchema>) => {
      return await onVerifyCertificate(data)
    },
    onSuccess: (data) => {
      if (data?.status === 200 && data.certificate) {
        toast.success("Success", {
          description: data?.message || "Certificate verified successfully",
        })
        router.push(`/certificate/${data.certificate.id}`)
      } else {
        toast.error("Error", {
          description: data?.message || "Failed to verify certificate",
        })
      }
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: ["get-certificates"],
      })
    }
  })

  async function onSubmit(values: z.infer<typeof verifyFormSchema>) {

    await verifyCertificate(values)
    console.log("::::::::::::::::::", values)
  }

  return { form, onSubmit, isVerifyingCertificate, verifyCertificate }
}


