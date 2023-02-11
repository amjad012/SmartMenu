import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Table } from '../models/table';
import { Product } from '../models/product';
import NavBar from './NavBar';
import TableDashboard from '../../features/tables/dashboard/TableDashboard';
import ProductDashboard from '../../features/product/dashboard/ProductDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  const [tables, setTables] = useState<Table[]>([]);
  const[products, setProducts] = useState<Product[]>([]);

  const [selectedTable, setSelectedTable] = useState<Table | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const[editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Tables.list()
      .then(response => {
        setTables(response)
      })
  }, [])
  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data)
      })
  }, [])

  //for Table
  function handleSelectTable(id: string) {
    setSelectedTable(tables.find(x => x.id === id))
  }
  function handleCancelSelectTable(){
    setSelectedTable(undefined)
  }
  function handleFormOpen(id? : string){
    id ? handleSelectTable(id) : handleCancelSelectTable(); // if the id not null handleSelectTable else... handleCancel..
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleCreateOrEditTable(table : Table)
  {
    table.id 
    ? setTables([...tables.filter(x => x.id !== table.id),table])
    : setTables([...tables, {...table, id:uuid()}])
    setEditMode(false);
    setSelectedTable(table)
  }
  function handleDeleteTable(id: string)
  {
    setTables([...tables.filter(x => x.id !== id)])
  }

  //for product
  function handleSelectProduct(id:string) {
    setSelectedProduct(products.find(x=> x.id === id))
  }
  function handleCancelSelectProduct(){
    setSelectedProduct(undefined)
  }
  function handleFormOpenProduct(id? : string){
    id ? handleSelectProduct(id) : handleCancelSelectProduct(); 
    setEditMode(true);
  }
  function handleFormCloseProduct(){
    setEditMode(false);
  }
  function handleCreateOrEditProduct(product : Product)
  {
    product.id
    ? setProducts([...products.filter(x => x.id !== product.id),product])
    :setProducts([...products,product])
    setEditMode(false);
    setSelectedProduct(product)
  }
  

  
  
  

  // using typescript here also help us to detectd the problems and have many option's when we write table.
  return (
    <>     
    <NavBar openForm={handleFormOpen} openFormProduct={handleFormOpenProduct}/>
    <Container style={{marginTop: '7em'}}>
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
      />
    </Container>
     
    </>
  );
}

export default App;
