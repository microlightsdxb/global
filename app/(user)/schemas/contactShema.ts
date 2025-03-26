import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2,{message:"Invalid name"}),
  phone: z.string().min(10,{message:"Invalid phone number"}).max(10,{message:"Invalid phone number"}),
  email: z.string().email({message:"Invalid email"}),
  message: z.string().min(10,{message:"Message must be at least 10 characters"}),
});

export type ContactSchema = z.infer<typeof contactSchema>;
