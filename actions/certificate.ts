"use server"

import { CertificateFormSchema } from "@/components/forms/certificates/schema"
import { auth } from "@/lib/auth"
import { client } from "@/lib/prisma"
import { headers } from "next/headers"


export const onGetCertificates = async () => {

  try {
    const session =  await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) {
      throw new Error("Unauthorized")
    }

    const userRole = await client.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        role: true
      }
    })

    if (userRole?.role !== "ADMIN" && userRole?.role !== "AGENT") return { status: 403, message: "Unauthorized" }

    const certificates = await client.certificate.findMany({
      where: {
        ...(userRole?.role === "AGENT" && {
          userId: session.user.id
        })
      },
      include: {
        user: true
      }
    })
    return { status: 200, certificates }
  } catch (error) {
    console.error("Error fetching certificates:", error)
    throw new Error("Failed to fetch certificates")
  }
}

export const onDeleteCertificate = async (id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if(!session) return { status: 404, message: "Session not found" };

    const userRole = await client.user.findUnique({
      where: {
        id: session.session.userId
      }
    });

    if (userRole?.role === "USER") return { status: 400, message: "Unauthorized" };

    const certificate = await client.certificate.findUnique({
      where: {
        id
      }
    })      

    if (!certificate) return { status: 404, message: "Certificate not found" };

    await client.certificate.delete({
      where: {
        id
      }
    })

    return { status: 200, message: "Certificate deleted successfully" }
  } catch (error) {
    console.error("Error deleting certificate:", error)
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

export const onGetCertificateByID = async (id:  string | undefined) => {
  try {
    // const session = await auth.api.getSession({
    //   headers: await headers()
    // })

    // if (!session?.user) {
    //   throw new Error("Unauthorized")
    // }

    if (!id) return { status: 404, message: "Certificate ID not found" }
    
    const certificate = await client.certificate.findUnique({
      where: {  
        id
      }
    })

    if (!certificate) return { status: 404, message: "Certificate not found" }  

    return { status: 200, certificate }
  } catch (error) {
    console.error("Error fetching certificate:", error)
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

export const onUpdateCertificate = async (data: CertificateFormSchema) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user) return { status: 404, message: "Session not found" };

    const userRole = await client.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        role: true
      }
    })

    if (userRole?.role !== "ADMIN" && userRole?.role !== "AGENT") return { status: 403, message: "Unauthorized" }

    const certificate = await client.certificate.findUnique({
      where: {
        id: data.id
      }
    })

    if (!certificate) return { status: 404, message: "Certificate not found" }

    const updatedCertificate = await client.certificate.update({
      where: {
        id: data.id
      },
      data: {
        ...data
      }
    })

    return { status: 200, message: "Certificate updated successfully" }
  } catch (error) {
    console.error("Error updating certificate:", error)
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

export const onCreateCertificate = async (data: CertificateFormSchema) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })  

    if (!session?.user) return { status: 404, message: "Session not found" };

    const userRole = await client.user.findUnique({
      where: {
        id: session.user.id
      },
      select: {
        role: true
      }
    })

    if (userRole?.role !== "ADMIN" && userRole?.role !== "AGENT") return { status: 403, message: "Unauthorized" }

    const newCertificate = await client.certificate.create({
      data: {
        ...data
      }
    })

    return { status: 200, message: "Certificate created successfully" }
  } catch (error) {
    console.error("Error creating certificate:", error)
    return { 
      status: 400, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    }
  }
}

