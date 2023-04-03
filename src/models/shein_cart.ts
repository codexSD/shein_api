
export class SheinCart{
    id:number;
    user_id:number;
    data:string;
    status:SheinCartStatus;
    constructor(id:number,
        user_id:number,
        data:string,
        status:SheinCartStatus)
    {
        this.id = id;
        this.user_id = user_id;
        this.data = data;
        this.status = status;
    }
}
export enum SheinCartStatus{
    Pending,
    Completed,
    Removed
 }