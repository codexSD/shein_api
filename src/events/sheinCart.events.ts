import { SheinCart } from "../models/shein_cart";
import { DomainEvent, DomainEventSubscriber } from "./interfaces";
export class SheinCartAdded implements DomainEvent{
    cart:SheinCart;
    constructor(cart:SheinCart){
        this.cart = cart;
    }
}
export class SheinCartStatusChanged implements DomainEvent{
    cart:SheinCart;
    constructor(cart:SheinCart){
        this.cart = cart;
    }
}

export class NotifySheinCartAdded implements DomainEventSubscriber {
    handle(event: DomainEvent): void {
      console.log('Shein Cart Added : ' + (event as SheinCartAdded).cart);
    }
    canHandle(event: DomainEvent): boolean {
      return event instanceof SheinCartAdded;
    }
  }

export class NotifySheinCartStatusChanged implements DomainEventSubscriber {
    handle(event: DomainEvent): void {
      console.log('Shein cart status changed : ' + (event as SheinCartStatusChanged).cart);
    }
    canHandle(event: DomainEvent): boolean {
      return event instanceof SheinCartStatusChanged;
    }
  }
