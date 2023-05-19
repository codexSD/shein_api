import { UUID } from "../common/UUID";

export class Product{
    id: UUID | undefined;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    storeId: UUID;

    constructor(name:string,description:string,imageUrl:string,price:number,storeId:UUID) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.storeId = storeId;
    }

    public getId():UUID {return this.id!;}
}