import React from 'react'
import { Button, Item, ItemContent, Segment } from 'semantic-ui-react'
import { Product } from '../../../app/models/product'

interface Props {
    products : Product[];
    selectProduct:(id:string) => void;
}
export default function ProductList({products,selectProduct}: Props)
{
    return (
        <Segment>
            <Item.Group divided>
                {products.map(product => (
                    <Item key={product.id}>
                        <Item.Content>
                            <Item.Header as='a'>{product.name}</Item.Header>
                            <Item.Meta>{product.kcal}</Item.Meta>
                            <Item.Description>{product.description}</Item.Description>

                            <Item.Extra>
                            <Button floated='right' content='View' color='blue'
                                         onClick={() => selectProduct(product.id)}
                                        />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}