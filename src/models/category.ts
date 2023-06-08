import { UUID } from "../common/UUID";

export interface ICategory{
    id:UUID|undefined;
    name:string;
    description: string;
    subcategories: ICategory[];
}

export class CategoryModel implements ICategory{
    id: UUID | undefined;
    name: string;
    description: string;
    subcategories: ICategory[];
    constructor(name: string,description: string,subcategories: ICategory[]){
        this.name = name;
        this.description = description;
        this.subcategories = subcategories;
    }
}