import { db } from "../db"
import { BlogSchema } from "../../schema/blog.schema"
import { z } from "zod"

//Get all available blogs in the database
export async function getBlogs() {
    return db.blog.findMany()
}

//Get blog by id
export async function getBlogById(id: string) {
    return db.blog.findUnique({
        where: {
            id,
        },
    })
}

//Get all blogs by Author with given id
export async function getBlogsByAuthorId(authorId: string) {
    return db.blog.findMany({
        where: {
            authorId,
        },
    })
}

//Get Blog by Slug
export async function getBlogBySlug(slug: string) {
    return db.blog.findUnique({
        where: {
            slug,
        },
    })
}
//Get Blogs by Category
//Problem : how to deal with category ENUM in DB
export async function getBlogsByCategory(category: any) {
    return db.blog.findMany({
        where: {
            category: category,
        },
    })
}

//Create Blog
export async function createBlog(data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) throw new Error("Invalid blog data")

    //Change this to current user id by session
    const currentUser = {
        id: "7d7b47a3-e8b4-40e5-ab95-9a5fddc369c6",
    }

    const { title, category, description, content, imageUrl, slug } =
        validatedBlog.data

    const existingBlogbySlug = await getBlogBySlug(slug)
    if (existingBlogbySlug)
        return {
            error: "Existing Slug",
        }

    await db.blog
        .create({
            data: {
                title,
                category,
                description,
                content,
                imageUrl,
                slug,
                author: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
            select: {
                id: true,
            },
        })
        .catch((error) => {
            console.log("CREATE BLOG ERROR")
            return { error: "Something went wrong" }
        })

    return { success: "Blog created successfully" }
}

//Update blog
export async function updateBlog(id: string, data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) throw new Error("Invalid blog data")

    //Change this to current user id by session
    const currentUser = {
        id: "7d7b47a3-e8b4-40e5-ab95-9a5fddc369c6",
    }

    const { title, category, slug, description, content, imageUrl } =
        validatedBlog.data

    const exisitingBlog = await getBlogById(id)
    if (!exisitingBlog) return { error: "No blog with this Id" }

    await db.blog
        .update({
            where: {
                id,
            },
            data: {
                title,
                category,
                description,
                content,
                imageUrl,
                slug,
                author: {
                    connect: {
                        id: currentUser.id,
                    },
                },
            },
        })
        .catch((error) => {
            console.log("UPDATE BLOG ERROR")
            return { error: "Something went wrong" }
        })
    return { success: "Update Blog Successfully" }
}

export async function deleteBlog(id: string) {
    const exisitingBlog = await getBlogById(id)
    if (!exisitingBlog) return { error: "No blog with this Id" }
    await db.blog
        .delete({
            where: {
                id,
            },
        })
        .catch((error) => {
            console.log("DELETE BLOG ERROR")
            return { error: "Something went wrong" }
        })
    return { success: "Blog Delete successfully" }
}
