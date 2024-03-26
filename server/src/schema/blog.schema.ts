import { z } from "zod"

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
    // .min(100, { message: "Content must be more than 100 characters" })
    // .max(16384, { message: "Content must be 16384 characters or less" })
    imageUrl: z.string().url(),
    //image:z.(sthing to handle file)
    slug: z.string(),
})
