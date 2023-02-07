import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import { Table } from '../../../app/models/table';
import TableDetails from '../details/TableDetails';
import TableFrom from '../details/TableForm';
import TableList from './TableList';

interface Props {
    tables: Table[];
   
}
export default function TableDashboard({tables}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <TableList tables={tables}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {tables[0] &&
                    <TableDetails table={tables[0]}/>}
                    <TableFrom />
            </Grid.Column>
        </Grid>
    )
}