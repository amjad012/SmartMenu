import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Table } from '../../../app/models/table';

interface Props{
    table: Table;
    cancelSelectTable:() => void;
    openForm:(id:string) => void;
}
export default function TableDetails({table,cancelSelectTable,openForm}:Props){
    return(
        <Card fluid>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>{table.number}</Card.Header>
      <Card.Meta>
        <span>{table.date} </span>
      </Card.Meta>
      <Card.Description>
        Description heres
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group width='2'>
          <Button onClick={() => openForm(table.id)}basic color='blue' content='Edit'/>  
          <Button onClick={cancelSelectTable} basic color='grey' content='Cancel'/>  
      </Button.Group>
    </Card.Content>
  </Card>
    )
}