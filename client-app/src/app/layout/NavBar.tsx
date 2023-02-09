import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm:() => void;
    openFormProduct:() => void;
}

export default function NavBar({openForm,openFormProduct}: Props){
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    SmartMenu
                </Menu.Item>
                <Menu.Item name='Tables'/>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Table'/>
                    <Button onClick={openFormProduct} content='Add product' style={{marginLeft:'5px'}}/>
                </Menu.Item>
            </Container>
        </Menu>
     )
}