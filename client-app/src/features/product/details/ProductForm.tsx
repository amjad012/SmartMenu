import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";

interface Props {
  product: Product | undefined;
  closeFormProduct: () => void;
}
export default function ProductForm({ product, closeFormProduct }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Name" />
        <Form.Input placeholder="Kcal" />
        <Form.Input placeholder="Photo" />
        <Form.Input placeholder="Price" />
        <Form.Input placeholder="Description" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeFormProduct}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
