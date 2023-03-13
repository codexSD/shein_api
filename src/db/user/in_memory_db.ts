import { PhoneNumber } from "../../common/phone";
import { User } from "../../models/user";
import { UserDatabase } from "./interfaces/user_database";

export class UserInMemoryDb implements UserDatabase{
    private users:User[] = [];
    private id:number = 1;
    isPhoneUnique(phone: PhoneNumber): Promise<boolean> {
        return Promise.resolve(!this.users.find(u=> u.phone.getValue() === phone.getValue()));
    }
    create(user: User): Promise<User> {
        user.id = this.id++;
        this.users.push(user);
        return Promise.resolve(user);
    }
}