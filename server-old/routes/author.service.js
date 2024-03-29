const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient()

const createAuthor = async (authorData) => {
    return db.author.create({
        data: {
            firstName: authorData.firstName,
            lastName: authorData.lastName,
            email: authorData.email,
            password: authorData.password,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
        },
    })
}

// get all authors
const getAuthors = async () => {
    return db.author.findMany()
}

module.exports = { createAuthor, getAuthors }
