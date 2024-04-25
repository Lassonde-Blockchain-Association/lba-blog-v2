import { router } from "../trpc"
import { authRouter } from "./auth.route"
import { authorRouter } from "./author.route"
import { blogRouter } from "./blog.route"

export const appRouter = router({
    blog: blogRouter,
    auth: authRouter,
    author: authorRouter,
})
