import { initTRPC, TRPCError } from "@trpc/server"
import { AuthContext } from "./lib/context/auth.context"

const t = initTRPC.context<AuthContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const authProcedure = t.procedure.use(function isAuthed(opts) {
    if (opts.ctx.error) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
        })
    }
    console.log(opts.ctx.session)
    return opts.next({
        ctx: {
            session: opts.ctx.session,
        },
    })
})
