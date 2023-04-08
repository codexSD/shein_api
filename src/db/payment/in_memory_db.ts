import { Payment, PaymentStatus } from "../../models/payment";
import { User } from "../../models/user";
import { PaymentDatabase } from "./paymentDatabase";

export class InMemoryPaymentDatabase implements PaymentDatabase{
    getAll(ids: number[]): Promise<Payment[]> {
        var payments:Payment[] = [];
        for (const id of ids) {
            for (let i = 0; i < this.payments.length; i++) {
                const pmt = this.payments[i];
                if(id == pmt.id){
                    payments.push(pmt);
                    break;
                }
            }
        }
        return Promise.resolve(payments);
    }
    add(payment: Payment): Promise<Payment> {
        payment.id = this.counter++;
        this.payments.push(payment);
        return Promise.resolve(payment);
    }
    update(payment: Payment): Promise<boolean> {
        for(var i=0;i<this.payments.length;i++){
            if(this.payments[i].id == payment.id){
                this.payments[i] = payment;
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
    private counter = 1;
    private payments:Payment[] = [];
    get(id: number): Promise<Payment | null> {
        for(var payment of this.payments)
            if(payment.id == id) return Promise.resolve(payment);
        return Promise.resolve(null);
    }
    getByIdSerial(id: string): Promise<Payment | null> {
        for(var payment of this.payments)
            if(payment.id_serial == id) return Promise.resolve(payment);
        return Promise.resolve(null);
    }
    getAllForUser(user: User): Promise<Payment[]> {
        var pays:Payment[] = [];
        for(var payment of this.payments)
            if(payment.user_id == user.id) pays.push(payment);
        return Promise.resolve(pays);
    }
    getAllByStatus(status: PaymentStatus): Promise<Payment[]> {
        var pays:Payment[] = [];
        for(var payment of this.payments)
            if(payment.status == status) pays.push(payment);
        return Promise.resolve(pays);
    }

}