import { Payment } from "../../models/payment";
import { SheinCart } from "../../models/shein_cart";
import { SheinCartPaymentDatabase } from "./SheinCartPaymentDatabase";

export class InMemorySheinCartPaymentDatabase implements SheinCartPaymentDatabase{
    private carts:number[] = [];
    private payments:number[] = [];
    private values:{cartId:number,paymentId:number}[] = [];
    add(cart: SheinCart, payment: Payment): Promise<boolean> {
        this.values.push({cartId : cart.id,paymentId : payment.id});
        return Promise.resolve(true);
    }
    remove(cart: SheinCart, payment: Payment): Promise<boolean> {
        for(var i = 0;i<this.values.length;i++) {
            if(this.values[i].cartId == cart.id && this.values[i].paymentId == payment.id)
            this.values.splice(i,1);
        }
        return Promise.resolve(true);
    }
    get(cart: SheinCart): Promise<number[]> {
        var ids:number[] = [];
        for(var i = 0;i<this.values.length;i++) {
            if(this.values[i].cartId == cart.id)
                ids.push(this.values[i].paymentId);
        }
        return Promise.resolve(ids);
    }
    
}