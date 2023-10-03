import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { Avaliacao } from "../models/avaliacao.model";

class AvaliacaoService {
    public async listFromUser(idUser: string): Promise<ResponseDto> {
        // 1- validar se o user existe
        const user = await repository.user.findUnique({
            where: {
                id: idUser,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        // 2- listar as avaliacoes do user
        const avaliacoes = await repository.avaliacao.findMany({
            where: {
                idUser,
            },
        });

        const avaliacoesModel = avaliacoes.map((item) => this.mapToModel(item));

        return {
            code: 200,
            message: "Avaliacoes successfully listed",
            data: avaliacoesModel.map((item) => item.toJson()),
        };
    }

    public mapToModel(avaliacao: any) {
        const model = new Avaliacao(
            avaliacao.modulo,
            avaliacao.nota,
            avaliacao.idUser
        );

        model.id = avaliacao.id;

        return model;
    }
}

export default new AvaliacaoService();
