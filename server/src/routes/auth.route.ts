import { AnyRouter } from "@trpc/server"
import { router } from "../trpc"
import * as authService from "../services/auth.services"

export const authRouter: AnyRouter = router({
    signIn: authService.signIn(),
    signUp: authService.signUp(),
    signOut: authService.signOut(),
})
