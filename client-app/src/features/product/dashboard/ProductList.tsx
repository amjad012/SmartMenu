import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, ItemContent, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { useStore } from "../../../app/stores/store";

export default observer(function ProductList() {
  const { productStore } = useStore();
  const [target, setTarget] = useState("");
  const { deleteProduct, productsByDate, loading } = productStore;

  function handleProductDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteProduct(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {productsByDate.map((product) => (
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
                  onClick={() => productStore.selectProduct(product.id)}
                />
                <Button
                  loading={loading && target === product.id}
                  name={product.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(e) => handleProductDelete(e, product.id)}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
