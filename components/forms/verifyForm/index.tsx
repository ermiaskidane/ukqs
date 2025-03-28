"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useVerify } from "@/hooks/verify"

const VerifyForm = () => {
  const { form, onSubmit, isVerifyingCertificate } = useVerify()
  return (
    <div className="border rounded-lg p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="learnerReferenceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learner's Reference Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your reference number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="certificateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Learner's Certificate Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your certificate number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full cursor-pointer" disabled={isVerifyingCertificate}>
                  {isVerifyingCertificate ? "Verifying..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
  )
}

export default VerifyForm