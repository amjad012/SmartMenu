import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Table } from "../../../app/models/table";

interface Props {
  table: Table | undefined;
  closeForm: () => void;
  createOrEdit: (table: Table) => void;
  submitting:boolean;
}
export default function TableFrom({ table: selectedTable, closeForm, createOrEdit,submitting }: Props) {
  const initialState = selectedTable ?? {//if table is null
    id: '',
    number: 0,
    date: ''
  }
  const [table, setTable] = useState(initialState);

  function handleSubmit() {
    createOrEdit(table);
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
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
