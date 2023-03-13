import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiV1 from './api/index';
import { UserService } from './application/user.service';
import { ApplicationService } from './application/application.service';
import { UserInMemoryDb } from './db/user/in_memory_db';

class Service {
  private readonly _express: express.Application;
  private readonly _appServices: Map<string, ApplicationService>;
  get express(): express.Application {
    return this._express;
  }
  get appServices(): Map<string, ApplicationService> {
    return this._appServices;
  }
  constructor() {
    this._express = express();
    this._appServices = new Map<string, ApplicationService>();
    this.setUp();
  }
  public setUp(): void {
    this.setApplicationServices();
    this.setMiddlewares();
    this.setRoutes();
  }
  protected setApplicationServices(): void {
    this.appServices.set(UserService.getType(), new UserService(new UserInMemoryDb()));
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
}

export default new Service();