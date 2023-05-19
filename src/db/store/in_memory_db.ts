import { UUID } from "../../common/UUID";
import { Store } from "../../models/store";
import { StoreDatabase } from "./StoreDatabase";

export class InMemoryStoreDatabase implements StoreDatabase{
    
    private stores:Store[] = [];
    read(uuid: UUID): Promise<Store|null> {
        for (const store of this.stores) {
            if(store.id?.getValue() == uuid.getValue())
                return Promise.resolve(store);
        }
        return Promise.resolve(null);
    }
    readAll(): Promise<Store[]> {
        return Promise.resolve(this.stores);
    }
    create(store: Store): Promise<Store> {
        if(!store.id) store.id = UUID.create();
        this.stores.push(store);
        return Promise.resolve(store);
    }
    update(store: Store): Promise<boolean> {
        for (let index = 0; index < this.stores.length; index++) {
            const s = this.stores[index];
            if(s.id!.getValue() == store.id!.getValue()){
                this.stores[index] = store;
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
    delete(store: Store): Promise<boolean> {
        for (let index = 0; index < this.stores.length; index++) {
            const s = this.stores[index];
            if(s.id!.getValue() == store.id!.getValue()){
                this.stores.slice(index,1);
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }

}