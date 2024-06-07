import { supabase } from "../supabase"

export async function getCurrentUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser()
    console.log(user)
    return user
}
