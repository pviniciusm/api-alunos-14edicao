import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { User } from "../models/user.model";

class UserService {
    public async listAll(): Promise<ResponseDto> {
        const data = await repository.user.findMany();

        return {
            code: 200,
            message: "Users successfully listed",
            data,
        };
    }

    public async create(data: CreateUserDto) {
        const user = new User(data.username, data.password);

        const createdUser = await repository.user.create({
            data: {
                password: user.password,
                username: user.username,
                enable: user.enable,
                id: user.id,
            },
        });

        return createdUser;
    }

    public async delete(id: string): Promise<ResponseDto> {
        // 1- verificar se user existe
        const user = await repository.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        // 2- deletar o user
        await repository.user.delete({
            where: {
                id,
            },
        });

        return {
            code: 200,
            message: "User successfully deleted",
        };
    }

    public async update(data: UpdateUserDto): Promise<ResponseDto> {
        // 1 - verificar se o user existe
        const user = await repository.user.findUnique({
            where: {
                id: data.id,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        // 2 - atualizar o user
        const updatedUser = await repository.user.update({
            where: {
                id: data.id,
            },
            data: {
                password: data.password,
                enable: data.enable,
            },
        });

        return {
            code: 200,
            message: "User successfully updated",
            data: updatedUser,
        };
    }
}

export default new UserService();
