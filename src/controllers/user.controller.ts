import { Request, Response } from "express";
import userService from "../services/user.service";

export class UserController {
    public async list(req: Request, res: Response) {
        const result = await userService.listAll();

        return res.status(result.code).send(result);
    }

    public async create(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            // Isso ficaria em um middleware do tipo validator
            if (!username || !password) {
                return res.status(400).send({
                    ok: false,
                    message: "Username and/or password were not provided",
                });
            }

            const result = await userService.create({
                username,
                password,
            });

            return res.status(201).send({
                ok: true,
                message: "User successfully created",
                data: result,
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const result = await userService.delete(id);

            return res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { password, enable } = req.body;

            const result = await userService.update({
                id,
                password,
                enable,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
