import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRoutes = () => {
    const router = Router();

    router.get("/", new UserController().list);
    router.post("/", new UserController().create);

    return router;
};
