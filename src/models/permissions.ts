export enum Permission{
    //USER_PERMISSIONS
    CreateUser = 1000,
    UpdateUser = 1001,
    GetUser = 1002,
    
    //SHEIN_PERMISSIONS
    SheinCartApprove = 2000,

    //PAYMENTS_PERMISSIONS
    PaymentStatusChange = 3001,

    //ROLE_PERMISSIONS
    GetRoleDetails = 4000,
    CreateRole = 4001,
    UpdateRole = 4002,
    RemoveRole = 4003,

    //USER_ROLE_PERMISSIONS
    GetUserRole = 5000,
    AddUserRole = 5001,
    RemoveUserRole = 5002,

    //PRODUCT_PERMISSIONS
    ReadProducts = 6000,
    CreateProducts = 6001,
    UpdateProducts = 6002,
    DeleteProducts = 6003,

}
export class Role{
    public id:number;
    name:string;
    public permissions:Permission[];
    isRoot:boolean = true;
    constructor(id:number,name:string,permissions:Permission[]){
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
    
    public hasPermission(permission:Permission):boolean{
        return this.isRoot || this.permissions.findIndex((perm)=>perm == permission) != -1;
    }
}