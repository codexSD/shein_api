import { Request,Response } from "express";
import { RoleNotFound, UserAlreadyHasThisRole, UserNotFound } from "../../exceptions/errors";
import { Role } from "../../models/permissions";
import { ResponseBuilder } from "../../response/response.builder";
import service from "../../service";

export class UserRoleController{
    public static Get = async(req:Request,res:Response)=>{
        var userId = req.body.userId;
        var user = await service.userService.get(userId);
        var roles = await service.userRoleService.getUserRoles(user);
        res.status(200).send(new ResponseBuilder(roles));        
    }
    public static Add = async(req:Request,res:Response)=>{
        var userId = req.body.userId;
        var roleId = req.body.roleId;
        var user = await service.userService.get(userId);
        var newRole = await service.roleService.GetRole(roleId);
        var roles:Role[] = await service.userRoleService.getUserRoles(user);
        for (var role of roles) {
            if(role.id == newRole.id) throw new UserAlreadyHasThisRole();
        }
        await service.userRoleService.AddUserRole(user,newRole);
        res.status(200).send(ResponseBuilder.Ok().setMessage('Role Added Successfuly'));
    }
    public static Remove = async(req:Request,res:Response)=>{
        var userId = req.body.userId;
        var roleId = req.body.roleId;
        var user = await service.userService.get(userId);
        var role = await service.roleService.GetRole(roleId);
        await service.userRoleService.removeUserRole(user,role);
        res.status(200).send(ResponseBuilder.Ok().setMessage('Role Removed Successfuly'));
    }
}