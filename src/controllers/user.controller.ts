import { Request, Response } from "express";
import userService from "../services/user.service";

export class UserController {
    public async list(req: Request, res: Response) {
        const result = await userService.listAll();

        return res.status(200).send({
            ok: true,
            message: "Users successfully listed",
            data: result,
        });
    }

    public async create(req: Request, res: Response) {
        const { username, password } = req.body;

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
    }

    public async delete() {}

    public async update() {}
}
