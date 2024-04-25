import { AnyProcedure, TRPCError } from "@trpc/server"
import { publicProcedure } from "../trpc"
import * as userFunction from "../lib/data/user.data"
import z from "zod"

export function getAuthorById(): AnyProcedure {
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input }) => {
            const author = userFunction.getUserById(input.id)
            if (!author)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Not Found",
                })
            return author
        })
}
