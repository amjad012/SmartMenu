import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemContent, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";

interface Props {
  products: Product[];
  selectProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  submitting: boolean;
}
export default function ProductList({
  products,
  selectProduct,
  deleteProduct,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");
  function handleProductDelete(e : SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name);
    deleteProduct(id);
}
  return (
    <Segment>
      <Item.Group divided>
        {products.map((product) => (
          <Item key={product.id}>
            <Item.Content>
              <Item.Header as="a">{product.name}</Item.Header>
              <Item.Meta>{product.kcal}</Item.Meta>
              <Item.Description>{product.description}</Item.Description>

              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectProduct(product.id)}
                />
                <Button
                  name={product.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={submitting && target === product.id}
                  onClick={(e) => handleProductDelete(e, product.id)}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
