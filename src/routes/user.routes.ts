import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AvaliacaoController } from "../controllers/avaliacao.controller";

export const userRoutes = () => {
    const router = Router();

    router.get("/", new UserController().list);
    router.post("/", new UserController().create);
    router.delete("/:id", new UserController().delete);
    router.put("/:id", new UserController().update);

    router.get("/:userId/avaliacao", new AvaliacaoController().list);

    return router;
};
