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
import { RoleService } from './application/role.service';
import { UserRoleService } from './application/userRole.service';
import { InMemoryPaymentDatabase } from './db/payment/in_memory_db';
import { SheinCartService } from './application/sheinCart.service';
import { SheinCartPaymentService } from './application/sheinCartPayment.service';
import { InMemorySheinCartDatabase } from './db/sheinCart/in_memory_db';
import { InMemorySheinCartPaymentDatabase } from './db/sheinCartPayment/in_memory_db';
import { InMemoryRoleDatabase, InMemoryUserRoleDatabase } from './db/permissions/in_memory_database';
import { env } from 'process';
import userRouter from './api/routes/user.router';
import sheinCartRouter from './api/routes/sheinCart.router';
import { Permission, Role } from './models/permissions';
import { TokenController } from './api/token.controller';

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
  get roleService():RoleService{
    return this.appServices.get(RoleService.getType()) as RoleService;
  }
  get userRoleService():UserRoleService{
    return this.appServices.get(UserRoleService.getType()) as UserRoleService;
  }
  get sheinCartService():SheinCartService{
    return this.appServices.get(SheinCartService.getType()) as SheinCartService;
  }
  get sheinCartPaymentService():SheinCartPaymentService{
    return this.appServices.get(SheinCartPaymentService.getType()) as SheinCartPaymentService;
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
    var token = await new TokenController().signin(user);
    console.log("token:");
    console.log(token);
    
    // await this.tokenService.create(user);
    var role = new Role(0,[Permission.PaymentStatusChange,Permission.SheinCartApprove]);
    role = await this.roleService.CreateRole(role);
    await this.userRoleService.AddUserRole(user,role);
  }
  protected setApplicationServices(): void {
    this.appServices.set(UserService.getType(), new UserService(new UserInMemoryDb(), this.publisher));
    this.appServices.set(TokenService.getType(),new TokenService(new TokenInMemoryDb()));
    this.appServices.set(PaymentService.getType(),new PaymentService(new InMemoryPaymentDatabase(),this.publisher));
    this.appServices.set(SheinCartService.getType(),new SheinCartService(new InMemorySheinCartDatabase(),this.publisher));
    this.appServices.set(SheinCartPaymentService.getType(),new SheinCartPaymentService(new InMemorySheinCartPaymentDatabase()));
    this.appServices.set(RoleService.getType(),new RoleService(new InMemoryRoleDatabase()));
    this.appServices.set(UserRoleService.getType(),new UserRoleService(new InMemoryUserRoleDatabase()));
  }
  public setRoutes(): void {
    var baseApi = '/api/v1';
    // this._express.use(env.API_ROUTE+'user', userRouter);
    this._express.use(baseApi+'/cart', sheinCartRouter);
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
