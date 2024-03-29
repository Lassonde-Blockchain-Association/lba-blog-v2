import { signInSchema, signUpSchema } from "../../schema/auth.schema"
import { supabase } from "../supabase"
import z from "zod"
import { createUser, getUserByEmail, getUserPasswordByEmail } from "./user.data"
import bcrypt from "bcrypt"
import { getCurrentUser } from "./session.data"

function comparePassword(password: string, userPassword: string) {
    return bcrypt.compareSync(password, userPassword)
}
//All the auth routes should use Supabase only
export async function signIn(values: z.infer<typeof signInSchema>) {
    //Data Validation
    const validatedFields = signInSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Something went wrong",
        }
    }
    const { email, password } = validatedFields.data

    //Get user by email
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
        return {
            error: "Wrong credentials",
        }
    }

    //Password Validataion
    const userPassword = await getUserPasswordByEmail(email)
    const passwordMatched = comparePassword(
        password,
        userPassword?.password as string,
    )
    if (!passwordMatched) return { error: "Wrong credentials" }

    //Signin with
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) return { error }

    //Get session info only
    const { user, ...session } = data.session
    return {
        user: existingUser,
        session,
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

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return {
            error: "existing user",
        }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {
        return {
            error,
        }
    }

    const createUserResult = await createUser({
        id: data.user?.id as string,
        ...validatedFields.data,
    })
    if (!createUserResult) {
        console.log("SIGNUP ERROR\n")
        return {
            error: "Internal Server Error",
        }
    }
    return {
        success: "Created Successfully",
        data: data,
    }
}

export async function signOut() {
    return await supabase.auth.signOut()
}
