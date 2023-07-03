import { Response, Request } from "express";
import Post from "../../models/Post";

class HomeController {
    public async home(req: Request, res: Response) {
        const posts = await Post.find().sort({"createdAt": -1})

        return res.render('admin/dashboard', { posts })
    }
}

export default new HomeController