import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Table } from "../models/table";
import { Product } from "../models/product";
import NavBar from "./NavBar";
import TableDashboard from "../../features/tables/dashboard/TableDashboard";
import ProductDashboard from "../../features/product/dashboard/ProductDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";

function App() {

  const{tableStore} = useStore();
  const [tables, setTables] = useState<Table[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [selectedTable, setSelectedTable] = useState<Table | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Tables.list().then(response => {
      let tables: Table[] = [];
      response.forEach(table => {
        table.date = table.date.split('T')[0];
        tables.push(table);
      })
      setTables(tables);
      setLoading(false);
    })
  }, []);
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

  //for Table
  function handleSelectTable(id: string) {
    setSelectedTable(tables.find((x) => x.id === id));
  }
  function handleCancelSelectTable() {
    setSelectedTable(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectTable(id) : handleCancelSelectTable(); // if the id not null handleSelectTable else... handleCancel..
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEditTable(table: Table) {
    setSubmitting(true);
    if (table.id) {
      agent.Tables.update(table).then(() => {
        setTables([...tables.filter(x => x.id !== table.id), table]);
        setSelectedTable(table);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      table.id = uuid();
      agent.Tables.create(table).then(() => {
        setTables([...tables, table]);
        setSelectedTable(table);
        setEditMode(false);
        setSubmitting(false);
      });
    }
    
  }
  function handleDeleteTable(id: string) {
    setSubmitting(true);
    agent.Tables.delete(id).then(() => {
      setTables([...tables.filter((x) => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  //for product
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
  
    
  

  if (loading) return <LoadingComponent content="Loading app" />;

  // using typescript here also help us to detectd the problems and have many option's when we write table.
  return (
    <>
      <NavBar
        openForm={handleFormOpen}
        openFormProduct={handleFormOpenProduct}
      />
      <Container style={{ marginTop: "7em" }}>
      <h2>{tableStore.title}</h2>

        <TableDashboard
          tables={tables}
          selectedTable={selectedTable}
          selectTable={handleSelectTable}
          cancelSelectTable={handleCancelSelectTable}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditTable}
          deleteTable={handleDeleteTable}
          submitting={submitting}
        />
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

export default App;
