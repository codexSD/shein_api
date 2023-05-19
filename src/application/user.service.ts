import { UserDatabase } from '../db/user/interfaces/user_database';
import { DomainEventPublisher } from '../events/interfaces';
import { UserCreated, UserLoggedIn } from '../events/user';
import { LoginNotValid, PhoneNumberIsNotUnique, UserNotFound } from '../exceptions/errors';
import { User } from '../models/user';
import { ApplicationService } from './application.service';
import jwt from 'jsonwebtoken';

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
  public async updateName(user:User):Promise<boolean>{
    return await this.userDatabase.updateName(user);
  }
  public async get(id:number):Promise<User>{
    var user = await this.userDatabase.getUser(id);
    if(user == null) throw new UserNotFound();
    return user;
  }
  private async createNewUser(user: User): Promise<User> {
    var newUser = await this.userDatabase.create(user);
    this.publisher.publish(new UserCreated(newUser));
    return newUser;
  }
  public async login(key:number,phone:number,password:string):Promise<User>{
    var newUser = await this.userDatabase.login(key,phone,password);
    if(newUser == null) throw new LoginNotValid();
    this.publisher.publish(new UserLoggedIn(newUser));
    return newUser;
    // return newUser;
  }
  static getType(): string {
    return 'UserService';
  }
}
