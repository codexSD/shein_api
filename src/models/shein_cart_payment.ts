import { Payment } from './payment';
import { SheinCart } from './shein_cart';

export class SheinCartPayment {
  cart: SheinCart;
  payments: Payment[];
  constructor(cart: SheinCart, payments: Payment[]) {
    this.cart = cart;
    this.payments = payments;
  }
}
