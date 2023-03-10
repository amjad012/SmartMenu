import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ProductDetails from '../details/ProductDetails';
import ProductForm from '../details/ProductForm';
import ProductList from './ProductList';
import React from 'react';


export default observer (function ProductDashboard() {
    const{productStore} = useStore();
    const{selectedProduct, editMode} = productStore;
    useEffect(() => {
     productStore.loadProducts();
    },[productStore]);
    return (
        <Grid>
            <Grid.Column width='10'>
                <ProductList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedProduct && !editMode &&
                    <ProductDetails />}
                     {editMode &&
                    <ProductForm />}
            </Grid.Column>
        </Grid>
    )
})