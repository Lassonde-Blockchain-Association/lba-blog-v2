import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { supabase } from "../supabase"

export async function createAuthContext({
    req,
    res,
}: CreateExpressContextOptions) {
    const { data, error } = await supabase.auth.getSession()
    if (data.session) {
        const { user, ...session } = data.session
        return { session }
    }
    return { error }
}
export type AuthContext = Awaited<ReturnType<typeof createAuthContext>>
