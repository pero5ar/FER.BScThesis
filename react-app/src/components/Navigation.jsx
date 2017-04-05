import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {
    Nav,
    Navbar,
    NavItem,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap/lib/';


class Navigation extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/">Prometej</NavLink>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem href="/offer">Vlastite ponude</NavItem>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Pretraži ponude"/>
                        </FormGroup>
                        {' '}
                        <Button type="submit">Traži</Button>
                    </Navbar.Form>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/notifications">Obavijesti</NavItem>
                    <NavItem eventKey={2} href="/profile">Profil</NavItem>
                    <NavItem eventKey={3} href="#">Odjava</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Navigation;