import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiV1 from './api/index';
import { UserService } from './application/user.service';
import { ApplicationService } from './application/application.service';
import { UserInMemoryDb } from './db/user/in_memory_db';
import { DomainEventPublisher, ForwardDomainEventPublisher } from './events/interfaces';
import { UserCreated, WelcomeEmail } from './events/user';
import { TokenService } from './application/token.service';
import { TokenInMemoryDb } from './db/token/in_memory_db';
import { User } from './models/user';
import { PhoneNumber } from './common/phone';
import { Password } from './common/password';
import { PaymentService } from './application/payment.service';

class Service {
  private readonly _express: express.Application;
  private readonly _appServices: Map<string, ApplicationService>;
  private readonly publisher: DomainEventPublisher;
  get express(): express.Application {
    return this._express;
  }
  get appServices(): Map<string, ApplicationService> {
    return this._appServices;
  }
  get userService():UserService{
    return this.appServices.get(UserService.getType()) as UserService;
  }
  get tokenService():TokenService{
    return this.appServices.get(TokenService.getType()) as TokenService;
  }
  get paymentService():PaymentService{
    return this.appServices.get(PaymentService.getType()) as PaymentService;
  }

  constructor() {
    this._express = express();
    this._appServices = new Map<string, ApplicationService>();
    this.publisher = new ForwardDomainEventPublisher();
    this.setUp();
  }
  public async setUp(): Promise<void> {
    this.setApplicationServices();
    this.setMiddlewares();
    this.registerEventsSubscribers();
    this.setData();
    this.setRoutes();
  }
  private async setData():Promise<void>{
    var user = await this.userService.create(new User('sara',PhoneNumber.of(249,921125426),await Password.of('123456789')));
    await this.tokenService.create(user);
  }
  protected setApplicationServices(): void {
    this.appServices.set(UserService.getType(), new UserService(new UserInMemoryDb(), this.publisher));
    this.appServices.set(TokenService.getType(),new TokenService(new TokenInMemoryDb()));
  }
  public setRoutes(): void {
    this._express.use('/api/v1', apiV1);
  }

  private setMiddlewares(): void {
    this._express.use(cors());
    this._express.use(morgan('dev'));
    this._express.use(bodyParser.json());
    this._express.use(bodyParser.urlencoded({ extended: false }));
    this._express.use(helmet());
  }

  private registerEventsSubscribers() {
    this.publisher.subscribe(new WelcomeEmail());
  }
}

export default new Service();
