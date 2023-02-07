import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function TableFrom(){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Number'/>
                <Form.Input placeholder='Number'/>
                <Form.Input placeholder='Number'/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}