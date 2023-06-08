import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
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
import { TokenController } from './api/Controllers/token.controller';
import roleRouter from './api/routes/role.router';
import userRoleRouter from './api/routes/userRole.router';
import { ProductService } from './application/product.service';
import { InMemoryProductDatabase } from './db/product/in_memory_database';
import { StoreService } from './application/store.service';
import { InMemoryStoreDatabase } from './db/store/in_memory_db';
import productRouter from './api/routes/product.router';
import storeRouter from './api/routes/store.router';
import { Store } from './models/store';
import { UUID } from './common/UUID';
import { Product } from './models/product';

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
  get productService():ProductService{
    return this.appServices.get(ProductService.getType()) as ProductService;
  }
  get storeService():StoreService{
    return this.appServices.get(StoreService.getType()) as StoreService;
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
    var role = new Role(0,'test',[]);
    role.isRoot = true;
    // var role = new Role(0,'test',[Permission.PaymentStatusChange,Permission.SheinCartApprove]);
    role = await this.roleService.CreateRole(role);
    await this.userRoleService.AddUserRole(user,role);

    //add store
    var store = new Store('Mac Store','Electronic store','');
    store.id = UUID.of('a9962668-c653-4ede-ab48-21e650f64689');
    await this.storeService.create(store);

    var product = new Product('Mouse','laser mouse','',10.0,store.getId());
    product.id = UUID.of('c878c332-4684-4ac8-a3c0-e437289bcdfa');
    await this.productService.create(product);
    //
    //add product 
  }
  protected setApplicationServices(): void {
    this.addService(UserService.getType(),new UserService(new UserInMemoryDb(), this.publisher));
    this.addService(TokenService.getType(),new TokenService(new TokenInMemoryDb()));
    this.addService(PaymentService.getType(),new PaymentService(new InMemoryPaymentDatabase(),this.publisher));
    this.addService(SheinCartService.getType(),new SheinCartService(new InMemorySheinCartDatabase(),this.publisher));
    this.addService(SheinCartPaymentService.getType(),new SheinCartPaymentService(new InMemorySheinCartPaymentDatabase()));
    this.addService(RoleService.getType(),new RoleService(new InMemoryRoleDatabase()));
    this.addService(UserRoleService.getType(),new UserRoleService(new InMemoryUserRoleDatabase()));
    this.addService(ProductService.getType(),new ProductService(new InMemoryProductDatabase()));
    this.addService(StoreService.getType(),new StoreService(new InMemoryStoreDatabase()));
  }
  private addService(type:string,service:ApplicationService){
    if(this.appServices.has(type))
      throw new Error('Service Name Conflict :)');
    this.appServices.set(type,service);
  }
  public setRoutes(): void {
    var baseApi = '/api/v1';
    // this._express.use(env.API_ROUTE+'user', userRouter);
    this._express.use(baseApi+'/user', userRouter);
    this._express.use(baseApi+'/cart', sheinCartRouter);
    this._express.use(baseApi+'/role', roleRouter);
    this._express.use(baseApi+'/userRole', userRoleRouter);
    this._express.use(baseApi+'/product', productRouter);
    this._express.use(baseApi+'/store', storeRouter);
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
