import { RoleMustHavePermissions, UnknownPermission } from "../exceptions/errors";
import { Permission } from "../models/permissions";

export class Utils{
    public static Encode(value:number):string{
        var rep = '';
        var base:number = process.env.BASE_STR_ID!.length;
        var baseStr:string = process.env.BASE_STR_ID!;
        for(var i = value;i>0;){
            var remainder = i % base;
            var digRep = baseStr.substr(remainder,1);
            rep = digRep + rep;
            i = (i - remainder) / base;
        }
        return rep;
    }
    public static Decode(value:string):number{
        var number =0;
        var base:number = process.env.BASE_STR_ID!.length;
        var baseStr:string = process.env.BASE_STR_ID!;
        for(var i=0;i<value.length;i++){
            number = number*base;
            number += baseStr.indexOf(value[i]);
        }
        return number;
    }
    public static GetPermissionsFromRequest(permissionReqVar:any) : Permission[]{
        var perms = JSON.parse(permissionReqVar);
        if(!Array.isArray(perms)) throw new RoleMustHavePermissions();
        var permissions:Permission[] = [];
        for (let index = 0; index < perms.length; index++) {
            const element = perms[index];
            var num = Number.parseInt(element);
            if(!num || !Permission[num]) throw new UnknownPermission();
            permissions.push(num);
        }
        if(permissions.length == 0) throw new RoleMustHavePermissions();
        return permissions;
    }
}