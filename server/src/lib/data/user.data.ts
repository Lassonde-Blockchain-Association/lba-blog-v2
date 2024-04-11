import { db } from "../db"
import bcrypt from "bcrypt"
import { supabase } from "../supabase"

export async function getUserPasswordByEmail(email: string) {
    return await db.author.findUnique({
        where: {
            email,
        },
        select: {
            password: true,
        },
    })
}

export async function getUserByEmail(email: string) {
    return await db.author.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
        },
    })
}

const SALT = bcrypt.genSaltSync(10)

interface createUserProps {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
}
function hashPassword(password: string) {
    return bcrypt.hashSync(password, SALT)
}
export async function createUser({
    id,
    firstName,
    lastName,
    email,
    password,
}: createUserProps) {
    return await db.author.create({
        data: {
            id,
            firstName,
            lastName,
            email,
            password: hashPassword(password),
        },
    })
}
