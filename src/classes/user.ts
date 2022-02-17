import { Entity } from "@/interfaces/entity";
import { Role } from "./role";

export class User implements Entity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: Role;
    permissions: string[];

    constructor(id = 0, firs_name = '', last_name = '', email = '', role:Role = new Role(), permissions : string[]=[]) {
        this.id = id;
        this.first_name = firs_name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.permissions = permissions;
    }


    get name(){
        return this.first_name + ' ' +this.last_name;
    }

    canView(page: string) {
        console.log(this.permissions.some(p => p === `view_${page}`));
        return this.permissions.some(p => p === `view_${page}`);
    }

    canEdit(page: string) {
        return this.permissions.some(p => p === `edit_${page}`);
    }

    getPermissions() {
        return this.permissions;
    }

}