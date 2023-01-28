import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';


function App() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tables')
      .then(response => {
        setTables(response.data)
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
    </div>
  );
}

export default App;
