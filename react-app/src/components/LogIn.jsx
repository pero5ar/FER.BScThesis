import React, {Component} from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from 'react-bootstrap/lib';
import { withRouter } from 'react-router-dom';
import Auth from '../modules/Auth';

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
        if (!Auth.isUserAuthenticated()) {
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
                    label="User name"
                    placeholder="Enter username"/>
                <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"/>
                <FieldGroup
                    id="formControlsPassword"
                    label="Password"
                    type="password"
                    placeholder="Enter password"/>
                <Button type="submit" onClick={this.logIn}>
                    Submit
                </Button>
            </form>
        );

        return (
            <Col xs={10} xsOffset={1} md={6} mdOffset={3}>
                <h1>Ulogiraj se</h1>
                <br />
                <FormInstance/>
            </Col>
        );
    }
}

export default withRouter(Login);