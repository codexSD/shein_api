export class Token{
    public id:number;
    public userId:number;
    public exp:Date;
    constructor(id:number,userId:number,exp:Date){
        this.id = id;
        this.userId = userId;
        this.exp = exp;
    }
}