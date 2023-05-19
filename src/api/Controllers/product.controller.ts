import { ResponseBuilder } from "../../response/response.builder";
import { Request, Response } from "express";
import service from "../../service";
import { UUID } from "../../common/UUID";

export class ProductController{
    
    public static ReadAll = async(req:Request,res:Response)=>{
        var allProducts = await service.productService.getAll();
        res.status(200).send(new ResponseBuilder(allProducts));
    }
    public static Read = async(req:Request,res:Response)=>{
        var productId:UUID = UUID.of(req.body.productId);
        var product = await service.productService.get(productId);
        res.status(200).send(new ResponseBuilder(product));
    }
    public static Create = async(req:Request,res:Response)=>{
        var productId:UUID = UUID.of(req.body.productId);
        var product = await service.productService.get(productId);

        var name: string = req.body.name;
        var description: string = req.body.description;
        var imageUrl: string = req.body.imageUrl;
        var price: number = req.body.price;
        var storeId: UUID = UUID.of(req.body.storeId);

        res.status(200).send(new ResponseBuilder(product));
    }
}