import { UUID } from "../../common/UUID"
import { Store } from "../../models/store"

export interface StoreDatabase{
    get(uuid:UUID):Promise<Store|null>
    getAll():Promise<Store[]>
    create(store:Store):Promise<Store>
    update(store:Store):Promise<boolean>
    delete(store:Store):Promise<boolean>
}