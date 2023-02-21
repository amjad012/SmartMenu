import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer (function TableDetails(){
  const{tableStore} = useStore();
  const{selectedTable: table,loadTable,loadingInitial} = tableStore;
  const {id} = useParams();

  useEffect(() => {
    if(id) loadTable(id);
  },[id, loadTable])
  
  if(loadingInitial ||!table) return <LoadingComponent/>;
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
          <Button as={Link} to={`/manage/${table.id}`} basic color='blue' content='Edit'/>  
          <Button as={Link} to={'/tables'} basic color='grey' content='Cancel'/>  
      </Button.Group>
    </Card.Content>
  </Card>
    )
})