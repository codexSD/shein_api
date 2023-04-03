import { SheinCartDatabase } from "../db/sheinCart/interfaces/sheinCartDatabase";
import { Payment } from "../models/payment";
import { SheinCart, SheinCartStatus } from "../models/shein_cart";
import { User } from "../models/user";
import { ApplicationService } from "./application.service";
import service from '../service';
import { DomainEventPublisher } from "../events/interfaces";
import { SheinCartAdded, SheinCartStatusChanged } from "../events/sheinCart.events";

export class SheinCartService implements ApplicationService{
    private db:SheinCartDatabase;
    private readonly publisher: DomainEventPublisher;
    public constructor(db:SheinCartDatabase,publisher: DomainEventPublisher){
        this.db = db;
        this.publisher = publisher;
    }
    public async addCart(user:User,data:string):Promise<SheinCart>{
        var cart = new SheinCart(0,user.id,data,SheinCartStatus.Pending);
        cart = await this.db.add(cart);
        this.publisher.publish(new SheinCartAdded(cart));
        return cart;
    }
    public async changeCartStatus(cart:SheinCart,status:SheinCartStatus):Promise<boolean>{
        var changed = await this.db.changeStatus(cart.id,status);
        cart.status = status;
        this.publisher.publish(new SheinCartStatusChanged(cart));
        return changed;
    }
}