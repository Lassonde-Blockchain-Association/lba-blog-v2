import { db } from "./db"
import { BlogSchema } from "../schema/blog.schema"
import { z } from "zod"
import { signInSchema, signUpSchema } from "../schema/auth.schema"
import { supabase } from "./supabase"

//Get all available blogs in the database
export async function getBlogs() {
    const { data, error } = await supabase
        .from('blog')
        .select('*');
    if (error) {
        throw error;
    }
    return data;
}

//Get blog by id

export async function getBlogById(id) {
    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        throw error;
    }
    return data;
}
//Get all blogs by Author with given id
export async function getBlogsByAuthorId(authorId: string) {
    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('authorId', authorId);
    if (error) {
        throw error;
    }
    return data;
}
//Get Blog by Slug
export async function getBlogBySlug(slug: string) {
    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('slug', slug)
        .single();
    if (error) {
        throw error;
    }
    return data;
}
//Get Blogs by Category
//Problem : how to deal with category ENUM in DB
export async function getBlogsByCategory(category: any) {
    const { data, error } = await supabase
        .from('blog')
        .select('*')
        .eq('category', category);
    if (error) {
        throw error;
    }
    return data;
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

export async function signIn(values: z.infer<typeof signInSchema>) {
    const validatedFields = signInSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Something went wrong",
        }
    }
    const { email, password } = validatedFields.data
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return {
            data,
            error: error,
        }
    }
    return data
}

export async function signUp(values: z.infer<typeof signUpSchema>) {
    const validatedFields = signUpSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Something went wrong",
        }
    }

    const { firstName, lastName, email, password } = validatedFields.data
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {
        return {
            error: "Invalid email",
        }
    }
    await db.author.create({
        data: {
            firstName,
            lastName,
            email,
            password,
        },
    })
    return {
        success: "Created Successfully",
    }
}
