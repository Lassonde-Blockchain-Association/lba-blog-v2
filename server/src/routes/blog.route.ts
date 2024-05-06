import { router } from "../trpc"
import * as BlogProcedures from "../procedures/blog.procedures"
import { AnyRouter } from "@trpc/server"

export const blogRouter: AnyRouter = router({
    getBlogs: BlogProcedures.getAllBlogs(),
    getById: BlogProcedures.getBlogById(),
    getBySlug: BlogProcedures.getBlogBySlug(),
    getAuthorBlogs: BlogProcedures.getBlogsByAuthorId(),
    createBlog: BlogProcedures.createBlog(),
    updateBlog: BlogProcedures.updateBlog(),
    deleteBlog: BlogProcedures.deleteBlog(),
})
