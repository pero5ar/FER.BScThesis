import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button
} from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';

function FieldGroup({id, inputId, label, help, ...props}) {
    return (
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl id={inputId} {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class EditProfileForm extends Component {
    constructor(props) {
        super(props);

        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this);
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleImageInputChange = this.handleImageInputChange.bind(this);
        this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
        this.submitChanges = this.submitChanges.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            image: "",
            description: ""
        }
    }

    handleUsernameInputChange(e) {
        this.setState({ username: e.target.value });
    }

    handleEmailInputChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordInputChange(e) {
        this.setState({ password: e.target.value });
    }

    handleImageInputChange(e) {
        this.setState({ image: e.target.value });
    }

    handleDescriptionInputChange(e) {
        this.setState({ description: e.target.value });
    }

    submitChanges() {
        let _this = this;
        let data = {
            name: this.state.username,
            email: this.state.email,
            profilePic: this.state.image,
            description: this.state.description
        }
        fetch(`/api/user/${Auth.getId()}`, {
                method: "POST",
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then( () => window.location.reload() )
            .catch(err => {
                console.log(err);
                // TODO: report error
            });
    }

    render() {
        return (
            <form onSubmit={this.submitChanges}>
                <FieldGroup
                    id="formControlsText"
                    inputId={this.usernameInputId}
                    type="text"
                    label="Korisničko ime"
                    placeholder="Ostavi prazno za pustiti staru vrijednost"
                    value={this.state.username}
                    onChange={this.handleUsernameInputChange}/>
                <FieldGroup
                    id="formControlsEmail"
                    inputId={this.emailInputId}
                    type="email"
                    label="E-mail adresa"
                    placeholder="Ostavi prazno za pustiti staru vrijednost"
                    value={this.state.email}
                    onChange={this.handleEmailInputChange}/>
                { /*
                <FieldGroup
                    id="formControlsPassword"
                    inputId={this.passwordInputId}
                    type="password"
                    label="Šifra"
                    placeholder="Ostavi prazno za pustiti staru vrijednost"
                    value={this.state.password}
                    onChange={this.handlePasswordInputChange}/>
                    */ }
                <FieldGroup
                    id="formControlsURL"
                    type="url"
                    label="Link na sliku"
                    placeholder="Ostavi prazno za pustiti staru vrijednost"
                    value={this.state.image}
                    onChange={this.handleImageInputChange} />
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Opis</ControlLabel>
                    <FormControl 
                        componentClass="textarea"
                        value={this.state.description}
                        placeholder="Ostavi prazno za pustiti staru vrijednost"
                        onChange={this.handleDescriptionInputChange} />
                </FormGroup>
                <Button bsStyle="primary" type="submit">
                    Spremi promjene
                </Button>
                &nbsp;
                <Button bsStyle="danger" onClick={this.props.handleFormCollapse} >
                    Otkaži
                </Button>
                { }
            </form>
        );
    }
}

export default EditProfileForm;