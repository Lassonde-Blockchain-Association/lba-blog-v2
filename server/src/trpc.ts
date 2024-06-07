import { initTRPC, TRPCError } from "@trpc/server"
import { AuthContext } from "./lib/context/auth.context"
import { supabase } from "./lib/supabase"

const t = initTRPC.context<AuthContext>().create()

export const router = t.router
/**
 * Public procedure that is used for all query()
 */
export const publicProcedure = t.procedure
/**
 * Procedure use middleware to check if user is logged in based on supabase session
 */
export const authProcedure = t.procedure.use(async function isAuthed(opts) {
    if (opts.ctx.error) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
        })
    }

    return opts.next({
        ctx: {
            access_token: opts.ctx.session?.access_token,
            userId: opts.ctx.userId,
        },
    })
})
