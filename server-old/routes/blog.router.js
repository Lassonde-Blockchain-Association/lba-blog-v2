const { createBlog, updateBlog, deleteBlog } = require("./blog.service")
const express = require("express")
const blogRouter = express.Router()

// createBlog
blogRouter.post("/", async (req, res) => {
    try {
        // req.body is the blogData
        const blog = await createBlog(req.body)
        return res.status(201).json(blog)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// updateBlog
blogRouter.put("/:id", async (req, res) => {
    try {
        // req.body is the blogData
        const blog = await updateBlog(req.params.id, req.body)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// deleteBlog
blogRouter.delete("/:id", async (req, res) => {
    try {
        const blog = await deleteBlog(req.params.id, req.body)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// get blog by author id
// blogRouter.get("/:id/:authorId", async (req, res) => {
//     try {
//         const blog = await getBlogByAuthorId(
//             req.params.id,
//             req.params.authorId,
//             req.body
//         )
//         return res.status(200).json(blog)
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// })

blogRouter.get("/:slug", async (req, res) => {
    try {
        const blog = await getBlogBySlug(req.params.slug, req.body)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

blogRouter.get("/:slug/:authorId", async (req, res) => {
    try {
        const blog = await getBlogByAuthorId(
            req.params.id,
            req.params.authorId,
            req.body
        )
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// get all blogs
blogRouter.get("/blogs", async (req, res) => {
    try {
        const blogs = await getAllBlogs()
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// get blog by category
blogRouter.get("/blogs/:category", async (req, res) => {
    try {
        const blogs = await getBlogsByCategory(req.params.category)
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = blogRouter
