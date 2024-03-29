declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string
            DATABASE_URI: string
            CLIENT_URI: string
            DIRECT_URL: string
            SUPABASE_ANON: string
            SUPABASE_PROJECT_ID: string
            SUPABASE_URL: string
        }
    }
}

export {}
