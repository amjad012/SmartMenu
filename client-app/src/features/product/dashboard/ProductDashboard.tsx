import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import ProductList from './ProductList';

interface Props {
    products: Product[];

}
export default function ProductDashboard({products}: Props){
    return(
        <Grid>
            <Grid.Column>
                <ProductList products={products}/>
            </Grid.Column>
        </Grid>
    )  
}