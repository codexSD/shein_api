import { Token } from "../../models/token";
import { TokenDatabase } from "./interfaces/token_database";

export class TokenInMemoryDb implements TokenDatabase{
    private static tokens:Token[] = [];
    private static counter = 1;
    
    get(id: number): Promise<Token | null> {
        var tk:Token|null = null;
        for(var token of TokenInMemoryDb.tokens){
            if(token.id == id && token.exp > new Date()){
                return Promise.resolve(token);
            }
        }
        return Promise.resolve(null);
    }
    create(userId: number, exp: Date): Promise<Token> {
        var tk:Token = new Token(TokenInMemoryDb.counter++,userId,exp);
        TokenInMemoryDb.tokens.push(tk);
        return Promise.resolve(tk);
    }
    remove(userId: number): Promise<void> {
        var count = 0;
        while(count < TokenInMemoryDb.tokens.length){
            if(TokenInMemoryDb.tokens[count].userId == userId) TokenInMemoryDb.tokens.splice(count,1);
            else count++;
        }
        return Promise.resolve();
    }
    removeAllOldThanMonth(): Promise<void> {
        var count = 0;
        var date = new Date();
        while(count < TokenInMemoryDb.tokens.length){
            if(TokenInMemoryDb.tokens[count].exp < date) TokenInMemoryDb.tokens.splice(count,1);
            else count++;
        }
        return Promise.resolve();
    }

}
