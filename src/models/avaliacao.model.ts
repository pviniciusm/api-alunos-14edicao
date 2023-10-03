import { v4 as createUuid } from "uuid";

export class Avaliacao {
    private _id: string;

    constructor(
        private _modulo: string,
        private _nota: number,
        private _idUser: string
    ) {
        this._id = createUuid();
    }

    public get id() {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public toJson() {
        return {
            id: this._id,
            modulo: this._modulo,
            nota: this._nota,
        };
    }
}
