import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {
    Nav,
    Navbar,
    NavItem,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap/lib/';


class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputKey = this.handleInputKey.bind(this);
        this.search = this.search.bind(this);

        this.state = {
            searchInput: ""
        };
    }

    handleInputChange(e) {
        this.setState({ searchInput: e.target.value });
    }

    handleInputKey(e) {
        if (e.key === "Enter") this.search();
    }

    search(e) {
        let input = this.state.searchInput;
        this.setState({ searchInput: "" });
        this.props.history.push("/", input);
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/home">Prometej</NavLink>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={e => this.props.history.push("/offer")} >Vlastite ponude</NavItem>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Pretraži ponude" value={this.state.searchInput} onChange={this.handleInputChange} onKeyPress={this.handleInputKey} />
                        </FormGroup>
                        {' '}
                        <Button type="submit" onClick={this.search} >Traži</Button>
                    </Navbar.Form>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={e => this.props.history.push("/notifications")}  >Obavijesti</NavItem>
                    <NavItem eventKey={2} onClick={e => this.props.history.push("/profile")} >Profil</NavItem>
                    <NavItem eventKey={3} href="#">Odjava</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Navigation);