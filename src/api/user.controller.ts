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
  private getService(): UserService {
    return service.appServices.get(UserService.getType()) as UserService;
    // return new UserService(new UserInMemoryDb());
  }
}
