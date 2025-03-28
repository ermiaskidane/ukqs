"use server"

import { verifyFormSchema } from "@/components/forms/verifyForm/schema"
import { client } from "@/lib/prisma"
import { z } from "zod"

export const onVerifyCertificate = async (data: z.infer<typeof verifyFormSchema>) => {

  try {
    const { fullName, certificateNumber, learnerReferenceNumber } = data

    if (!certificateNumber) {
      return { status: 400, message: "Certificate number is required" }
    }

    const certificate = await client.certificate.findUnique({
      where: { certificateNumber, learnerReferenceNumber },
    })
    
    if (!certificate) { 
      return { status: 404, message: "Certificate not found" }
    }

    return { status: 200, certificate, message: "Certificate verified successfully", }
  } catch (error) {
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

// PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in ``). If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report