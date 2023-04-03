import { Payment, PaymentStatus, PaymentType } from "../../models/payment";
import { User } from "../../models/user";

export interface PaymentDatabase{
    get(id:number):Promise<Payment|null>;
    getAll(ids:number[]):Promise<Payment[]>;
    getByIdSerial(id:string):Promise<Payment|null>;
    getAllForUser(user:User):Promise<Payment[]>;
    getAllByStatus(status:PaymentStatus):Promise<Payment[]>;
    add(payment:Payment):Promise<Payment>;
    update(payment:Payment):Promise<boolean>;
}