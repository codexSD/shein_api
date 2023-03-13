import { PhoneNumber } from "../../../common/phone";
import { User } from "../../../models/user";

export interface UserDatabase {
    isPhoneUnique(phone:PhoneNumber):Promise<boolean>;
    create(user:User):Promise<User>;
}