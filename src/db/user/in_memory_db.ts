import { Password } from "../../common/password";
import { PhoneNumber } from "../../common/phone";
import { User } from "../../models/user";
import { UserDatabase } from "./interfaces/user_database";

export class UserInMemoryDb implements UserDatabase{
    // public constructor(){
    //     var test = async ()=>{
    //         var user:User = new User('sara',PhoneNumber.of(249,921125426),await Password.of('123456789'));
    //         this.create(user);
    //     };
    //     test();
    // }
    getUser(id: number): Promise<User|null> {
        for(var user of UserInMemoryDb.users){
            if(user.id == id)
                return Promise.resolve(user);
        }
        return Promise.resolve(null);
    }
    async login(key: number, phone: number, password: string): Promise<User | null> {
        var result:User|null = null;
        var pass:string = (await Password.of(password)).getHashedValue();
        UserInMemoryDb.users.forEach(user => {
            if(user.phone.getValue() == PhoneNumber.of(key,phone).getValue() && pass == user.password.getHashedValue())
                result = user;
        });
        return Promise.resolve(result);
    }
    private static users:User[] = [];
    private static id:number = 1;
    isPhoneUnique(phone: PhoneNumber): Promise<boolean> {
        return Promise.resolve(!UserInMemoryDb.users.find(u=> u.phone.getValue() === phone.getValue()));
    }
    create(user: User): Promise<User> {
        user.id = UserInMemoryDb.id++;
        UserInMemoryDb.users.push(user);
        return Promise.resolve(user);
    }
    updateName(user:User):Promise<boolean>{
        for (let index = 0; index < UserInMemoryDb.users.length; index++) {
            const u = UserInMemoryDb.users[index];
            if(user.id == u.id){
                UserInMemoryDb.users[index] = user;
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
}