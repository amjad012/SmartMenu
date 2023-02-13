import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import ProductDetails from '../details/ProductDetails';
import ProductForm from '../details/ProductForm';
import ProductList from './ProductList';

interface Props {
    products: Product[];
    selectedProduct: Product | undefined;
    selectProduct: (id: string) => void;
    cancelSelectProduct: () => void;
    editMode: boolean;
    openFormProduct: (id: string) => void;
    closeFormProduct: () => void;
    createOrEdit: (product: Product) => void;
    deleteProduct:(id:string) => void;
    submitting: boolean;
}
export default function ProductDashboard({ products, selectedProduct,
    selectProduct, cancelSelectProduct, editMode, openFormProduct,
     closeFormProduct, createOrEdit,deleteProduct,submitting }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ProductList products={products} 
                    selectProduct={selectProduct}
                    deleteProduct={deleteProduct}
                    submitting={submitting} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedProduct && !editMode &&
                    <ProductDetails product={selectedProduct}
                        cancelSelectProduct={cancelSelectProduct}
                        openFormProduct={openFormProduct}
                    />}
                {editMode &&
                    <ProductForm closeFormProduct={closeFormProduct} product={selectedProduct} createOrEdit={createOrEdit} submitting={submitting}/>}
            </Grid.Column>
        </Grid>
    )
}