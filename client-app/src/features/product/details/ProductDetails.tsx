import React from 'react';
import { Button, Card, CardContent } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Product } from '../../../app/models/product';
import { useStore } from '../../../app/stores/store';


export default function ProductDetails(){
    const{productStore} = useStore();
    const{selectedProduct:product,openForm,cancelSelectedProduct} = productStore;
    if(!product) return <LoadingComponent/>
    return (
        <Card fluid>
            <Card.Content>
              <Card.Header>{product.name}</Card.Header>
              <Card.Meta><span>{product.category}</span></Card.Meta>
              <Card.Description>{product.description}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Button.Group width='2'>
                    <Button onClick={() => openForm(product.id)}basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedProduct} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}