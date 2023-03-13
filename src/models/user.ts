import { PhoneNumber } from '../common/phone';
import { Password } from '../common/password';
import { Request } from 'express';

export class User {
  id: number | undefined;
  name: string;
  phone: PhoneNumber;
  password: Password;
  constructor(name: string, phone: PhoneNumber, password: Password) {
    this.name = name;
    this.phone = phone;
    this.password = password;
  }
  static async of(req: Request) {
    const body = req.body;
    console.log(body.name);
    return new User(body.name, PhoneNumber.of(body.key, body.phone), await Password.of(body.password));
  }
  public toJSON(): any {
    return {
      phone: this.phone.getValue(),
      name: this.name,
    };
  }
}
