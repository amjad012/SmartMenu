import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import ProductDetails from '../details/ProductDetails';
import ProductForm from '../details/ProductForm';
import ProductList from './ProductList';

interface Props {
    products: Product[];
    selectedProduct: Product | undefined;
    selectProduct:(id:string) => void;
    cancelSelectProduct:() => void;
    editMode:boolean;
    openFormProduct:(id:string) => void;
    closeFormProduct:() => void;
}
export default function ProductDashboard({products,selectedProduct,
    selectProduct,cancelSelectProduct,editMode,openFormProduct,closeFormProduct}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ProductList products={products} selectProduct={selectProduct}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedProduct && !editMode &&
                    <ProductDetails product={selectedProduct}
                    cancelSelectProduct={cancelSelectProduct}
                    openFormProduct={openFormProduct} 
                    />}
                    {editMode &&
                    <ProductForm closeFormProduct={closeFormProduct} product={selectedProduct}/>}
            </Grid.Column>
        </Grid>
    )  
}