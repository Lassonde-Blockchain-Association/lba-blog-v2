import { Request, Response } from "express"
import { uploadFile } from "./file.handler"

export async function uploadHandler(req: Request, res: Response) {
    const image = req.file
    if (!image) return res.status(400).json({ msg: "Missing file" })
    const uploadUrl = await uploadFile(image)
    return res
        .status(200)
        .json({ msg: "Upload Successfully", imageUrl: uploadUrl })
}
