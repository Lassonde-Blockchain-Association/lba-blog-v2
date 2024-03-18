import { publicProcedure } from "../trpc"
import { z } from "zod"
import { BlogSchema } from "../schema/blog.schema"
import * as dbFunction from "../lib/data"
import { AnyProcedure, TRPCError } from "@trpc/server"

export function getAllBlogs(): AnyProcedure {
    return publicProcedure.query(() => {
        return dbFunction.getBlogs()
    })
}

export function getBlogById(): AnyProcedure {
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input }) => {
            const post = dbFunction.getBlogById(input.id)
            if (!post) throw new TRPCError({ code: "NOT_FOUND" })
            return post
        })
}

export function getBlogBySlug(): AnyProcedure {
    return publicProcedure
        .input(z.object({ slug: z.string() }))
        .query(({ input }) => {
            const blog = dbFunction.getBlogBySlug(input.slug)
            if (!blog) throw new TRPCError({ code: "NOT_FOUND" })
            return blog
        })
}

export function getBlogsByAuthorId(): AnyProcedure {
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async (opts) => {
            const blogs = dbFunction.getBlogsByAuthorId(opts.input.id)
            if (!blogs) throw new TRPCError({ code: "NOT_FOUND" })
            return blogs
        })
}

export function createBlog(): AnyProcedure {
    return publicProcedure.input(BlogSchema).mutation(async (opts) => {
        const createBlogProcess = await dbFunction.createBlog(opts.input)
        if (!createBlogProcess)
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            })
        return createBlogProcess
    })
}

export function updateBlog(): AnyProcedure {
    return publicProcedure
        .input(
            z.object({
                id: z.string(),
                BlogSchema,
            }),
        )
        .mutation(async (opts) => {
            const updateBlogProcess = await dbFunction.updateBlog(
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
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async (opts) => {
            const deleteBlogProcess = await dbFunction.deleteBlog(opts.input.id)
            if (!deleteBlogProcess)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                })
            return deleteBlogProcess
        })
}
