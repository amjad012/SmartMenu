import { createContext, useContext } from "react"
import ProductStore from "./productStore";
import TableStore from "./tableStore"

interface Store {
    tableStore : TableStore;
    productStore : ProductStore
}
export const store : Store = {
    tableStore: new TableStore,
    productStore: new ProductStore
}
export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}