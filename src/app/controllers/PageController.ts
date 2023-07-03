import { Request, Response } from "express";

class PageController {
    public async about(req: Request, res: Response) {
        return res.render("about")
    }

    public async contact(req: Request, res: Response) {
        return res.render("contact")
    }
}

export default new PageController