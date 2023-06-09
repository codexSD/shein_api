import { Request, Response } from 'express';
import { UserService } from '../../application/user.service';
import { UserInMemoryDb } from '../../db/user/in_memory_db';
import { User } from '../../models/user';
import { ResponseBuilder } from '../../response/response.builder';
import service from '../../service';
import jwt from "jsonwebtoken";
import { PasswordNotValid, UserNotFound } from '../../exceptions/errors';
export class UserController {

  public get = async (req: Request, res: Response) => {
    var id:number = req.body.id;
    var result = await this.getService().get(id);
    res.status(200).send(new ResponseBuilder(result.asArray()));
  };
  public create = async (req: Request, res: Response) => {
    var user: User = await User.of(req);
    user = await this.getService().create(user);
    res.status(200).send(new ResponseBuilder(user).setMessage('User created'));
  };
  public updateName = async(req:Request,res:Response) => {
    const name:string = req.body.name;
    var uid:number = req.body.uid;
    var user = await service.userService.get(uid);
    user.name = name;
    const result: boolean = await this.getService().updateName(user);
    res.status(200).send(new ResponseBuilder(result).setMessage('Name updated'));
  }
  public login = async(req:Request,res:Response) => {
    const key:number = req.body.key;
    const phone:number = req.body.phone;
    const password:string = req.body.password;
    var user = await this.getService().login(key,phone,password);
    var token = await service.tokenService.create(user);
    var tkString = jwt.sign({id: token.id},process.env.JWT_SECRET as string );
    res.status(200).send(new ResponseBuilder(tkString).setMessage('Login Succeded'));
  }
  private getService(): UserService {
    return service.appServices.get(UserService.getType()) as UserService;
    // return new UserService(new UserInMemoryDb());
  }
}
