import { Request,Response } from "express";
import { Utils } from "../../common/Utils";
import { CartNotFounded } from "../../exceptions/errors";
import { SheinCartStatus } from "../../models/shein_cart";
import { User } from "../../models/user";
import { ResponseBuilder } from "../../response/response.builder";
import service from "../../service";

export class SheinCartController{

    public static createCart = async(req:Request,res:Response)=>{
        var jsonData:string = req.body.data;
        var user:User = req.body.user;
        //todo  should validate jsonData
        var cart = await service.sheinCartService.createCart(user,jsonData);
        res.status(200).send(new ResponseBuilder(cart).setMessage('Cart created'));
    }
    
    public static changeCartStatus = async(req:Request,res:Response)=>{
        var id:number = Utils.Decode(req.body.id);
        var status = req.body.status as SheinCartStatus;
        var cart = await service.sheinCartService.getCart(id);
        if(cart == null) throw new CartNotFounded();
        var result = await service.sheinCartService.changeCartStatus(cart,status);
    }

}