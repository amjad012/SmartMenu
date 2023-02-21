import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

export default observer (function ProductForm() {
  const{productStore} = useStore();
  const{selectedProduct,createProduct,updateProduct,loading,loadingInitial} = productStore;
  const{id} = useParams();
  const navigate = useNavigate();

  const[product, setProduct] = useState<Product>({  //if product is null
    id:'',
    name:'',
    category:'',
    kcal:0,
    photo:'',
    price:0,
    description:''
  });

  function handleSubmit(){
    product.id ? updateProduct(product) : createProduct(product);
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
        <Form.Input placeholder="Photo" value={'test'}name='photo' onChange={handleInputChange} />
        <Form.Input placeholder="Price" value={product.price}name='price' onChange={handleInputChange} />
        <Form.Input placeholder="Description" value={product.description}name='description' onChange={handleInputChange} />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
})
