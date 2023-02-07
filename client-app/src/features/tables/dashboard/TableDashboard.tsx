import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import { Table } from '../../../app/models/table';
import TableList from './TableList';

interface Props {
    tables: Table[];
    products: Product[];
}
export default function TableDashboard({tables,products}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <TableList tables={tables}/>
        {/* <List>
            {products.map(product =>(
            <li key={product.id}><br></br>
            {product.name}<br></br>
            {product.category}<br></br>
            {product.description}
            </li>
            ))}
        </List> */}
            </Grid.Column>
        </Grid>
    )
}