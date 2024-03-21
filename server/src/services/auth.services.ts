import { AnyProcedure } from "@trpc/server"
import { authProcedue } from "../trpc"
import z from "zod"
import { signInSchema, signUpSchema } from "../schema/auth.schema"
import * as dbFunction from "../lib/data"
export function signIn(): AnyProcedure {
    return authProcedue.input(signInSchema).mutation(async (opts) => {
        return await dbFunction.signIn(opts.input)
    })
}
export function signUp(): AnyProcedure {
    return authProcedue.input(signUpSchema).mutation(async (opts) => {
        return await dbFunction.signUp(opts.input)
    })
}
