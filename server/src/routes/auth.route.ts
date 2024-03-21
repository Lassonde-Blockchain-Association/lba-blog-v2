import { AnyRouter } from "@trpc/server"
import { router } from "../trpc"
import * as authService from "../services/auth.services"

export const authRouter: AnyRouter = router({
    signin: authService.signIn(),
    signup: authService.signUp(),
})
