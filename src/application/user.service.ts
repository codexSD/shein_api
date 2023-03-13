import { UserDatabase } from '../db/user/interfaces/user_database';
import { PhoneNumberIsNotUnique } from '../exceptions/errors';
import { User } from '../models/user';
import { ApplicationService } from './application.service';

export class UserService implements ApplicationService {
  private readonly userDatabase: UserDatabase;
  public constructor(userDatabse: UserDatabase) {
    this.userDatabase = userDatabse;
  }
  public async create(user: User): Promise<User> {
    if (!(await this.userDatabase.isPhoneUnique(user.phone))) throw new PhoneNumberIsNotUnique();
    return await this.userDatabase.create(user);
  }
  static getType(): string {
    return 'UserService';
  }
}
