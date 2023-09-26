import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const repository = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/usuario", async (req: Request, res: Response) => {
    // Lista os usuarios no BD
    const result = await repository.usuario.findMany({
        select: {
            id: true,
            nomeCompleto: true,
            dtNascimento: true,
            endereco: true,
            email: true,
            dthrCriacao: true,
        },
    });

    res.status(200).send({
        ok: true,
        message: "Usuarios listados com sucesso",
        data: result,
    });
});

app.listen(3333, () => {
    console.log("API está rodando na porta 3333");
});
