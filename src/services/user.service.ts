import repository from "../database/prisma.database";
import { User } from "../models/user.model";

class UserService {
    public async listAll() {
        const data = await repository.user.findMany();

        return data;
    }

    public async create(data: any) {
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
}

export default new UserService();
