//react compomenet include route

import { createBrowserRouter, RouteObject } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductDashboard from "../../features/product/dashboard/ProductDashboard";
import ProductDetails from "../../features/product/details/ProductDetails";
import TableDashboard from "../../features/tables/dashboard/TableDashboard";
import TableDetails from "../../features/tables/details/TableDetails";
import TableForm from "../../features/tables/details/TableForm";
import App from "../layout/App";
import React from "react";

export const routes : RouteObject[] = [
    {
        path: '/',
        element:<App/>,
        children: [ 
            {path:'tables', element:<TableDashboard/>},
            {path:'createTable', element:<TableForm/>},           
            {path:'manage/:id', element:<TableForm key='manage'/>},           
            {path:'tables/:id', element:<TableDetails key='create'/>},


            {path:'products/:id', element:<ProductDetails/>},
            {path:'products', element:<ProductDashboard/>},
            {path:'createProduct', element:<TableForm/>},
        ]
    }
]

export const router = createBrowserRouter(routes)