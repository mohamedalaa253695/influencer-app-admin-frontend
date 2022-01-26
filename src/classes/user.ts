import { Entity } from "@/interfaces/entity";
import { Role } from "./Role";

export class User implements Entity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: Role;
    permissions: string[];

    constructor(id = 0, firs_name = '', last_name = '', email = '', role = new Role(), permissions: string[]) {
        this.id = id;
        this.first_name = firs_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.permissions = permissions;
    }

}