import { signInSchema, signUpSchema } from "../../schema/auth.schema"
import { db } from "../db"
import { supabase } from "../supabase"
import z from "zod"

async function getUserByEmail(email: string) {
    return await supabase
        .from("Author")
        .select("id,firstName,lastName,email")
        .eq("email", email)
}

//All the auth routes should use Supabase only
export async function signIn(values: z.infer<typeof signInSchema>) {
    const validatedFields = signInSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Something went wrong",
        }
    }
    const { email, password } = validatedFields.data
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) return { error }

    const user = await getUserByEmail(email)
    return {
        user: user.data,
        session: data.session,
    }
}

//Use supabase
export async function signUp(values: z.infer<typeof signUpSchema>) {
    const validatedFields = signUpSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Something went wrong",
        }
    }

    const { firstName, lastName, email, password } = validatedFields.data
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {
        return {
            error,
        }
    }

    await db.author.create({
        data: {
            firstName,
            lastName,
            email,
            password,
        },
    })
    return {
        success: "Created Successfully",
        data,
    }
}

export async function signOut() {
    return await supabase.auth.signOut()
}
