import React from 'react';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {Table} from "../../../app/models/table";

interface Props {
    tables: Table[];
    // selectTable: (id: string) => void;
    // deleteTable: (id: string) => void;
}

export default function TableList({tables}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {tables.map(table => (
                    <Item key={table.id}>
                        <Item.Content>
                            <Item.Header as='a'>{table.number}</Item.Header>
                            <Item.Meta>{table.date}</Item.Meta>
                            <Item.Description>
                                
                            </Item.Description>
                            <Item.Extra>
                                {/* <Button floated='right' content='View' color='blue'
                                        onClick={() => selectTable(table.id)}/>
                                <Button floated='right' content='Delete' color='red'
                                        onClick={() => deleteTable(table.id)}/> */}
                                {/* <Label basic content={table.category}/> */}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}