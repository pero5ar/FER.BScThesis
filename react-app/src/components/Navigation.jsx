import React, {Component} from 'react';
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
                        <a href="#">Prometej</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem href="#">Vlastite ponude</NavItem>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Pretraži ponude"/>
                        </FormGroup>
                        {' '}
                        <Button type="submit">Traži</Button>
                    </Navbar.Form>
                </Nav>
                <Nav pullRight>
                    <NavItem href="#">Obavijesti</NavItem>
                    <NavItem href="#">Profil</NavItem>
                    <NavItem href="#">Odjava</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Navigation;