import React, {Component} from 'react';
import Redirect from 'react-router-dom';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button,
    Col
} from 'react-bootstrap/lib';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class LogIn extends Component {
    constructor(props) {
        super(props);
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
                <Button type="submit" onClick={this.props.handleLogIn}>
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

export default LogIn;