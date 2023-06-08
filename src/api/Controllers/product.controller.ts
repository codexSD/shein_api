import { ResponseBuilder } from "../../response/response.builder";
import { Request, Response } from "express";
import service from "../../service";
import { UUID } from "../../common/UUID";
import { Product } from "../../models/product";

export class ProductController{
    
    public static ReadAll = async(req:Request,res:Response)=>{
        var allProducts = await service.productService.getAll();
        res.status(200).send(new ResponseBuilder(allProducts));
    }
    public static ReadByStore = async(req:Request,res:Response)=>{
        var storeId:UUID = UUID.of(req.body.storeId);
        var store = await service.storeService.get(storeId);
        var products = await service.productService.getByStore(store);
        res.status(200).send(new ResponseBuilder(products));
    }
    public static Read = async(req:Request,res:Response)=>{
        var productId:UUID = UUID.of(req.body.productId);
        var product = await service.productService.get(productId);
        res.status(200).send(new ResponseBuilder(product));
    }
    
    public static Create = async(req:Request,res:Response)=>{
        var name: string = req.body.name;
        var description: string = req.body.description;
        var imageUrl: string = req.body.imageUrl;
        var price = Number.parseFloat(req.body.price);
        var storeId: UUID = UUID.of(req.body.storeId);
        //check store existance
        var store = await service.storeService.get(storeId);
        
        var newProduct = new Product(name, description, imageUrl, price, storeId);
        var createdProduct = await service.productService.create(newProduct);
    
        res.status(200).send(new ResponseBuilder(createdProduct));
    }
    // Add the Update function
    public static Update = async(req:Request,res:Response)=>{
        var productId:UUID = UUID.of(req.body.productId);
        var product = await service.productService.get(productId);

        product.name = req.body.name;
        product.description = req.body.description;
        product.imageUrl = req.body.imageUrl;
        product.price = Number.parseFloat(req.body.price);
        product.storeId = UUID.of(req.body.storeId);

        var updatedProduct = await service.productService.update(product);
        res.status(200).send(new ResponseBuilder(updatedProduct));
    }

    public static Delete = async(req:Request,res:Response)=>{
        var productId:UUID = UUID.of(req.body.productId);
        var product = await service.productService.get(productId);
    
        await service.productService.delete(product);
        res.status(200).send(ResponseBuilder.Ok().setMessage("Product deleted successfully"));
    }
    public static DeleteByStore = async(req:Request,res:Response)=>{
        var storeId:UUID = UUID.of(req.body.storeId);
        var store = await service.storeService.get(storeId);
        await service.productService.deleteByStore(store);
        res.status(200).send(ResponseBuilder.Ok().setMessage("Products deleted successfully"));
    }
}