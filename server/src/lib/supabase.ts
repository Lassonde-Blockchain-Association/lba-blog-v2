import { createClient, SupabaseClient } from "@supabase/supabase-js"

export const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON as string,
)
