import { PaymentDatabase } from "../db/payment/paymentDatabase";
import { DomainEventPublisher } from "../events/interfaces";
import { PaymentStatusChanged } from "../events/paymentEvents";
import { Payment, PaymentStatus, PaymentType } from "../models/payment";
import { User } from "../models/user";
import { ApplicationService } from "./application.service";

export class PaymentService implements ApplicationService{
    static getType(): string {
        return 'PaymentService';
    }
    private readonly db:PaymentDatabase;
    private readonly publisher: DomainEventPublisher;
    constructor(db:PaymentDatabase,publisher: DomainEventPublisher){
        this.db = db;
        this.publisher = publisher;
    }
    public async get(id:number):Promise<Payment|null>{
        return await this.db.get(id);
    }
    public async getAll(ids:number[]):Promise<Payment[]>{
        return await this.db.getAll(ids);
    }
    public async getByIdSerial(id:string):Promise<Payment|null>{
        return await this.db.getByIdSerial(id);
    }
    public async getAllForUser(user:User):Promise<Payment[]>{
        return await this.db.getAllForUser(user);
    }
    public async getAllByStatus(status:PaymentStatus):Promise<Payment[]>{
        return await this.db.getAllByStatus(status);
    }
    public async add(payment:Payment):Promise<Payment>{
        this.publisher.publish(new PaymentStatusChanged(payment));
        return await this.db.add(payment);
    }
    public async setStatus(payment:Payment,status:PaymentStatus):Promise<boolean>{
        payment.status = status;
        var updated = await this.db.update(payment);
        if(!updated) return false;
        this.publisher.publish(new PaymentStatusChanged(payment));
        return true;
    }
}