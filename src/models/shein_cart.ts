import { Utils } from "../common/Utils";

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
    
  public toJSON(): any {
    return {
        id:Utils.Encode(this.id),
        user_id : this.user_id,
        data:this.data,
        status : this.status
    };
  }
}
export enum SheinCartStatus{
    PendingPayment=0,
    PendingOrder=1,
    Completed=2,
    Removed=3
 }