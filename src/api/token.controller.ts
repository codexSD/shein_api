import jwt from 'jsonwebtoken';
import { TokenService } from '../application/token.service';
import { Token } from '../models/token';
import { User } from '../models/user';
import service from '../service';
import { Request,Response } from 'express';
import { AuthorizationError } from '../exceptions/errors';
import { UserController } from './user.controller';
import { ResponseBuilder } from '../response/response.builder';

export class TokenController{

    public async signin(user:User):Promise<string> {
        var tk:Token = await service.tokenService.create(user);
        var str = jwt.sign({id:tk.id},process.env.JWT_SECRET as string);
        return str;
    }
    public async verify(req:Request,res:Response):Promise<void>{
        if(!req.body.tk) throw new AuthorizationError();
        var obj = jwt.verify(req.body.tk,process.env.JWT_SECRET as string) as jwt.JwtPayload;
        if(!obj.id) throw new AuthorizationError();
        var token = await this.getTokenService().get(obj.id);
        if(token == null || token.exp < new Date())
        throw new AuthorizationError();
        var user = await service.userService.get(token.userId);
        if(user == null) throw new AuthorizationError();
        req.body.user = user;
        // try {
        //     if(!req.body.tk) throw new AuthorizationError();
        //     var obj = jwt.verify(req.body.tk,process.env.JWT_SECRET as string) as jwt.JwtPayload;
        //     if(!obj.id) throw new AuthorizationError();
        //     var token = await this.getTokenService().get(obj.id);
        //     if(token == null || token.exp < new Date())
        //     throw new AuthorizationError();
        //     var user = service.userService.get(token.userId);
        //     if(user == null) throw new AuthorizationError();
        //     req.body.user = user;
        // } catch (error) {
        //     res.status(200).send(new ResponseBuilder().setMessage('Authorization Error'));
        // }
    }
    private getTokenService():TokenService{
        return service.appServices.get(TokenService.getType()) as TokenService;
    }
}