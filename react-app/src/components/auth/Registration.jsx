import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from 'react-bootstrap/lib';
import { withRouter } from 'react-router-dom';
import Auth from '../../modules/Auth';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class Registration extends Component {
    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
    }

    register() {
        if (!Auth.isUserAuthenticated()) {      // TODO: fetch
            Auth.authenticateUser("nekitoken");
        }
        this.props.history.push("/home");
    }

    render() {
        const FormInstance = () => (
            <form>
                <FieldGroup
                    id="formControlsText"
                    type="text"
                    label="Korisničko ime"
                    placeholder="Unesi korisničko ime"/>
                <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="E-mail adresa"
                    placeholder="Unesi e-mail adresu"/>
                <FieldGroup
                    id="formControlsPassword"
                    type="password"
                    label="Šifra"
                    placeholder="Unesi šifru"/>
                <Button type="submit" onClick={this.register}>
                    Prijava
                </Button>
            </form>
        );

        return (
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                <h1>Napravi račun</h1>
                <br />
                <FormInstance/>
            </Col>
        );
    }
}

export default withRouter(Registration);