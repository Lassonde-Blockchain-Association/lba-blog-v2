import { AnyProcedure } from "@trpc/server"
import { authProcedue } from "../trpc"

import { signInSchema, signUpSchema } from "../schema/auth.schema"
import * as authFunction from "../lib/data/auth.data"

/**
 * A signin procedure that validates data and signin user
 * @param
 * @returns return an object containing user data and session
 */
export function signIn(): AnyProcedure {
    try {
        return authProcedue.input(signInSchema).mutation(async (opts) => {
            return await authFunction.signIn(opts.input)
        })
    } catch (error: any) {
        return error
    }
}
export function signUp(): AnyProcedure {
    return authProcedue.input(signUpSchema).mutation(async (opts) => {
        return await authFunction.signUp(opts.input)
    })
}
