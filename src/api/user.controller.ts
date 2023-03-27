import { Request, Response } from 'express';
import { UserService } from '../application/user.service';
import { UserInMemoryDb } from '../db/user/in_memory_db';
import { User } from '../models/user';
import { ResponseBuilder } from '../response/response.builder';
import service from '../service';
export class UserController {
  public create = async (req: Request, res: Response) => {
    const user: User = await User.of(req);
    const result: User = await this.getService().create(user);
    res.status(200).send(new ResponseBuilder(user).setMessage('User created'));
  };
  public updateName = async (req:Request,res:Response) => {
    const name:String = req.body.name;
    const result: boolean = await this.getService().updateName(name);
    res.status(200).send(new ResponseBuilder(result).setMessage('Name updated'));
  }
  public login = async(req:Request,res:Response) => {
    const key:number = req.body.key;
    const phone:number = req.body.phone;
    const password:string = req.body.password;
    var result = await this.getService().login(key,phone,password);
    res.status(200).send(new ResponseBuilder(result).setMessage('Login Succeded'));
  }
  public test = async (req:Request,res:Response) => {
    res.status(200).send('ok');
  }
  private getService(): UserService {
    return service.appServices.get(UserService.getType()) as UserService;
    // return new UserService(new UserInMemoryDb());
  }
}
