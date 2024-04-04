import Translator from "short-uuid"
import { supabase } from "../supabase"

const BUCKET_NAME = "blog_image"

export function generateFileName() {
    return Translator.generate()
}

export async function uploadFile(file: File) {
    const fileName = generateFileName()
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file)

    if (error) throw new Error("Upload file error")

    console.log(data)

    const imageUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName)

    return imageUrl.data.publicUrl
}
