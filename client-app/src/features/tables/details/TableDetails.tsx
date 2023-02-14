import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function TableDetails(){
  const{tableStore} = useStore();
  const{selectedTable: table, openForm,cancelSelectedTable} = tableStore;
  
  if(!table) return <LoadingComponent/>;
    return(
        <Card fluid>
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
          <Button onClick={cancelSelectedTable} basic color='grey' content='Cancel'/>  
      </Button.Group>
    </Card.Content>
  </Card>
    )
}