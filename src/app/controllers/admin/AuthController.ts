import { Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User";
import jwt from "jsonwebtoken";

class AuthController {
    public async loginView(req: Request, res: Response) {
        return res.render('admin/auth')
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user || ! await bcrypt.compare(password, user.password)) {
            return res.status(422).json({ "message": "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET ?? '');
        res.cookie("token", token, { httpOnly: true })

        return res.redirect('/admin')
    }

    public async register(req: Request, res: Response) {
        const { name, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            username,
            password: hashedPassword
        })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET ?? '');
        res.cookie("token", token, { httpOnly: true })

        return res.redirect('/admin')
    }

    public async logout(req: Request, res: Response) {
        res.clearCookie("token");

        return res.redirect("/admin")
    }
}

export default new AuthController