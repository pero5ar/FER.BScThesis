import React, {Component} from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from 'react-bootstrap/lib';
import { withRouter, Link } from 'react-router-dom';
import Auth from '../../modules/Auth';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.logIn = this.logIn.bind(this);
    }

    logIn() {
        if (!Auth.isUserAuthenticated()) {      // TODO: fetch
            Auth.authenticateUser("nekitoken");
        }
        this.props.history.push("/home");
    }

    render() {
        const FormInstance = () => (
            <form>
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
                <Button type="submit" onClick={this.logIn}>
                    Prijava
                </Button>
            </form>
        );

        return (
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                <h1>Ulogiraj se</h1>
                <br />
                <FormInstance/>
                <br />
                <Link to="/register">Nemaš račun?</Link>
            </Col>
        );
    }
}

export default withRouter(Login);