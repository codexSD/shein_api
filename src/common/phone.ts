import { PhoneNumberNotCorrect } from "../exceptions/errors";

export class PhoneNumber{
    public readonly key:number;
    public readonly phone:number;
    private constructor(key:number,phone:number){
        this.key = key;
        this.phone = phone;
    }
    private static isValid(key:number,phone:number):boolean {
        return key == 249 && phone > 99999999 && phone <= 999999999;//phone length &&  sudani number
    }
    public static of(key:number,phone:number):PhoneNumber {
        if(this.isValid(key,phone)) return new PhoneNumber(key,phone);
        throw new PhoneNumberNotCorrect();
    }
    public getValue():string{
        return `+${this.key}${this.phone}`;
    }
}