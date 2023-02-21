import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import React from 'react';



export default observer (function TableList() {
    const{tableStore} = useStore();
    const [target,setTarget] = useState('');
    const{deleteTable,tablesByDate,loading} = tableStore;

    function handleTableDelete(e : SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteTable(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {tablesByDate.map(table => (
                    <Item key={table.id}>
                        <Item.Content>
                            <Item.Header as='a'>Table Number: {table.number}</Item.Header>
                            <Item.Meta>{table.date}</Item.Meta>
                            <Item.Description>
                                Description here
                            </Item.Description>
                            <Item.Extra>
                                <Button as={Link} to={`/tables/${table.id}`} floated='right' content='View' color='blue'/>
                                <Button loading={loading && target === table.id}
                                        name={table.id} floated='right' content='Delete' color='red'
                                        onClick={(e) => handleTableDelete(e, table.id)}
                                />
                                
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})