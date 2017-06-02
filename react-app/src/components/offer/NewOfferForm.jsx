import React, { Component } from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button
} from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';
import { ITEM_TYPES } from '../../modules/Constants';

function FieldGroup({id, inputId, label, help, ...props}) {
    return (
        <FormGroup>
            <ControlLabel>{label}</ControlLabel>
            <FormControl id={inputId} {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class NewOfferForm extends Component {
    constructor(props) {
        super(props);

        this.handleNameInputChange = this.handleNameInputChange.bind(this);
        this.handleImageInputChange = this.handleImageInputChange.bind(this);
        this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
        this.handleTypeInputChange = this.handleTypeInputChange.bind(this);

        let userId = Auth.getId();
        this.state = {
            name: "",
            image: "",
            description: "",
            type: "",
            userOwnerId: userId,
            userHolderId: userId
        };
    }

    handleNameInputChange(e) {
        this.setState({ name: e.target.value });
    }

    handleImageInputChange(e) {
        this.setState({ image: e.target.value });
    }

    handleDescriptionInputChange(e) {
        this.setState({ description: e.target.value });
    }

    handleTypeInputChange(e) {
        this.setState({ type: e.target.value });
    }

    render() {
        let selectOptions = ITEM_TYPES.map(str => (
            <option value={str}>{str}</option>
        ));

        return (
            <form>
                <FieldGroup
                    id="formControlsName"
                    type="text"
                    label="Naziv"
                    placeholder="Upiši naziv ponude"
                    value={this.state.name}
                    onChange={this.handleNameInputChange} />
                <FieldGroup
                    id="formControlsURL"
                    type="url"
                    label="Link na sliku"
                    placeholder="http://..."
                    value={this.state.image}
                    onChange={this.handleImageInputChange} />
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Vrsta</ControlLabel>
                    <FormControl 
                        componentClass="select" 
                        placeholder="Odaberi vrstu ponude"
                        value={this.state.type}
                        onChange={this.handleTypeInputChange} >
                            { selectOptions }
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Opis</ControlLabel>
                    <FormControl 
                        componentClass="textarea" 
                        placeholder="Opiši ponudu"
                        value={this.state.description}
                        onChange={this.handleDescriptionInputChange} />
                </FormGroup>
                <Button type="submit">
                    Stvori ponudu
                </Button>
                { }
            </form>
        );
    }
}

export default NewOfferForm;