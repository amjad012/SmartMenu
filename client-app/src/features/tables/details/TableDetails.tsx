import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Table } from '../../../app/models/table';

interface Props{
    table: Table
}
export default function TableDetails({table}:Props){
    return(
        <Card fluid>
    {/* <Image src='/images/avatar/large/matthew.png' wrapped ui={false} /> */}
    <Card.Content>
      <Card.Header>{table.number}</Card.Header>
      <Card.Meta>
        <span>{table.date} </span>
      </Card.Meta>
      <Card.Description>
        Description here
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group width='2'>
          <Button basic color='blue' content='Edit'/>  
          <Button basic color='grey' content='Cancel'/>  
      </Button.Group>
    </Card.Content>
  </Card>
    )
}