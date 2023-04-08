import { UserRoleDatabase } from "../db/permissions/permissionDatabase";
import { Role } from "../models/permissions";
import { User } from "../models/user";
import service from "../service";
import { ApplicationService } from "./application.service";

export class UserRoleService implements ApplicationService{
    static getType(): string {
        return 'UserRoleService';
    }
    db:UserRoleDatabase;
    constructor(db:UserRoleDatabase){
        this.db = db;
    }
    public async AddUserRole(user:User,role:Role):Promise<boolean>{
        return await this.db.addUserRole(user.id,role.id);
    }
    public async getUserRoles(user:User):Promise<Role[]>{
        var ids = await this.db.getUserRolesIds(user.id);
        return await service.roleService.GetRoles(ids);
    }
    public async removeUserRole(user:User,role:Role):Promise<boolean>{
        return await this.db.removeUserRole(user.id,role.id);
    }
}