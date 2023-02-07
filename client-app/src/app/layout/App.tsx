import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Table } from '../models/table';
import { Product } from '../models/product';
import NavBar from './NavBar';
import TableDashboard from '../../features/tables/dashboard/TableDashboard';


function App() {
  const [tables, setTables] = useState<Table[]>([]);
  const[products, setProducts] = useState<Product[]>([]);

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
  // using typescript here also help us to detectd the problems and have many option's when we write table.
  return (
    <>     
    <NavBar />
    <Container style={{marginTop: '7em'}}>
      <TableDashboard tables={tables} products={products}/>
    </Container>
     
    </>
  );
}

export default App;
