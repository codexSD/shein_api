import { Payment } from "../models/payment";
import { DomainEvent, DomainEventSubscriber } from "./interfaces";

export class PaymentStatusChanged implements DomainEvent{
    payment:Payment;
    constructor(payment:Payment){
        this.payment = payment;
    }
}

export class PaymentAdded implements DomainEvent{
    payment:Payment;
    constructor(payment:Payment){
        this.payment = payment;
    }
}
export class NotifyPaymentStatusChanged implements DomainEventSubscriber {
  handle(event: DomainEvent): void {
    console.log('Payment Status Changed : ' + (event as PaymentStatusChanged).payment);
  }
  canHandle(event: DomainEvent): boolean {
    return event instanceof PaymentStatusChanged;
  }
}
export class NotifyPaymentAdded implements DomainEventSubscriber {
  handle(event: DomainEvent): void {
    console.log('Payment Added : ' + (event as PaymentAdded).payment);
  }
  canHandle(event: DomainEvent): boolean {
    return event instanceof PaymentAdded;
  }
}