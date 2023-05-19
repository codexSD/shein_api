import { json } from "body-parser";
import { Request, Response } from "express";
import util from "node:util";
import { Utils } from "../../common/Utils";
import { RoleMustHavePermissions, RoleNotFound, UnknownPermission } from "../../exceptions/errors";
import { Permission, Role } from "../../models/permissions"
import { ResponseBuilder } from "../../response/response.builder";
import service from "../../service";


export class RoleController{
    
    public static getAll = async(req:Request,res:Response)=>{
        var allRoles = await service.roleService.GetAllRoles();
        res.status(200).send(new ResponseBuilder(allRoles));
    }

    public static get = async(req:Request,res:Response)=>{
        var id = req.body.id;
        var role = await service.roleService.GetRole(id);
        res.status(200).send(new ResponseBuilder(role));
    }

    public static create = async(req:Request,res:Response)=>{
        var name = req.body.name;
        var permissions:Permission[] = Utils.GetPermissionsFromRequest(req.body.permissions);
        var role = await service.roleService.CreateRole(new Role(0,name,permissions));
        res.status(200).send(new ResponseBuilder(role).setMessage('Role created'));
    }

    public static update = async(req:Request,res:Response) =>{
        var id = req.body.id;
        var name = req.body.name;
        var permissions:Permission[] = Utils.GetPermissionsFromRequest(req.body.permissions);
        var role = await service.roleService.GetRole(id);
        role.name = name;
        role.permissions = permissions;
        var result = await service.roleService.UpdateRole(role);
        res.status(200).send(new ResponseBuilder(result));
        // res.status(200).send(new ResponseBuilder(role).setMessage('Role Updated Successfuly'));
    }
    // public static getSome = async(req:Request,res:Response)=>{
    //     var ids = req.body.ids;
    //     var roles = await service.roleService.GetRoles(ids);
    //     res.status(200).send(new ResponseBuilder(roles));
    // }
    public static remove = async(req:Request,res:Response)=>{
        var id = req.body.id;
        var role = await service.roleService.GetRole(id);
        var deleted = await service.roleService.RemoveRole(role);
        res.status(200).send(new ResponseBuilder(deleted));
    }
}