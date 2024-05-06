import { AnyRouter } from "@trpc/server"
import { router } from "../trpc"
import * as authorProcedures from "../procedures/author.procedures"

export const authorRouter: AnyRouter = router({
    getAuthorById: authorProcedures.getAuthorById(),
})
