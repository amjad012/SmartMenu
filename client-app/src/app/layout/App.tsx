import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Table } from '../models/table';
import { Product } from '../models/product';
import NavBar from './NavBar';
import TableDashboard from '../../features/tables/dashboard/TableDashboard';
import ProductDashboard from '../../features/product/dashboard/ProductDashboard';


function App() {
  const [tables, setTables] = useState<Table[]>([]);
  const[products, setProducts] = useState<Product[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | undefined>(undefined);
  const[editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Table[]>('http://localhost:5000/api/tables')
      .then(response => {
        setTables(response.data)
      })
  }, [])
  useEffect(() => {
    axios.get<Product[]>('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data)
      })
  }, [])

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

  // using typescript here also help us to detectd the problems and have many option's when we write table.
  return (
    <>     
    <NavBar openForm={handleFormOpen} />
    <Container style={{marginTop: '7em'}}>
      <TableDashboard 
        tables={tables}
        selectedTable={selectedTable}
        selectTable={handleSelectTable}
        cancelSelectTable={handleCancelSelectTable}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
      />
      <ProductDashboard products={products}/>
    </Container>
     
    </>
  );
}

export default App;
