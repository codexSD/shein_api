import { application, Request, Response } from 'express';
import { Result, validationResult } from 'express-validator';
import { token } from 'morgan';
import { CustomError } from '../exceptions/errors';
import { ResponseBuilder } from '../response/response.builder';
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

export const safeTokenizedRoute =  (func: (req:Request,res:Response)=>Promise<void>) => {

  return async(req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).send(new ResponseBuilder().err('Validation failed', errors.array()));
    try {
      var tokenController = new TokenController();
      await tokenController.verify(req,res);
      await func(req,res);
    } catch (err:any) {
        if(err instanceof CustomError){
          res.status((err as CustomError).code).send(new ResponseBuilder().err(err.toString()));
        }
        else res.status(500).send(new ResponseBuilder().err('Unknown Error'));  
    }


    // var tokenController = new TokenController();
    // tokenController.verify(req,res,func).catch((err: any) => {
    //   // console.log(err);
    //   if(err instanceof CustomError){
    //     res.status((err as CustomError).code).send(new ResponseBuilder().err(err.toString()));
    //   }
    //   else res.status(500).send(new ResponseBuilder().err('Unknown Error'));
    //   // res.status(err.ERROR_CODE ? err.ERROR_CODE : 500).send(new ResponseBuilder().err(err.toString()));
    // });

    // // tokenController.create();
    // func(req, res).catch((err: any) => {
    //   // console.log(err);
    //   if(err instanceof CustomError){
    //     res.status((err as CustomError).code).send(new ResponseBuilder().err(err.toString()));
    //   }
    //   else res.status(500).send(new ResponseBuilder().err('Unknown Error'));
    //   // res.status(err.ERROR_CODE ? err.ERROR_CODE : 500).send(new ResponseBuilder().err(err.toString()));
    // });
  };
};