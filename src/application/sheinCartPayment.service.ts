import { SheinCartPaymentDatabase } from "../db/sheinCartPayment/SheinCartPaymentDatabase";
import { Payment } from "../models/payment";
import { SheinCart } from "../models/shein_cart";
import service from "../service";
import { ApplicationService } from "./application.service";

export class SheinCartPaymentService implements ApplicationService{
    static getType(): string {
        return 'SheinCartPaymentService';
    }
    private readonly db:SheinCartPaymentDatabase;
    constructor(db:SheinCartPaymentDatabase){
        this.db = db;
    }
    public async addPayment(cart:SheinCart,payment:Payment):Promise<Payment>{
        var p = await service.paymentService.add(payment);
        this.db.add(cart,p);
        return p;
    }
    public async getAllPayments(cart:SheinCart):Promise<Payment[]>{
        var ids = await this.db.get(cart);
        return await service.paymentService.getAll(ids);
    }
}