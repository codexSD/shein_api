import { UUID } from "../common/UUID";
import { ProductDatabase } from "../db/product/ProductDatabase";
import { OperationFailed, ProductNotFound } from "../exceptions/errors";
import { Product } from "../models/product";
import { Store } from "../models/store";
import { ApplicationService } from "./application.service";

export class ProductService implements ApplicationService{
    db:ProductDatabase;
    static getType(): string {
        return 'ProductService';
    }
    constructor(db:ProductDatabase) {
        this.db = db;
    }
    public async get(uuid:UUID):Promise<Product>{
        try {
            var result = await this.db.get(uuid);
        } catch (error) {
            throw new OperationFailed();
        }
        if(result == null)
            throw new ProductNotFound();
        return result;
    }
    public async getAll():Promise<Product[]>{
        try {
            var result = await this.db.getAll();
            return result;
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async getByStore(store:Store):Promise<Product[]>{
        try {
            var result = await this.db.getByStore(store);
            return result;
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async create(product:Product):Promise<Product>{
        try {
            var result = await this.db.add(product);
            return result;
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async update(product:Product):Promise<void>{
        try {
            var result = await this.db.edit(product);
            if(!result) throw new OperationFailed();
            return Promise.resolve();
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async delete(product:Product):Promise<void>{
        try {
            var result = await this.db.remove(product);
            if(!result) throw new OperationFailed();
            return Promise.resolve();
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async deleteByStore(store:Store):Promise<void>{
        try {
            var result = await this.db.removeByStore(store);
            if(!result) throw new OperationFailed();
            return Promise.resolve();
        } catch (error) {
            throw new OperationFailed();
        }
    }
}