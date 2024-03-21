import { z } from "zod"

const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
)

export const signUpSchema = z.object({
    firstName: z.string().min(1, "Must have more than 1 character"),
    lastName: z.string().min(1, "Must have more than 1 character"),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, "Length must be between 8 and 16 characters")
        .max(16, "Length must be between 8 and 16 characters")
        .regex(passwordRegex, { message: "Your password is not valid" }),
})

export const signInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, "Length must be between 8 and 16 characters")
        .max(16, "Length must be between 8 and 16 characters"),
})
