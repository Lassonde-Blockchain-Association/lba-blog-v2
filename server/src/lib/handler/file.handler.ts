import Translator from "short-uuid"
import { supabase } from "../supabase"
import { decode } from "base64-arraybuffer"

const BUCKET_NAME = "blog_image"

export function generateFileName() {
    return Translator.generate()
}

export async function uploadFile(file: Express.Multer.File) {
    try {
        const fileName = generateFileName() + file.originalname

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, decode(file.buffer.toString("base64")), {
                contentType: file.mimetype,
            })

        if (error) {
            throw new Error("Upload file error")
        }

        const imageUrl = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName)

        return imageUrl.data.publicUrl
    } catch (error) {
        console.log("Error when upload\n" + error)
    }
}
