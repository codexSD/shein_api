import { UUID } from "../common/UUID";
export interface IProduct{
    id: UUID | undefined;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}
export class ProductModel implements IProduct{
    id: UUID | undefined;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    constructor(name:string,description:string,imageUrl:string,price:number,storeId:UUID,categoryId:UUID) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}
export class Product{
    id: UUID | undefined;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    storeId: UUID;
    categoryId: UUID;

    constructor(name:string,description:string,imageUrl:string,price:number,storeId:UUID,categoryId:UUID) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.storeId = storeId;
        this.categoryId = categoryId;
    }

    public getId():UUID {return this.id!;}
}