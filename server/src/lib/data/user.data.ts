import { db } from "../db"
import bcrypt from "bcrypt"

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

export async function getUserById(id: string) {
    return await db.author.findUnique({
        where: {
            id,
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

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, SALT)
}
