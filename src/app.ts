import express, { Application } from 'express';
import cookieParser from "cookie-parser";
import expressLayout from "express-ejs-layouts";
import adminRouter from './routes/admin';
import webRoutes from './routes/web';
import path from 'path';
import MongoStore from 'connect-mongo';
import session from "express-session";
import { config } from 'dotenv';
import methodOverride from "method-override";

const app: Application = express();
config();

app.use(methodOverride("_method"))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "Some Random String",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        secure: false,
        maxAge: 86_400_000
    }
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayout);
app.set('view engine', 'ejs')
app.use('/', webRoutes)
app.use('/admin', adminRouter)

export default app;