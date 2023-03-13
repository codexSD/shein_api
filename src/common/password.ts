import { hash } from "bcrypt";
import { PasswordNotValid } from "../exceptions/errors";

export class Password{
    private static MIN_PASS_LENGTH:number = 6;
    private static SALT_ROUNDS:number = 6;
    password:string;
    constructor(password:string){
        this.password = password;
    }
    public static async of(pass:string):Promise<Password>{
        if(this.isValid(pass)) return this.create(pass);
        throw new PasswordNotValid();
        
    }
    private static isValid(password:string):boolean{
        return password.length >= this.MIN_PASS_LENGTH;
    }
    public static ofHash(hash:string){
        return new Password(hash);
    }
    private static async create(password:string):Promise<Password>{
        const passHash = await hash(password,this.SALT_ROUNDS);
        return new Password(passHash);
    }

}