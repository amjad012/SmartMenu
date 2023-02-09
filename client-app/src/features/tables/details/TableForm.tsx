import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Table } from "../../../app/models/table";

interface Props {
  table: Table | undefined;
  closeForm: () => void;
}
export default function TableFrom({ table, closeForm }: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Number" />
        <Form.Input placeholder="Number" />
        <Form.Input placeholder="Number" />
        <Button floated="right" positive type="submit" content="Submit" />
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
