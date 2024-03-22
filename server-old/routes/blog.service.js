const BlogSchema = require("../schema/blog")
const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()

// @TODO 📝 Fetch blogs by specific author id
const getBlogByAuthorId = async (authorId) => {
    return db.blog.findMany({
        where: {
            authorId: authorId,
        },
    })
}

// @TODO 💻 Retrieve all blogs from database
const getAllBlogs = async () => {
    return db.blog.findMany()
}

// @TODO 📋 Fetch blogs belonging to a specific category
const getBlogByCategory = async (category) => {
    return db.blog.findMany({
        where: {
            category: category,
        },
    })
}

const getBlogBySlug = async (slug) => {
    return db.blog.findUnique({
        where: { slug: String(slug) },
    })
}

// mutations
const createBlog = async (blogData) => {
    const validatedBlog = BlogSchema.safeParse(blogData)

    if (!validatedBlog.success) {
        throw new Error("Invalid blog data")
    }

    return db.blog.create({
        data: validatedBlog.data,
        select: {
            id: true,
        },
    })
}

const updateBlog = async (slug, blogData) => {
    const validatedData = BlogSchema.safeParse(blogData)

    if (!validatedData.success) {
        throw new Error("Invalid blog data")
    }

    return db.blog.update({
        where: { slug: String(slug) },
        data: validatedData.data,
    })
}

// const createBlog = async (blogData) => {
//     return db.blog.create({
//         data: {
//             title: blogData.title,
//             category: blogData.category,
//             description: blogData.description,
//             slug: blogData.slug,
//             content: blogData.content,
//             imageUrl: blogData.imageUrl,
//             authorId: blogData.authorId,
//             author: blogData.author,
//             datePublished: blogData.datePublished,
//         },
//         select: {
//             id: true,
//         },
//     })
// }

// const updateBlog = async (id, blogData) => {
//     return db.blog.update({
//         where: { id: String(id) },
//         data: blogData,
//     })
// }

const deleteBlog = async () => {
    // return db.blog.delete({
    //     where: { id: String(id) },
    // })
    return db.blog.update({
        where: { slug: String(slug) },
        data: { isDeleted: true },
    })
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogBySlug,
    getBlogByAuthorId,
    getAllBlogs,
    getBlogByCategory,
}
