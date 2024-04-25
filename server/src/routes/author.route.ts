import { AnyRouter } from "@trpc/server"
import { router } from "../trpc"
import * as authorService from "../services/author.services"

export const authorRouter: AnyRouter = router({
    getAuthorById: authorService.getAuthorById(),
})
