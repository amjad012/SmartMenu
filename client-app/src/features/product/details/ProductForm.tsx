import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";

interface Props {
  product: Product | undefined;
  closeFormProduct: () => void;
  createOrEdit:(product:Product) => void;
  submitting:boolean;
}
export default function ProductForm({ product:selectedProduct, closeFormProduct,createOrEdit,submitting }: Props) {
  const initialState = selectedProduct ?? {//if product is null
    id:'',
    name:'',
    category:'',
    kcal:0,
    photo:'',
    price:0,
    description:''
  } 
  const [product, setProduct] = useState(initialState);

  function handleSubmit(){
    createOrEdit(product)
  }
  //for change the value of input when click Submit button
  function handleInputChange(event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const{name,value} = event.target;
    setProduct({...product,[name]: value})
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder="Name" value={product.name}name='name' onChange={handleInputChange} />
        <Form.Input placeholder="Kcal" value={product.kcal}name='kcal' onChange={handleInputChange} />
        <Form.Input placeholder="Photo" value={product.photo}name='photo' onChange={handleInputChange} />
        <Form.Input placeholder="Price" value={product.price}name='price' onChange={handleInputChange} />
        <Form.Input placeholder="Description" value={product.description}name='description' onChange={handleInputChange} />
        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
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
