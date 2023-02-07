import React from 'react'
import { Item, ItemContent, Segment } from 'semantic-ui-react'
import { Product } from '../../../app/models/product'

interface Props {
    products : Product[];
}
export default function ProductList({products}: Props)
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
                                
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}