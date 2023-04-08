export enum Permission{
    SheinCartApprove,
    PaymentStatusChange,
}
export class Role{
    public id:number;
    public permissions:Permission[];
    constructor(id:number,permissions:Permission[]){
        this.id = id;
        this.permissions = permissions;
    }
    public hasPermission(permission:Permission):boolean{
        return this.permissions.findIndex((perm)=>perm == permission) != -1;
    }
}