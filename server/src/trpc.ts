import { initTRPC } from "@trpc/server"
import { AuthContext } from "./lib/context/auth.context"

const t = initTRPC.context<AuthContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const authProcedue = t.procedure
