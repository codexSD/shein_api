import { Permission, Role } from "../../models/permissions";
import { User } from "../../models/user";

export interface RoleDatabase{
    createRole(role:Role):Promise<Role>;
    removeRole(role:Role):Promise<boolean>;
    getAllRoles():Promise<Role[]>;
    getRole(id:number):Promise<Role|null>;
    getRoles(ids:number[]):Promise<Role[]>;
}
export interface UserRoleDatabase{
    addUserRole(userId:number,roleId:number):Promise<boolean>;
    getUserRolesIds(userId:number):Promise<number[]>;
    removeUserRole(userId:number,roleId:number):Promise<boolean>;
    removeUserRoles(userId:number):Promise<boolean>; 
}