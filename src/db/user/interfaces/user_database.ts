import { PhoneNumber } from "../../../common/phone";
import { User } from "../../../models/user";

export interface UserDatabase {
    isPhoneUnique(phone:PhoneNumber):Promise<boolean>;
    create(user:User):Promise<User>;
    updateName(user:User):Promise<boolean>;
    getUser(id:number):Promise<User|null>;
    login(key:number,phone:number,password:string):Promise<User|null>;
}