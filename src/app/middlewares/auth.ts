import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token: (string | null | undefined) = req.cookies.token;
    if (!token) {
        return res.redirect('/admin/login')
    }

    try {
        const payload = jwt.decode(token);
        next();
    } catch (error) {
        return res.redirect('/admin/login')
    }

}

export default auth