import React, { Component } from 'react';
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

function FieldGroup({id, inputId, label, help, ...props}) {
    return (
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl id={inputId} {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.logIn = this.logIn.bind(this);

        this.emailInputId = "emailInput";
        this.passwordInputId = "passwordInput";

        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmailInputChange(e) {
        this.setState({ email: e.target.value }, () => document.getElementById(this.emailInputId).focus() );
    }

    handlePasswordInputChange(e) {
        this.setState({ password: e.target.value }, () => document.getElementById(this.passwordInputId).focus() );
    }

    logIn(e) {
        e.preventDefault();
        if (!Auth.isUserAuthenticated()) {
            let _this = this;
            let data = {
                email: this.state.email,
                password: this.state.password
            }
            fetch("/api/login", {
                    method: "POST",
                    body: JSON.stringify(data),
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => response.json())
                .then(res => {
                    Auth.authenticateUser(res.token, res.user._id);
                })
                .then( () => _this.props.history.push("/profile") )
                .catch(err => {
                    console.log(err);
                    // TODO: report error
                });
        }
    }

    render() {
        const FormInstance = () => (
            <form onSubmit={this.logIn}>
                <FieldGroup
                    id="formControlsEmail"
                    inputId={this.emailInputId}
                    type="email"
                    label="E-mail adresa"
                    placeholder="Unesi e-mail adresu"
                    value={this.state.email}
                    onChange={this.handleEmailInputChange}/>
                <FieldGroup
                    id="formControlsPassword"
                    inputId={this.passwordInputId}
                    type="password"
                    label="Šifra"
                    placeholder="Unesi šifru"
                    value={this.state.password}
                    onChange={this.handlePasswordInputChange}/>
                <Button type="submit">
                    Prijava
                </Button>
                { }
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