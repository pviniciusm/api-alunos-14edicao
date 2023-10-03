import { Request, Response } from "express";
import avaliacaoService from "../services/avaliacao.service";

export class AvaliacaoController {
    public async list(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            const result = await avaliacaoService.listFromUser(userId);

            return res.status(result.code).send(result);
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
