import { UUID } from "../../common/UUID";
import { Product } from "../../models/product";
import { Store } from "../../models/store";
import { ProductDatabase } from "./ProductDatabase";

export class InMemoryProductDatabase implements ProductDatabase{
    exist(uuid: UUID): Promise<boolean> {
        for (const product of this.products) {
            if(product.getId().getValue() == uuid.getValue())
                return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    products:Product[] = [];
    getByStore(store: Store): Promise<Product[]> {
        var resuls:Product[] = [];
        for (const product of this.products) {
            if(product.storeId.getValue() == store.getId().getValue())
                resuls.push(product);
        }
        return Promise.resolve(resuls);
    }
    get(uuid: UUID): Promise<Product | null> {
        for (const product of this.products) {
            if(product.getId().getValue() == uuid.getValue())
                return Promise.resolve(product);
        }
        return Promise.resolve(null);
    }
    getAll(): Promise<Product[]> {
        return Promise.resolve(this.products);
    }
    add(product: Product): Promise<Product> {
        product.id = UUID.create();
        this.products.push(product);
        return Promise.resolve(product);
    }
    edit(product: Product): Promise<boolean> {
        for (let index = 0; index < this.products.length; index++) {
            const p = this.products[index];
            if(p.getId().getValue() == product.getId().getValue()){
                this.products[index] = product;
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
    remove(product: Product): Promise<boolean> {
        for (let index = 0; index < this.products.length; index++) {
            const p = this.products[index];
            if(p.getId().getValue() == product.getId().getValue()){
                this.products.slice(index,1);
                return Promise.resolve(true);
            }
        }
        return Promise.resolve(false);
    }
    removeByStore(store: Store): Promise<boolean> {
        for (let index = 0; index < this.products.length; index++) {
            const p = this.products[index];
            if(p.storeId.getValue() == store.getId().getValue()){
                this.products.slice(index,1);
            }
        }
        return Promise.resolve(true);

    }

}