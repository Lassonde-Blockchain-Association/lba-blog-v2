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
        .min(8, "Length must be at least 8 characters")
        .regex(passwordRegex, {
            message:
                "Your password is not valid. It should contain 1 uppercase char, 1 lowercase char, 1 number and 1 special character",
        }),
})

export const signInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string(),
})
