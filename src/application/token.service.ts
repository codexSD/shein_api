import { TokenDatabase } from "../db/token/interfaces/token_database";
import { Token } from "../models/token";
import { User } from "../models/user";
import { ApplicationService } from "./application.service";
import jwt from 'jsonwebtoken';
import { AuthorizationError } from "../exceptions/errors";


export class TokenService implements ApplicationService{
    private readonly database:TokenDatabase;
    public constructor(db:TokenDatabase){
        this.database = db;
    }
    public async create(user:User):Promise<Token>{
        var date = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30));
        return await this.database.create(user.id,date);
    }
    public async get(id:number):Promise<Token|null>{
        return await this.database.get(id);
    }
    public async delete(user:User):Promise<void>{
        return await this.database.remove(user.id);
    }
    public async deleteExpired():Promise<void>{
        return await this.database.removeAllOldThanMonth();
    }
    static getType(): string {
      return 'TokenService';
    }
}