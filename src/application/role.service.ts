import { RoleDatabase } from "../db/permissions/permissionDatabase";
import { Role } from "../models/permissions";
import { ApplicationService } from "./application.service";

export class RoleService implements ApplicationService{
    static getType(): string {
        return 'RoleService';
    }
    db:RoleDatabase;
    constructor(db:RoleDatabase){
        this.db = db;
    }
    public async CreateRole(role:Role):Promise<Role>{
        return await this.db.createRole(role);
    }
    public async RemoveRole(role:Role):Promise<boolean>{
        return await this.db.removeRole(role);
    }
    public async GetAllRoles():Promise<Role[]>{
        return await this.db.getAllRoles();
    }
    public async GetRole(id:number):Promise<Role|null>{
        return await this.db.getRole(id);
    }
    public async GetRoles(ids:number[]):Promise<Role[]>{
        return await this.db.getRoles(ids);
    }
}