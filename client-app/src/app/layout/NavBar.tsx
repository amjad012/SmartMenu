import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import React from 'react';


export default function NavBar(){
    const{productStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    SmartMenu
                </Menu.Item>
                <Menu.Item as={NavLink} to='/tables' name='Tables'/>
                <Menu.Item as={NavLink} to='/products' name='Menu'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createTable' positive content='Create Table'/>
                    <Button as={NavLink} to='/createProduct' content='Create Product' style={{marginLeft:'5px'}}/>
                </Menu.Item>
            </Container>
        </Menu>
     )
}