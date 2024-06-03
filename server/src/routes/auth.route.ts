import { AnyRouter } from "@trpc/server"
import { router } from "../trpc"
import * as authProcedures from "../procedures/auth.procedures"

export const authRouter: AnyRouter = router({
    signIn: authProcedures.signIn(),
    signUp: authProcedures.signUp(),
    signOut: authProcedures.signOut(),
    verifyToken: authProcedures.verifyToken(),
})
