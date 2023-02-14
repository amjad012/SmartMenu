import { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Table } from "../../../app/models/table";
import { useStore } from "../../../app/stores/store";

interface Props {
    tables: Table[];
    deleteTable: (id: string) => void;
    submitting: boolean;

}

export default function TableList({ tables, deleteTable,submitting }: Props) {
    const [target,setTarget] = useState('');

    function handleTableDelete(e : SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteTable(id);
    }
    const{tableStore} = useStore();
    return (
        <Segment>
            <Item.Group divided>
                {tables.map(table => (
                    <Item key={table.id}>
                        <Item.Content>
                            <Item.Header as='a'>Table Number: {table.number}</Item.Header>
                            <Item.Meta>{table.date}</Item.Meta>
                            <Item.Description>
                                Description here
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'
                                    onClick={() => tableStore.selectTable(table.id)}
                                />
                                <Button name={table.id} floated='right' content='Delete' color='red'
                                    loading={submitting && target === table.id} onClick={(e) => handleTableDelete(e, table.id)}
                                />
                                
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}