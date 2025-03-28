"use server"

import { auth } from "@/lib/auth"
import { client } from "@/lib/prisma"
import { headers } from "next/headers"

export const onGetUser = async () => {
  try{
    const session = await auth.api.getSession({
      headers: await headers()
  })

  const user = await client.user.findUnique({
    where: {
      id: session?.user.id
    },
  })

  return {status: 200, user}
  } catch(error){ 
    return {
      status: 400,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}

export const onGetUsers = async () => {
  try{
    const users = await client.user.findMany()
    
    if(!users) return {status: 404, message: "No users found"}

    return {status: 200, users}

  } catch(error){
    return {
      status: 400,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}
      
