import { v4 as createUuid } from "uuid";

export class User {
    private _id: string;
    private _enable: boolean;

    constructor(private _username: string, private _password: string) {
        this._enable = true;
        this._id = createUuid();
    }

    public get id() {
        return this._id;
    }

    // getter
    public get username() {
        return this._username;
    }

    public get password() {
        return this._password;
    }

    public get enable() {
        return this._enable;
    }

    public toJson() {
        return {
            id: this._id,
            username: this._username,
            password: this._password,
        };
    }
}
