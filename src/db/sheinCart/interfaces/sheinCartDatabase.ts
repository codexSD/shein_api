import { SheinCart, SheinCartStatus } from "../../../models/shein_cart";

export interface SheinCartDatabase{
    add(cart:SheinCart):Promise<SheinCart>;
    get(id:number):Promise<SheinCart|null>;
    getAllByUser(user_id:number):Promise<SheinCart[]>;
    changeStatus(id:number,status:SheinCartStatus):Promise<boolean>;
    remove(id:number):Promise<boolean>;
}