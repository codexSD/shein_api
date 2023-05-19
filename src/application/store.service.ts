import { UUID } from "../common/UUID";
import { StoreDatabase } from "../db/store/StoreDatabase";
import { OperationFailed, StoreNotFound } from "../exceptions/errors";
import { Store } from "../models/store";
import { ApplicationService } from "./application.service";

export class StoreService implements ApplicationService{
    static getType(): string {
        return 'StoreService';
    }
    db:StoreDatabase;
    constructor(db:StoreDatabase){
        this.db = db;
    }
    public async read(uuid:UUID):Promise<Store>{
        try {
            var result = await this.db.read(uuid);
            if(result == null)
                throw new StoreNotFound();
            return result;
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async readAll():Promise<Store[]>{
        try {
            var result = await this.db.readAll();
            return result;
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async create(store:Store):Promise<Store>{
        try {
            var result = await this.db.create(store);
            return result;
        } catch (error) {
            throw new OperationFailed();
        }
    }
    public async update(store:Store):Promise<void>{
        try {
            var result = await this.db.update(store);
        } catch (error) {
            throw new OperationFailed();
        }
        if(!result) throw new OperationFailed();
        return Promise.resolve();
    }
    public async delete(store:Store):Promise<void>{
        try {
            var result = await this.db.delete(store);
        } catch (error) {
            throw new OperationFailed();
        }
        if(!result) throw new OperationFailed();
        return Promise.resolve();
    }
}