import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Product } from '../../../app/models/product';
import { Table } from '../../../app/models/table';
import TableDetails from '../details/TableDetails';
import TableFrom from '../details/TableForm';
import TableList from './TableList';

interface Props {
    tables: Table[];
    selectedTable: Table | undefined;
    selectTable:(id:string) => void;
    cancelSelectTable:() => void;
    editMode:boolean;
    openForm:(id: string) => void;
    closeForm:() => void;
}
export default function TableDashboard({tables,selectedTable, 
    selectTable,cancelSelectTable,editMode,openForm,closeForm}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <TableList tables={tables} selectTable={selectTable}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTable && !editMode &&
                    <TableDetails table={selectedTable}
                    cancelSelectTable={cancelSelectTable}
                    openForm={openForm}
                    />}
                    {editMode &&
                    <TableFrom closeForm={closeForm} table={selectedTable}/>}
            </Grid.Column>
        </Grid>
    )
}