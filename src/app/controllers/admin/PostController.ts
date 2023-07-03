import { Request, Response } from "express";
import Post from "../../models/Post";

class PostController {
    public async index(req: Request, res: Response) {
        const posts = await Post.find().sort({ createdAt: -1 })

        return res.render('admin/dashboard', { posts })
    }

    public async create(req: Request, res: Response) {
        return res.render('admin/posts/create');
    }

    public async store(req: Request, res: Response) {
        const { title, body } = req.body;

        await Post.create({ title, body });

        return res.redirect("/admin")
    }

    public async edit(req: Request, res: Response) {
        const post = await Post.findById({ _id: req.params.id });

        return res.render("admin/posts/edit", { post })
    }

    public async update(req: Request, res: Response) {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
        });

        return res.redirect("/admin")
    }

    public async destroy(req: Request, res: Response) {
        await Post.findByIdAndDelete(req.params.id);
        return res.redirect("/admin")
    }
}

export default new PostController