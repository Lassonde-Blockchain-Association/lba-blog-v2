import { AnyProcedure, TRPCError } from "@trpc/server"
import { authProcedure, publicProcedure } from "../trpc"

import { signInSchema, signUpSchema } from "../schema/auth.schema"
import * as authFunction from "../lib/data/auth.data"

/**
 * A signin procedure that validates data and signin user
 * @param
 * @returns return an object containing user data and session
 */
export function signIn(): AnyProcedure {
    return publicProcedure.input(signInSchema).mutation(async (opts) => {
        const authResult = await authFunction.signIn(opts.input)
        if (authResult.error) {
            throw new TRPCError({
                message: "Wrong Credentials",
                code: "UNAUTHORIZED",
            })
        }
        return authResult
    })
}
export function signUp(): AnyProcedure {
    return publicProcedure.input(signUpSchema).mutation(async (opts) => {
        return await authFunction.signUp(opts.input)
    })
}
export function signOut() {
    return authProcedure.mutation(async () => {
        return await authFunction.signOut()
    })
}
