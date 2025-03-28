import { z } from "zod";

export const verifyFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  learnerReferenceNumber: z.string().optional(),
  certificateNumber: z.string().optional(),
})

export type VerifyFormValues = z.infer<typeof verifyFormSchema>