import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

interface Props {
    openFormProduct:() => void;
}

export default function NavBar({openFormProduct}: Props){
    const {tableStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    SmartMenu
                </Menu.Item>
                <Menu.Item name='Tables'/>
                <Menu.Item>
                    <Button onClick={() => tableStore.openForm()} positive content='Create Table'/>
                    <Button onClick={openFormProduct} content='Add product' style={{marginLeft:'5px'}}/>
                </Menu.Item>
            </Container>
        </Menu>
     )
}