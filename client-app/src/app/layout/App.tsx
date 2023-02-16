import { useEffect, useState } from "react";
import { Product } from "../models/product";
import NavBar from "./NavBar";
import TableDashboard from "../../features/tables/dashboard/TableDashboard";
import ProductDashboard from "../../features/product/dashboard/ProductDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import ProductStore from "../stores/productStore";
import productStore from "../stores/productStore";

function App() {

  const{tableStore} = useStore();
  const{productStore} = useStore();

  useEffect(() => {
    tableStore.loadTables();
  }, [tableStore]);


  //for product
  useEffect(() => {
   productStore.loadProducts();
  },[productStore]);
 

  if (tableStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  // using typescript here also help us to detectd the problems and have many option's when we write table.
  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: "7em" }}>
        <TableDashboard />
        <ProductDashboard/>
      </Container>
    </>
  );
}

export default observer(App);
