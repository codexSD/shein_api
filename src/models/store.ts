import { UUID } from "../common/UUID";
export interface IStore{
    id:UUID | undefined;
    name:string;
    description:string;
    imageUrl:string;
}
export class Store {
    id:UUID | undefined;
    name:string;
    description:string;
    imageUrl:string;

    constructor(name:string,description:string,imageUrl:string) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    public getId():UUID {return this.id!;}

    public toJSON():any{
        return{
            id:this.id?.getValue(),
            name:this.name,
            description:this.description,
            imageUrl:this.imageUrl,
        }
    }
}