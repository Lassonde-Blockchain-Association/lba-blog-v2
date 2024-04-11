import { router } from "../trpc"
import { authRouter } from "./auth.route"
import { blogRouter } from "./blog.route"

export const appRouter = router({
    blog: blogRouter,
    auth: authRouter,
})
