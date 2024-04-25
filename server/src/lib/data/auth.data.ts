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
            code: 400,
            error: "Something went wrong",
        }
    }
    const { email, password } = validatedFields.data

    //Get user by email
    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
        return {
            code: 401,
            error: "Wrong credentials",
        }
    }

    //Password Validataion
    const userPassword = await getUserPasswordByEmail(email)

    const passwordMatched = comparePassword(
        password,
        userPassword?.password as string,
    )
    if (!passwordMatched) return { error: "Wrong credentials", code: 401 }

    //Signin with
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) return { error, code: 401 }

    //Get session info only
    return {
        code: 200,
        user: existingUser.id,
    }
}

//Use supabase
export async function signUp(values: z.infer<typeof signUpSchema>) {
    const validatedFields = signUpSchema.safeParse(values)
    if (!validatedFields.success) {
        return {
            error: "Missing payload",
            code: 400,
        }
    }

    const { firstName, lastName, email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
        return {
            error: "existing user",
            code: 400,
        }
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {
        return {
            code: 401,
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
            code: 500,
        }
    }
    return {
        success: "Created Successfully",
        code: 200,
    }
}

export async function signOut() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return {
            code: 401,
        }
    }
    return await supabase.auth.signOut()
}
