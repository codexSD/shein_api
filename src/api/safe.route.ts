import { application, Request, Response } from 'express';
import { Result, validationResult } from 'express-validator';
import { token } from 'morgan';
import { AuthorizationError, CustomError } from '../exceptions/errors';
import { Permission } from '../models/permissions';
import { User } from '../models/user';
import { ResponseBuilder } from '../response/response.builder';
import service from '../service';
import { TokenController } from './token.controller';

export const safeRoute = (func: any) => {
  return (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).send(new ResponseBuilder().err('Validation failed', errors.array()));

    func(req, res).catch((err: any) => {
      // console.log(err);
      if(err instanceof CustomError){
        res.status((err as CustomError).code).send(new ResponseBuilder().err(err.toString()));
      }
      else {
        console.error(err);        
        res.status(500).send(new ResponseBuilder().err('Unknown Error'));
      }
      // res.status(err.ERROR_CODE ? err.ERROR_CODE : 500).send(new ResponseBuilder().err(err.toString()));
    });
  };
};

export const safeTokenizedRoute =  (
  func: (req:Request,res:Response)=>Promise<void>,
  permissions:Permission[] = []
  ) => {
  return async(req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).send(new ResponseBuilder().err('Validation failed', errors.array()));
    try {
      if(!req.body.tk) throw new AuthorizationError();
      var tokenController = new TokenController();
      var user:User = await tokenController.verify(req.body.tk);
      req.body.user = user;
      var userRoles = await service.userRoleService.getUserRoles(user);
      for(var permission of permissions){
        var founded = false;
        for(var role of userRoles){
          if(role.hasPermission(permission)){
            founded = true;
            break;
          }
        }
        if(!founded) throw new AuthorizationError();
      }
      await func(req,res);
    } catch (err:any) {
      console.error(err);
        if(err instanceof CustomError){
          res.status((err as CustomError).code).send(new ResponseBuilder().err(err.toString()));
        }
        else res.status(500).send(new ResponseBuilder().err('Unknown Error'));
    }
  };
};