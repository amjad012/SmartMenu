import { useEffect, useState } from "react";
import { Product } from "../models/product";
import NavBar from "./NavBar";
import TableDashboard from "../../features/tables/dashboard/TableDashboard";
import ProductDashboard from "../../features/product/dashboard/ProductDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";

function App() {

  const{tableStore} = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    tableStore.loadTables();
  }, [tableStore]);


  //for product
  useEffect(() => {
    agent.Products.list().then(respone => {
      let products: Product[] = [];
      respone.forEach(product => {
        products.push(product);
      })
      setProducts(products);
      setLoading(false);
    })          
  }, []);

  function handleSelectProduct(id: string) {
    setSelectedProduct(products.find((x) => x.id === id));
  }
  function handleCancelSelectProduct() {
    setSelectedProduct(undefined);
  }
  function handleFormOpenProduct(id?: string) {
    id ? handleSelectProduct(id) : handleCancelSelectProduct();
    setEditMode(true);
  }
  function handleFormCloseProduct() {
    setEditMode(false);
  }
   function handleCreateOrEditProduct(product: Product) {
    setSubmitting(true);
    if (product.id) {
      agent.Products.update(product).then(() => {
        setProducts([...products.filter(x => x.id !== product.id), product]);
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      product.id = uuid();
      agent.Products.create(product).then(() => {
        setProducts([...products, product]);
        setSelectedProduct(product);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }
    function handleDeleteProduct(id: string) {
      setSubmitting(true);
      agent.Products.delete(id).then(() => {
        setProducts([...products.filter(x => x.id !== id)]);
        setSubmitting(false);
      })
      
    }
  
    
  

  if (tableStore.loadingInitial) return <LoadingComponent content="Loading app" />;

  // using typescript here also help us to detectd the problems and have many option's when we write table.
  return (
    <>
      <NavBar openFormProduct={handleFormOpenProduct}/>
      <Container style={{ marginTop: "7em" }}>
        <TableDashboard />
        <ProductDashboard
          products={products}
          selectedProduct={selectedProduct}
          selectProduct={handleSelectProduct}
          cancelSelectProduct={handleCancelSelectProduct}
          editMode={editMode}
          openFormProduct={handleFormOpenProduct}
          closeFormProduct={handleFormCloseProduct}
          createOrEdit={handleCreateOrEditProduct}
          submitting={submitting} 
          deleteProduct={handleDeleteProduct}        />
      </Container>
    </>
  );
}

export default observer(App);
