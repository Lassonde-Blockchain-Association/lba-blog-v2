import { db } from "../db"
import { BlogSchema } from "../../schema/blog.schema"
import { z } from "zod"
import { uploadFile } from "../handler/file.handler"
import slugify from 'slugify'


const DUMMY_USER_ID = "ebddb50d-cce9-4366-9707-1f61ed23abf3";

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
//Get Blogs by categories
//Problem : how to deal with categories ENUM in DB
export async function getBlogsBycategories(categories: any) {
    return db.blog.findMany({
        where: {
            categories: categories,
        },
    })
}

//Create Blog
export async function createBlog(data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) return {error:"Invalid blog data", code:400}

    //Change this to current user id by session
    const currentUser = {
        id: DUMMY_USER_ID,
    }

    const { title, categories, description, content, image, slug } =
        validatedBlog.data
    const imageUrl = await uploadFile(image);

    const existingBlogbySlug = await getBlogBySlug(slug)
    if (existingBlogbySlug)
        return {
            error: "Existing Slug",
        }

    const modifiedSlug = slugify(title) ;

    await db.blog.create({
        data: {
            title,
            categories,
            description,
            content,
            imageUrl,
            slug:modifiedSlug,
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

    return { success: "Blog created successfully" }
}

//Update blog
export async function updateBlog(id: string, data: z.infer<typeof BlogSchema>) {
    const validatedBlog = BlogSchema.safeParse(data)
    if (!validatedBlog.success) throw new Error("Invalid blog data")

    //Change this to current user id by session
    const currentUser = {
        id: DUMMY_USER_ID,
    }

    const { title, categories, slug, description, content, image } =
        validatedBlog.data
    const imageUrl = ""
    const exisitingBlog = await getBlogById(id)
    if (!exisitingBlog) return { error: "No blog with this Id" }

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
