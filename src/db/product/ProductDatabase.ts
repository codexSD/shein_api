import { UUID } from "../../common/UUID"
import { Product } from "../../models/product"
import { Store } from "../../models/store"

export interface ProductDatabase{
    exist(uuid:UUID):Promise<boolean>
    get(uuid:UUID):Promise<Product|null>
    getAll():Promise<Product[]>
    getByStore(store:Store):Promise<Product[]>
    add(product:Product):Promise<Product>
    edit(product:Product):Promise<boolean>
    remove(product:Product):Promise<boolean>
    removeByStore(store: Store): Promise<boolean>
}