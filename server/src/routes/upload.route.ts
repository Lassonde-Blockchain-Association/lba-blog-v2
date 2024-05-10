import express, { NextFunction, Request, Response } from "express"
import { uploadMulter } from "../lib/uploadMulter"
import { uploadHandler } from "../lib/handler/upload.handler"

export const uploadRouter = express.Router()

uploadRouter.post(
    "/upload",
    [uploadMulter.single("file")],
    (req: Request, res: Response,next:NextFunction) => {
        uploadHandler(req, res)
    },
)
