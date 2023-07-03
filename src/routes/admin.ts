import { Router } from "express";
import AuthController from "../app/controllers/admin/AuthController";
import HomeController from "../app/controllers/admin/HomeController";
import auth from "../app/middlewares/auth";
import PostController from "../app/controllers/admin/PostController";

const router: Router = Router();

router.use((req, res, next) => {
    req.app.set('layout', 'layouts/admin');
    next();
});

router.get("/login", AuthController.loginView);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.register);

router.get("/", auth, PostController.index);
router.get('/posts/create', auth, PostController.create)
router.post('/posts', auth, PostController.store)
router.get('/posts/:id/edit', auth, PostController.edit)
router.put('/posts/:id', auth, PostController.update)
router.delete('/posts/:id', auth, PostController.destroy)

export default router;