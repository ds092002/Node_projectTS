import multer from "multer";
import { Request, Response } from "express";

const storage = multer.diskStorage({
    destination(req: Request, file, cb) {
        cb(null, 'public/images')
    },
    filename(req: Request, file, cb) {
        cb(null, `${Date.now()}_${file.originalname.replace(/\\/g,"/")}`)
    },
})

const upload = multer({ storage: storage});
export default upload