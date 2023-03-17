import { UserDatabase } from '../db/user/interfaces/user_database';
import { DomainEventPublisher } from '../events/interfaces';
import { UserCreated } from '../events/user';
import { PhoneNumberIsNotUnique } from '../exceptions/errors';
import { User } from '../models/user';
import { ApplicationService } from './application.service';

export class UserService implements ApplicationService {
  private readonly userDatabase: UserDatabase;
  private readonly publisher: DomainEventPublisher;

  public constructor(userDatabase: UserDatabase, publisher: DomainEventPublisher) {
    this.userDatabase = userDatabase;
    this.publisher = publisher;
  }
  public async create(user: User): Promise<User> {
    if (!(await this.userDatabase.isPhoneUnique(user.phone))) throw new PhoneNumberIsNotUnique();
    return this.createNewUser(user);
  }
  private async createNewUser(user: User): Promise<User> {
    var newUser = await this.userDatabase.create(user);
    this.publisher.publish(new UserCreated(user));
    return newUser;
  }
  static getType(): string {
    return 'UserService';
  }
}
