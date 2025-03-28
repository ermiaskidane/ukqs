import dynamic from 'next/dynamic'
import { Lock } from "lucide-react"
import VerifyForm from '@/components/forms/verifyForm'

// const VerifyForm = dynamic(() => import("@/components/forms/verifyForm"), {
//   ssr: false
// })

export default function VerifyPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1 px-4 py-12 md:px-6">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              e-Certificate And Verification <Lock className="inline-block h-6 w-6 text-yellow-500" />
            </h1>
            <p className="text-gray-500">Enter your details below to verify your certificate</p>
          </div>
          <VerifyForm />
        </div>
      </main>
    </div>
  )
}

