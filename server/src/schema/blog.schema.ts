import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10 // 10MB
const ACCEPTED_FILE_TYPES = ["image/png"]

export const BlogSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be 3 characters long" })
        .max(120, { message: "Title must be 120 characters or less" }),
    categories: z.array(z.string().min(1)).min(1),
    description: z
        .string()
        .min(3, { message: "Description must be more than 3 characters" })
        .max(512, { message: "Description must be 512 characters or less" }),
    content: z.string(),
    image: z.any(),
    // .refine((file) => {
    //     return file?.[0]?.size <= MAX_UPLOAD_SIZE
    // }, "File size must be less than 10MB")
    // .refine((file) => {
    //     return ACCEPTED_FILE_TYPES.includes(file?.[0]?.type)
    // }, "File must be a PNG"),
    slug: z.string(),
})
