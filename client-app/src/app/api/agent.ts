//all the reqeusts that go to our API
import axios, { AxiosResponse } from "axios";
import { Table } from "../models/table";

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const reqeusts={
    get:<T>(url: string) => axios.get<T>(url).then(responseBody),
    post:<T>(url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put:<T>(url: string, body:{}) => axios.put<T>(url,body).then(responseBody),
    del:<T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Tables ={
    list:() => reqeusts.get<Table[]>('/tables')
}

const agent = {
    Tables
}
export default agent;