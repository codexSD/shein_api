import { UUID } from "../../common/UUID"
import { Store } from "../../models/store"

export interface StoreDatabase{
    read(uuid:UUID):Promise<Store|null>
    readAll():Promise<Store[]>
    create(store:Store):Promise<Store>
    update(store:Store):Promise<boolean>
    delete(store:Store):Promise<boolean>
}