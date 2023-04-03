import { Request, Response } from 'express';
import { UserService } from '../application/user.service';
import { UserInMemoryDb } from '../db/user/in_memory_db';
import { User } from '../models/user';
import { ResponseBuilder } from '../response/response.builder';
import service from '../service';
import jwt from "jsonwebtoken";
import { PasswordNotValid } from '../exceptions/errors';
export class UserController {
  getUser(userId: number) {
      throw new Error('Method not implemented.');
  }
  public create = async (req: Request, res: Response) => {
    const user: User = await User.of(req);
    const result: User = await this.getService().create(user);
    res.status(200).send(new ResponseBuilder(user).setMessage('User created'));
  };
  public updateName = async(req:Request,res:Response) => {
    const name:String = req.body.name;
    var user:User = req.body.user;
    const result: boolean = await this.getService().updateName(user.id,name);
    res.status(200).send(new ResponseBuilder(result).setMessage('Name updated'));
  }
  public login = async(req:Request,res:Response) => {
    const key:number = req.body.key;
    const phone:number = req.body.phone;
    const password:string = req.body.password;
    var user = await service.userService.login(key,phone,password);
    var token = await service.tokenService.create(user);
    var tkString = jwt.sign({id: token.id},process.env.JWT_SECRET as string );
    res.status(200).send(new ResponseBuilder(tkString).setMessage('Login Succeded'));
  }
  public test = async (req:Request,res:Response) => {
    res.status(200).send('ok');
  }
  private getService(): UserService {
    return service.appServices.get(UserService.getType()) as UserService;
    // return new UserService(new UserInMemoryDb());
  }
}
