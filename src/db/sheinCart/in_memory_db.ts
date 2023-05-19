import { SheinCart, SheinCartStatus } from "../../models/shein_cart";
import { SheinCartDatabase } from "./interfaces/sheinCartDatabase";

export class InMemorySheinCartDatabase implements SheinCartDatabase{
    private static carts:SheinCart[] = [];
    private static counter = 1;
    add(cart: SheinCart): Promise<SheinCart> {
        cart.id = InMemorySheinCartDatabase.counter++;
        InMemorySheinCartDatabase.carts.push(cart);
        return Promise.resolve(cart);
    }
    get(id: number): Promise<SheinCart|null> {
        for(var cart of InMemorySheinCartDatabase.carts)
            if(cart.id == id) return Promise.resolve(cart);
        return Promise.resolve(null);
    }
    getAllByUser(user_id: number): Promise<SheinCart[]> {
        var carts:SheinCart[] = [];
        for(var cart of InMemorySheinCartDatabase.carts)
            if(cart.user_id == user_id) carts.push(cart);
        return Promise.resolve(carts);
    }
    changeStatus(id: number, status: SheinCartStatus): Promise<boolean> {
        for(var i=0;i<InMemorySheinCartDatabase.carts.length;i++){
            var cart = InMemorySheinCartDatabase.carts[i];
            if(cart.id == id) {
                InMemorySheinCartDatabase.carts[i].status = status;
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
    remove(id: number): Promise<boolean> {
        for(var i=0;i<InMemorySheinCartDatabase.carts.length;i++){
            var cart = InMemorySheinCartDatabase.carts[i];
            if(cart.id == id) {
                InMemorySheinCartDatabase.carts.splice(i,1);
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);        
    }

}