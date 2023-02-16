import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import productStore from '../stores/productStore';
import { useStore } from '../stores/store';



export default function NavBar(){
    const {tableStore} = useStore();
    const{productStore} = useStore();
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
                    <Button onClick={() => productStore.openForm()} content='Add product' style={{marginLeft:'5px'}}/>
                </Menu.Item>
            </Container>
        </Menu>
     )
}