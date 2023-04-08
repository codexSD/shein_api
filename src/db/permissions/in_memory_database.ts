import { Role } from "../../models/permissions";
import { RoleDatabase, UserRoleDatabase } from "./permissionDatabase";

export class InMemoryRoleDatabase implements RoleDatabase{
    private roles:Role[] = [];
    private counter = 1;
    createRole(role: Role): Promise<Role> {
        role.id = this.counter++;
        this.roles.push(role);
        return Promise.resolve(role);
    }
    removeRole(role: Role): Promise<boolean> {
        for(var i=0;i<this.roles.length;i++){
            if(this.roles[i].id == role.id){
                this.roles = this.roles.splice(i,1);
                return Promise.resolve(true);
            }      
        }
        return Promise.resolve(false);
    }
    getAllRoles(): Promise<Role[]> {
        var res:Role[] = [];
        for(var role of this.roles){
            res.push(role);
        }
        return Promise.resolve(res);
    }
    getRole(id: number): Promise<Role | null> {
        for(var role of this.roles){
            if(role.id == id) return Promise.resolve(role);
        }
        return Promise.resolve(null);
    }
    getRoles(ids: number[]): Promise<Role[]> {
        var res:Role[] = [];
        for(var role of this.roles){
            for (const id of ids) {
               if(role.id == id){
                  res.push(role);
                  break;
               }
            }
        }
        return Promise.resolve(res);
    }

}

export class InMemoryUserRoleDatabase implements UserRoleDatabase{
    ids:{userId:number,roleId:number}[] = [];
    addUserRole(userId: number, roleId: number): Promise<boolean> {
        this.ids.push({userId:userId,roleId:roleId});
        return Promise.resolve(true);
    }
    getUserRolesIds(userId: number): Promise<number[]> {
        var ids:number[] = [];
        for (const id of this.ids) {
            if(id.userId == userId) ids.push(id.roleId);
        }
        return Promise.resolve(ids);
    }
    removeUserRole(userId: number, roleId: number): Promise<boolean> {
        for(var i=0;i<this.ids.length;i++){
            if(this.ids[i].userId == userId && this.ids[i].roleId == roleId){
                this.ids = this.ids.splice(i,1);
                return Promise.resolve(false);
            }
        }
        return Promise.resolve(false);        
    }
    removeUserRoles(userId: number): Promise<boolean> {
        var result = false;
        for(var i=0;i<this.ids.length;i++){
            if(this.ids[i].userId == userId){
                this.ids = this.ids.splice(i,1);
                result = true;
                i--;
            }
        }
        return Promise.resolve(result);        
    }
}