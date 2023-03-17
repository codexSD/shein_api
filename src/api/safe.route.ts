import { Request, Response } from 'express';
import { Result, validationResult } from 'express-validator';
import { ResponseBuilder } from '../response/response.builder';

export const safeRoute = (func: any) => {
  return (req: Request, res: Response, next: () => void) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).send(new ResponseBuilder().err('Validation failed', errors.array()));

    func(req, res, next).catch((err: any) => {
      res.status(err.ERROR_CODE ? err.ERROR_CODE : 500).send(new ResponseBuilder().err(err.toString()));
    });
  };
};
