import { NextFunction, Request, Response, Router } from "express";
import PostController from "../app/controllers/PostController";
import PageController from "../app/controllers/PageController";

const router: Router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    req.app.set('layout', 'layouts/main');
    next();
});

router.get("/", PostController.index);
router.get("/search", PostController.search);
router.get("/about", PageController.about);
router.get("/contact", PageController.contact);
router.get("/posts/:id", PostController.show);

export default router;