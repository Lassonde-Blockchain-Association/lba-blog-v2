import { db } from "../db"
import { BlogSchema } from "../../schema/blog.schema"
import { z } from "zod"
import slugify from "slugify"
import { getCurrentUser } from "./session.data"
import Translator from "short-uuid"

function generateSlug(title: string) {
    return slugify(
        title.toLocaleLowerCase() + " " + Translator.generate().substring(0, 5),
    )
}

//Get all available blogs in the database
export async function getBlogs() {
    return db.blog.findMany({
        where: {
            deleted: false,
        },
    })
}

//Get blog by id
export async function getBlogById(id: string) {
    return db.blog.findUnique({
        where: {
            deleted: false,

            id,
        },
    })
}

//Get all blogs by Author with given id
export async function getBlogsByAuthorId(authorId: string) {
    return db.blog.findMany({
        where: {
            deleted: false,

            authorId,
        },
    })
}

//Get Blog by Slug
export async function getBlogBySlug(slug: string) {
    return db.blog.findUnique({
        where: {
            slug,
            deleted: false,
        },
    })
}
//Get Blogs by categories
export async function getBlogsByCategories(categories: any) {
    return db.blog.findMany({
        where: {
            deleted: false,

            categories: {
                has: categories,
            },
        },
    })
}

//Create Blog
export async function createBlog(data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) return { error: "Invalid blog data", code: 400 }

    //Change this to current user id by session
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return {
            error: "Login to create post",
            code: "UNAUTHORIZED",
        }
    }

    const { title, categories, description, content, imageUrl } =
        validatedBlog.data

    const modifiedSlug = generateSlug(title)

    await db.blog.create({
        data: {
            title,
            categories,
            description,
            content,
            imageUrl,
            slug: modifiedSlug,
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

    return { success: "Blog created successfully", code: 200 }
}

//Update blog
export async function updateBlog(id: string, data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) throw new Error("Invalid blog data")

    //Change this to current user id by session
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return {
            error: "Login to create post",
            code: "UNAUTHORIZED",
        }
    }

    const { title, categories, description, content, imageUrl } =
        validatedBlog.data
    const exisitingBlog = await getBlogById(id)
    if (!exisitingBlog) return { error: "No blog with this Id" }

    const modifiedSlug = generateSlug(title)

    await db.blog
        .update({
            where: {
                id,
            },
            data: {
                title,
                categories,
                description,
                content,
                imageUrl,
                slug: modifiedSlug,
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
    if (!exisitingBlog) return { error: "No blog with this Id", code: 400 }

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return {
            error: "You are not authorized",
            code: 401,
        }
    }
    await db.blog
        .update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        })
        .catch((error) => {
            console.log("DELETE BLOG ERROR")
            return { error: "Something went wrong" }
        })
    return { success: "Blog Delete successfully" }
}
