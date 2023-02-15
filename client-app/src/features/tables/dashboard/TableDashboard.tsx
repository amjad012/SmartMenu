import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import TableDetails from '../details/TableDetails';
import TableFrom from '../details/TableForm';
import TableList from './TableList';

export default observer (function TableDashboard(){
    const{tableStore} = useStore();
    const{selectedTable,editMode} = tableStore;
    return(
        <Grid>
            <Grid.Column width='10'>
            <TableList/>
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