import { observer } from "mobx-react-lite";
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Table } from "../../../app/models/table";
import { useStore } from "../../../app/stores/store";


export default observer ( function TableFrom() {
  const{tableStore} = useStore();
  const{selectedTable,closeForm,createTable,updateTable,loading} = tableStore;

  const initialState = selectedTable ?? {//if table is null
    id: '',
    number: 0,
    date: ''
  }
  const [table, setTable] = useState(initialState);

  function handleSubmit() {
    table.id ? updateTable(table) : createTable(table);
  }
  //for change the value of input when click Submit button
  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setTable({ ...table, [name]: value })
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off' >
        <Form.Input placeholder="Number" value={table.number} name='number' onChange={handleInputChange} />
        <Form.Input type='date'placeholder="Date" value={table.date} name='date' onChange={handleInputChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
})
