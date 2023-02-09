import React from 'react';
import { Button, Card, CardContent } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';

interface Props {
    product: Product;
    cancelSelectProduct:() => void;
    openFormProduct:(id:string) => void;

}
export default function ProductDetails({product,cancelSelectProduct,openFormProduct}:Props){
    return (
        <Card fluid>
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Meta><span>{product.category}</span></Card.Meta>
              <Card.Description>{product.description}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Button.Group width='2'>
                    <Button onClick={() => openFormProduct(product.id)}basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectProduct} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}