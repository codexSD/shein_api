import { ResponseBuilder } from "../../response/response.builder";
import { Request, Response } from "express";
import service from "../../service";
import { UUID } from "../../common/UUID";
import { Product } from "../../models/product";
import { Store } from "../../models/store";

export class StoreController{
    
    public static GetAll = async(req:Request,res:Response)=>{
        var allStores = await service.storeService.getAll();
        res.status(200).send(ResponseBuilder.Ok(allStores));
    }
    public static Get = async(req:Request,res:Response)=>{
        var storeId:UUID = UUID.of(req.body.storeId);
        var store = await service.storeService.get(storeId);
        res.status(200).send(ResponseBuilder.Ok(store));
    }
    
    public static Create = async(req:Request,res:Response)=>{
        var name: string = req.body.name;
        var description: string = req.body.description;
        var imageUrl: string = req.body.imageUrl;
    
        var newStore = new Store(name,description,imageUrl);
        var createdStore = await service.storeService.create(newStore);
    
        res.status(200).send(ResponseBuilder.Ok(createdStore));
    }
    public static Update = async(req:Request,res:Response)=>{
        var storeId:UUID = UUID.of(req.body.storeId);
        var name: string = req.body.name;
        var description: string = req.body.description;
        var imageUrl: string = req.body.imageUrl;

        var currentStore = await service.storeService.get(storeId);
        currentStore.name = name;
        currentStore.description = description;
        currentStore.imageUrl = imageUrl;
        var updatedStore = await service.storeService.update(currentStore);
        res.status(200).send(ResponseBuilder.Ok(updatedStore));
    }
    public static Delete = async(req:Request,res:Response)=>{
        var storeId:UUID = UUID.of(req.body.storeId);
        var store = await service.storeService.get(storeId);
        await service.productService.deleteByStore(store);
        await service.storeService.delete(store);
        res.status(200).send(ResponseBuilder.Ok().setMessage("Store deleted successfully"));
    }
}