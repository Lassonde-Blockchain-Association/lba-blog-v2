import { authProcedure, publicProcedure } from "../trpc"
import { z } from "zod"
import { BlogSchema } from "../schema/blog.schema"
import * as blogFunction from "../lib/data/blog.data"
import { AnyProcedure, TRPCError } from "@trpc/server"

export function getAllBlogs(): AnyProcedure {
    return publicProcedure.query(() => {
        return blogFunction.getBlogs()
    })
}

export function getBlogById(): AnyProcedure {
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async (opts) => {
            const post = await blogFunction.getBlogById(opts.input.id)
            if (!post)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No Blog with this Id",
                })
            return post
        })
}

export function getBlogBySlug(): AnyProcedure {
    return publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(async (opts) => {
            const blog = await blogFunction.getBlogBySlug(opts.input.slug)
            if (!blog)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "No blog with this slug",
                })
            return blog
        })
}

export function getBlogsByAuthorId(): AnyProcedure {
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async (opts) => {
            const blogs = await blogFunction.getBlogsByAuthorId(opts.input.id)
            if (blogs.length == 0) throw new TRPCError({ code: "NOT_FOUND" })
            return blogs
        })
}

export function getBlogsByCategories(): AnyProcedure {
    return publicProcedure
        .input(z.object({ category: z.string() }))
        .query(async (opts) => {
            const blogs = await blogFunction.getBlogsByCategories(
                opts.input.category,
            )
            if (blogs.length == 0) throw new TRPCError({ code: "NOT_FOUND" })
            return blogs
        })
}

export function createBlog(): AnyProcedure {
    return authProcedure.input(BlogSchema).mutation(async (opts) => {
        const createBlogProcess = await blogFunction.createBlog(opts.input)
        if (!createBlogProcess)
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            })
        return createBlogProcess
    })
}

export function updateBlog(): AnyProcedure {
    return authProcedure
        .input(
            z.object({
                id: z.string(),
                BlogSchema,
            }),
        )
        .mutation(async (opts) => {
            const updateBlogProcess = await blogFunction.updateBlog(
                opts.input.id,
                opts.input.BlogSchema,
            )
            if (!updateBlogProcess)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                })
            return updateBlogProcess
        })
}

export function deleteBlog(): AnyProcedure {
    return authProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async (opts) => {
            const deleteBlogProcess = await blogFunction.deleteBlog(
                opts.input.id,
            )
            if (!deleteBlogProcess)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                })
            return deleteBlogProcess
        })
}
