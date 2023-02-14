import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { Table } from '../../../app/models/table';
import { useStore } from '../../../app/stores/store';
import TableDetails from '../details/TableDetails';
import TableFrom from '../details/TableForm';
import TableList from './TableList';

interface Props {
    tables: Table[];
    deleteTable:(id:string) => void;
    submitting: boolean;
}
export default observer (function TableDashboard({tables,deleteTable,submitting }:Props){
    const{tableStore} = useStore();
    const{selectedTable,editMode} = tableStore;
    return(
        <Grid>
            <Grid.Column width='10'>
            <TableList tables={tables}
                
                deleteTable={deleteTable}
                submitting ={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTable && !editMode &&
                    <TableDetails />}
                    {editMode &&
                    <TableFrom/>}
            </Grid.Column>
        </Grid>
    )
})