const express = require("express")
const { authenticateUser } = require("../middleware/authentication")
const {createAuthor, getAuthors} = require("./author.service")

const authorRouter = express.Router()

// 👨 Self Author
authorRouter.get("/@self", authenticateUser, async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

// @TODO 📝 Create author
authorRouter.post("/signup", async (req, res) => {
    try {
        const author = await createAuthor(req.body)
        return res.status(201).json(author)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

// @TODO 📝 Update author

// @TODO 💻 Get Blog From Author

// @TODO 📋 Get All Authors
authorRouter.get("/authors", async (req, res) => {
    try {
        const author = await getAuthors()
        return res.status(200).json(author)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = authorRouter
