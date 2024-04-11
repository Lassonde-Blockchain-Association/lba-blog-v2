import { router } from "../trpc"
import * as BlogService from "../services/blog.services"
import { AnyRouter } from "@trpc/server"

export const blogRouter: AnyRouter = router({
    getBlogs: BlogService.getAllBlogs(),
    getById: BlogService.getBlogById(),
    getBySlug: BlogService.getBlogBySlug(),
    getAuthorBlogs: BlogService.getBlogsByAuthorId(),
    createBlog: BlogService.createBlog(),
    updateBlog: BlogService.updateBlog(),
    deleteBlog: BlogService.deleteBlog(),
})
