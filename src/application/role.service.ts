import { RoleDatabase } from "../db/permissions/permissionDatabase";
import { RoleNotFound } from "../exceptions/errors";
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
    public async UpdateRole(role:Role):Promise<Boolean>{
        return await this.db.updateRole(role);
    }
    public async RemoveRole(role:Role):Promise<boolean>{
        return await this.db.removeRole(role);
    }
    public async GetAllRoles():Promise<Role[]>{
        return await this.db.getAllRoles();
    }
    public async GetRole(id:number):Promise<Role>{
        var role = await this.db.getRole(id);
        if(role == null) throw new RoleNotFound();
        return role;
    }
    public async GetRoles(ids:number[]):Promise<Role[]>{
        return await this.db.getRoles(ids);
    }
}