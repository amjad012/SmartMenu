//all the reqeusts that go to our API
import axios, { AxiosResponse } from "axios";
import { Product } from "../models/product";
import { Table } from "../models/table";

const sleep = (delay:number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})



const requests={
    get:<T>(url: string) => axios.get<T>(url).then(responseBody),
    post:<T>(url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put:<T>(url: string, body:{}) => axios.put<T>(url,body).then(responseBody),
    del:<T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Tables ={
    list:() => requests.get<Table[]>(`/tables`),
    details:(id:string) => requests.get<Table>(`/tables/${id}`),
    create:(table:Table) => requests.post<void>(`/tables`, table),
    update:(table:Table) => requests.put<void>(`/tables/${table.id}`,table),
    delete:(id: string) => requests.del<void>(`/tables/${id}`)
}
const Products = {
    list:() => requests.get<Product[]>(`/products`),
    details:(id:string) => requests.get<Table>(`/products/${id}`),
    create:(product:Product) => requests.post<void>(`/products`, product),
    update:(product:Product) => requests.put<void>(`/products/${product.id}`,product),
    delete:(id: string) => requests.del<void>(`/products/${id}`)
}

const agent = {
    Tables,
    Products
}
export default agent;