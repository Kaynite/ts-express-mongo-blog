import { Request, Response } from "express";
import Post from "../models/Post";

class PostController {
    public async index(req: Request, res: Response) {
        const perPage: number = 10;
        const page: number = Number(req.query.page) || 1;

        const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.count();
        const nextPage = page + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        return res.render("index", {
            posts: posts,
            nextPage: hasNextPage ? nextPage : null,
        });
    }

    public async show(req: Request, res: Response) {
        try {
            const post = await Post.findById({ _id: req.params.id });
            return res.render("post", { post })
        } catch (error) {
            res.send("Post Not Found")
        }
    }

    public async search(req: Request, res: Response) {
        let { q } = req.query;
        if (typeof q === "string") {
            var searchNoSpecialChar = q.replace(/[^a-zA-Z0-9 ]/g, "")
        } else {
            var searchNoSpecialChar = "";
        }

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') } }
            ]
        });

        res.render("search", { data });
    }

}

export default new PostController