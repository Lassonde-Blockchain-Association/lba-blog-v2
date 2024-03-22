const { Clerk } = require("@clerk/clerk-sdk-node")

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY })

/**
 * Extracts the session token from the request headers.
 * @param {object} req - The Express.js request object
 * @returns {string|null} The session token
 */
function getSessionToken(req) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null
    }
    return authHeader.split("Bearer ")[1]
}

/**
 * Authenticates a user based on the session token provided in the request headers.
 * @param {object} req - The Express.js request object
 * @param {object} res - The Express.js response object
 * @param {function} next - The next middleware function
 */
async function authenticateUser(req, res, next) {
    try {
        const sessionToken = getSessionToken(req)

        if (!sessionToken) {
            return res.status(401).json({ error: "No session token provided" })
        }

        const session = await clerk.sessions.getSession(sessionToken)
        const user = session.user

        if (user) {
            throw new Error("Malformed session: No user object")
        }

        req.user = user
        next()
    } catch (error) {
        console.error("Authentication error:", error.message)
        res.status(401).json({
            error: "Authentication failed: " + error.message,
        })
    }
}

module.exports = { authenticateUser }
