import { AnyProcedure, TRPCError } from "@trpc/server"
import { publicProcedure } from "../trpc"
import * as userFunction from "../lib/data/user.data"
import z from "zod"

export function getUserById(): AnyProcedure {
    return publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input }) => {
            const user = userFunction.getUserById(input.id)
            if (!user)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Not Found",
                })
            return user
        })
}
