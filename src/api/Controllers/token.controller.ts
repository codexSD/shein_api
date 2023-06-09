import jwt from 'jsonwebtoken';
import { TokenService } from '../../application/token.service';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import service from '../../service';
import { Request,Response } from 'express';
import { AuthorizationError } from '../../exceptions/errors';
import { UserController } from './user.controller';
import { ResponseBuilder } from '../../response/response.builder';

export class TokenController{

    public async signin(user:User):Promise<string> {
        var tk:Token = await service.tokenService.create(user);
        var str = jwt.sign({id:tk.id},process.env.JWT_SECRET as string);
        return str;
    }
    public async verify(tk:string):Promise<User>{
        var obj:jwt.JwtPayload;
        try {
            obj = jwt.verify(tk,process.env.JWT_SECRET as string) as jwt.JwtPayload;
            if(!obj.id) throw new AuthorizationError();
            var token = await this.getTokenService().get(obj.id);
            if(token == null || token.exp < new Date())
            throw new AuthorizationError();
            var user = await service.userService.get(token.userId);
            return user;
        } catch (error) {
            //Mayby not an AuthorizationError but for security
            throw new AuthorizationError();
        }
    }
    private getTokenService():TokenService{
        return service.appServices.get(TokenService.getType()) as TokenService;
    }
}