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
        const signInResult = await authFunction.signIn(opts.input)

        if (signInResult.code == 401) {
            throw new TRPCError({
                message: signInResult.error,
                code: "UNAUTHORIZED",
            })
        }

        if (signInResult.code == 400) {
            throw new TRPCError({
                message: signInResult.error,
                code: "BAD_REQUEST",
            })
        }

        if (signInResult.code == 500) {
            throw new TRPCError({
                message: signInResult.error,
                code: "INTERNAL_SERVER_ERROR",
            })
        }
        return signInResult
    })
}
export function signUp(): AnyProcedure {
    return publicProcedure.input(signUpSchema).mutation(async (opts) => {
        const signUpResult = await authFunction.signUp(opts.input)
        console.log(signUpResult)
        if (signUpResult.code == 401) {
            throw new TRPCError({
                message: signUpResult.error,
                code: "UNAUTHORIZED",
            })
        }

        if (signUpResult.code == 400) {
            throw new TRPCError({
                message: signUpResult.error,
                code: "BAD_REQUEST",
            })
        }

        if (signUpResult.code == 500) {
            throw new TRPCError({
                message: signUpResult.error,
                code: "INTERNAL_SERVER_ERROR",
            })
        }
        return signUpResult
    })
}
export function signOut() {
    return authProcedure.mutation(async () => {
        return await authFunction.signOut()
    })
}
