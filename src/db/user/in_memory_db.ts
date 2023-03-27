import { Password } from "../../common/password";
import { PhoneNumber } from "../../common/phone";
import { User } from "../../models/user";
import { UserDatabase } from "./interfaces/user_database";

export class UserInMemoryDb implements UserDatabase{
    getUser(id: number): Promise<User|null> {
        this.users.forEach(user => {
            if(user.id == id)
                return user;
        });
        return Promise.resolve(null);
    }
    async login(key: number, phone: number, password: string): Promise<User | null> {
        var result:User|null = null;
        var pass:string = (await Password.of(password)).password;
        this.users.forEach(user => {            
            if(user.phone.getValue() == PhoneNumber.of(key,phone).getValue() && pass == user.password.password)
                result = user;
        });
        return Promise.resolve(result);
    }
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
    updateName(name:String):Promise<boolean>{
        return Promise.resolve(true);
    }
}