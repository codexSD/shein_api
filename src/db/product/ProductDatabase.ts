import { UUID } from "../../common/UUID"
import { ICategory } from "../../models/category"
import { IProduct } from "../../models/product"
import { IStore } from "../../models/store"

export interface ProductDatabase{
    get(uuid:UUID):Promise<IProduct|null>
    getAll():Promise<IProduct[]>
    getByStore(store:IStore):Promise<IProduct[]>
    add(product:IProduct,store:IStore,category:ICategory):Promise<IProduct>
    edit(product:IProduct):Promise<boolean>
    remove(product:IProduct):Promise<boolean>
    removeByStore(store: IStore): Promise<boolean>
}