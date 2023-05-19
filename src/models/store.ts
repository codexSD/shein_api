import { UUID } from "../common/UUID";

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
}