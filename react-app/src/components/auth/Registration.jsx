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

function FieldGroup({id, inputId, label, help, ...props}) {
    return (
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl id={inputId} {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class Registration extends Component {
    constructor(props) {
        super(props);

        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.register = this.register.bind(this);

        this.usernameInputId = "usernameInput";
        this.emailInputId = "emailInput";
        this.passwordInputId = "passwordInput";

        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    handleUsernameInputChange(e) {
        this.setState({ username: e.target.value }, () => document.getElementById(this.usernameInputId).focus() );
    }

    handleEmailInputChange(e) {
        this.setState({ email: e.target.value }, () => document.getElementById(this.emailInputId).focus() );
    }

    handlePasswordInputChange(e) {
        this.setState({ password: e.target.value }, () => document.getElementById(this.passwordInputId).focus() );
    }

    register() {
        if (!Auth.isUserAuthenticated()) {
            let _this = this;
            let data = {
                name: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json())
                .then(res => {
                    Auth.authenticateUser(res.token, res.user._id);
                })
                .then( () => _this.props.history.push("/profile") )
                .catch(err => console.log(err));
        }
        this.props.history.push("/profile");
    }

    render() {
        const FormInstance = () => (
            <form>
                <FieldGroup
                    id="formControlsText"
                    inputId={this.usernameInputId}
                    type="text"
                    label="Korisničko ime"
                    placeholder="Unesi korisničko ime"
                    value={this.state.username}
                    onChange={this.handleUsernameInputChange}/>
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