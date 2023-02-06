import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';


function App() {
  const [tables, setTables] = useState([]);
  const[products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tables')
      .then(response => {
        setTables(response.data)
      })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data)
      })
  }, [])
  return (
    <div>     
    <Header as='h2' icon='users' content='Resturant'/>
      <List>
        {tables.map((table:any) => (
          <li key={table.id}>
            {table.number}
          </li>
        ))}
      </List>
      <List>
        {products.map((product:any) =>(
          <li key={product.id}><br></br>
            {product.name}<br></br>
            {product.category}
          </li>
        ))}
      </List>
    </div>
  );
}

export default App;
