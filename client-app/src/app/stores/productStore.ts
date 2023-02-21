
import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuid } from 'uuid';
import agent from "../api/agent";
import { Product } from "../models/product";


export default class ProductStore {
    productRegistry = new Map<string, Product>();
    selectedProduct: Product | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }
    get productsByDate() {
        return Array.from(this.productRegistry.values());
    }

    loadProducts = async () => {
        try {
            const products = await agent.Products.list();

            products.forEach(product => {
                this.productRegistry.set(product.id, product);
            })
            this.setLoadingInitial(false);
        } catch (erorr) {
            console.log(erorr);

            this.loadingInitial = false;
            this.setLoadingInitial(false);
        }
    }
    //load single product
    private setProduct = (product : Product) => {
        this.productRegistry.set(product.id, product);

    }
//    loadProduct = async(id : string) => {
//         let product = this.getProduct(id);
//         if(product) {this.selectedProduct = product;
//             this.selectedProduct = product; 
//             return product;   
//         }
//     else {
//         this.setLoadingInitial(true);
//         try {
//             product = await agent.Products.details(id);
//             thirn product;
//         } catch s.setProduct(product);
//             runInAction(() => this.selectedProduct = product);
//             this.setLoadingInitial(false);
//             retu(error) {
//             console.log(error);
//         }
//     }
//    }
    private getProduct = (id : string) => {
        return this.productRegistry.get(id);
    }
    
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createProduct = async (product: Product) => {
        this.loading = true;
        product.id = uuid();
        try {
            await agent.Products.create(product);
            runInAction(() => {
                this.productRegistry.set(product.id, product)
                this.selectedProduct = product;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateProduct = async (product: Product) => {
        this.loading = true;

        try {
            await agent.Products.update(product);
            runInAction(() => {
                this.productRegistry.set(product.id, product)
                this.selectedProduct = product;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteProduct = async (id: string) => {
        this.loading = true;
        try {
            await agent.Products.delete(id);
            runInAction(() => {
                this.productRegistry.delete(id)
                this.loading = false;

            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}

