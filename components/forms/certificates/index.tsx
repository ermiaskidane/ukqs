"use client"

import React, { useEffect, useRef } from 'react'
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useCertificates } from '@/hooks/certificates'
import { useRouter, useSearchParams } from 'next/navigation'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


const CertificateForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const certificateId = searchParams.get('id')
  const isEditMode = !!certificateId

  const initialRenderRef = useRef(true)

  const { 
    form, 
    onSubmit, 
    users, 
    isLoadingUsers, 
    isCreatingCertificate,
    isUpdatingCertificate,
    loadCertificateData, 
    resetForm 
  } = useCertificates()

  // Load property data if in edit mode
  useEffect(() => {
    if (isEditMode && certificateId) {
      loadCertificateData(certificateId)

      // Reset the initialRenderRef when propertyId changes
      initialRenderRef.current = true
    } else {
      // Only reset the form once when the component mounts without a propertyId
      // This prevents infinite loops
      if (initialRenderRef.current) {
        resetForm()
        initialRenderRef.current = false
      }
    }
  }, [isEditMode, certificateId, loadCertificateData, resetForm])

  const eighteenYearsAgo = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())
  const maxDate = new Date(new Date().getFullYear() - 120, new Date().getMonth(), new Date().getDate())

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{isEditMode ? "Edit Certificate" : "Add New Certificate"}</h1>
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
          Cancel
        </Button>
      </div>

      <div className="border rounded-lg p-4 sm:p-6 shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6">
              <FormField
                control={form.control}
                name="centreNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centre No</FormLabel>
                    <FormControl>
                      <Input placeholder="IT202501" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="centreName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centre Name</FormLabel>
                    <FormControl>
                      <Input placeholder="UKQS Training Centre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="United Kingdom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="candidateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Candidate Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                    <div className="relative">
                      <DatePicker
                        selected={field.value}
                        onChange={(date: Date) => field.onChange(date)}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        showMonthDropdown
                        dateFormat="MMMM d, yyyy"
                        maxDate={eighteenYearsAgo}
                        minDate={maxDate}
                        placeholderText="Select your birth date"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        wrapperClassName="w-full"
                        popperClassName="react-datepicker-right"
                        customInput={
                          <div className="flex w-full cursor-pointer items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                            <input
                              value={field.value ? format(field.value, "MMMM d, yyyy") : ""}
                              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                              placeholder="Select your birth date"
                              readOnly
                            />
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </div>
                        }
                      />
                    </div>
                      {/* <DateOfBirthPicker 
                        value={field.value} 
                        onChange={field.onChange} 
                        disabled={isCreatingCertificate || isUpdatingCertificate} 
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Advanced Web Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="Level 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="awardDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Award Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certificateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Number</FormLabel>
                    <FormControl>
                      <Input placeholder="UKQS202501" {...field} />
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
                    <FormLabel>Learner Reference Number</FormLabel>
                    <FormControl>
                      <Input placeholder="LRN202501" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Assign to User</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoadingUsers}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingUsers ? (
                          <SelectItem value="loading" disabled>
                            Loading users...
                          </SelectItem>
                        ) : users?.users?.length === 0 ? (
                          <SelectItem value="none" disabled>
                            No users found
                          </SelectItem>
                        ) : (
                          users?.users?.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name} ({user.email})
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingCertificate || isUpdatingCertificate}>
                {isEditMode ? "Update certificate" : "Create Certificate"}
              </Button>
            </div>
          </form>
        </Form>

        {/* <BirthDateForm /> */}
      </div>
    </div>
  )
}

export default CertificateForm
