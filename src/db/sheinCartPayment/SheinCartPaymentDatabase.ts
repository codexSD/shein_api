import { Payment } from "../../models/payment";
import { SheinCart } from "../../models/shein_cart";

export interface SheinCartPaymentDatabase{
    add(cart:SheinCart,payment:Payment):Promise<boolean>
    remove(cart:SheinCart,payment:Payment):Promise<boolean>
    get(cart:SheinCart):Promise<number[]>
}