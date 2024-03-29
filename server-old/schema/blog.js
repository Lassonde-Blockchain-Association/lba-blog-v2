//import { z } from "zod"
const { z } = require("zod")

// define a schema for a blog
const BlogSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be 3 characters long" })
        .max(120, { message: "Title must be 120 characters or less" }),
    category: z.enum([
        "AI",
        "BLOCKCHAIN",
        "CLOUD",
        "DEVOPS",
        "METAVERSE",
        "NFT",
        "WEB3",
    ]),
    description: z
        .string()
        .min(3, { message: "Description must be more than 3 characters" })
        .max(512, { message: "Description must be 512 characters or less" }),
    content: z
        .string()
        .min(100, { message: "Content must be more than 100 characters" })
        .max(16384, { message: "Content must be 16384 characters or less" }),
    imageUrl: z.string().url(),
    slug: z.string(),
})

// // create a blog object
// const blog = {
//     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     title: "My First Blockchain Blog",
//     category: "BLOCKCHAIN",
//     description: "This is my first blog about blockchain",
//     content: "This is my first blog",
//     imageUrl: "https://www.google.com",
//     authorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     datePublished: new Date().toISOString(),
// }

// try {
//     const validatedBlog = BlogSchema.safeParse(blog)
//     console.log(validatedBlog)
// } catch (error) {
//     console.error(error)
// }

module.exports = BlogSchema
