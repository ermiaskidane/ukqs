import { z } from "zod";

export const certificateFormSchema = z.object({
  id: z.string().optional(),
  centreNo: z.string().min(1, { message: "Centre number is required" }),
  centreName: z.string().min(1, { message: "Centre name is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  candidateName: z.string().min(1, { message: "Candidate name is required" }),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  courseTitle: z.string().min(1, { message: "Course title is required" }),
  level: z.string().min(1, { message: "Level is required" }),
  awardDate: z.date({ required_error: "Award date is required" }),
  certificateNumber: z.string().min(1, { message: "Certificate number is required" }),
  learnerReferenceNumber: z.string().min(1, { message: "Learner reference number is required" }),
  userId: z.string().min(1, { message: "User is required" }),
})

export type CertificateFormSchema = z.infer<typeof certificateFormSchema>
