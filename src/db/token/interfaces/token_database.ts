import { Token } from "../../../models/token";

export interface TokenDatabase{
    get(id:number):Promise<Token|null>;
    create(userId:number,exp:Date):Promise<Token>;
    remove(userId:number):Promise<void>;
    removeAllOldThanMonth():Promise<void>;
}