import React, { Component } from 'react';
import { Row, Collapse, Button, Nav, NavItem } from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';
import LoadingStatus from '../shared/LoadingStatus';
import ItemList from '../item/ItemList';
import NewOfferForm from './NewOfferForm';

function handleDeleteItem(id) {
    fetch(`/api/item/${id}`, {
            method: "DELETE",
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
};

function handleReturnItem(id) {
    fetch(`/api/itemReturn/${id}`, {
            method: "POST",
            credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
}

const DeleteButton = ({id, holder}) => (
        <Button bsSize="xsmall" bsStyle={"danger"}
            onClick={e => {
                e.preventDefault();
                handleDeleteItem(id);
            }}>
            Obriši
        </Button>
    );

const ReturnButton = ({id, holder}) => !(holder && holder !== Auth.getId()) ? null : (
        <Button bsSize="xsmall" bsStyle={"warning"}
            onClick={e => {
                e.preventDefault();
                handleReturnItem(id);
            }}>
            Vraćeno
        </Button>
    );

const OWNED_SELECT_KEY = 10;
const HELD_SELECT_KEY = 11;

class OfferContainer extends Component {
    constructor(props) {
        super(props)

        this.handleFormCollapse = this.handleFormCollapse.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            openForm: false,
            isLoadingOwned: false,
            isLoadingHeld: false,
            isError: false,
            ownedItems: [],
            heldItems: [],
            selectedKey: 0
        }
    }

    handleFormCollapse() {
        this.setState({ openForm: !this.state.openForm });
    }

    handleSelect(key) {
        this.setState({ selectedKey: key });
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoadingOwned: true,
            isLoadingHeld: true
        });
        let _this = this;
        fetch(`/api/userOwnerItems/${Auth.getId()}`)
            .then(response => response.json())
            .then(items => {
                _this.setState( {
                    ownedItems: items,
                    isLoadingOwned: false
                });
            })
            .catch(err => {
                _this.setState( {
                    ownedItems: [],
                    isLoadingOwned: false,
                    isError: true
                });
            });
        fetch(`/api/userHolderItems/${Auth.getId()}`)
            .then(response => response.json())
            .then(items => {
                _this.setState( {
                    heldItems: items,
                    isLoadingHeld: false
                });
            })
            .catch(err => {
                _this.setState( {
                    heldItems: [],
                    isLoadingHeld: false,
                    isError: true
                });
            });
    }

    render() {
        if (this.state.isLoadingOwned || this.state.isLoadingHeld || this.state.isError) {
            return (
                <div>
                    <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoadingOwned || this.state.isLoadingHeld} />
                </div>
            );
        }

        const OpenFormButton = () => this.state.openForm ? null : (
                <Button onClick={this.handleFormCollapse}>
                    Stvori novu ponudu
                </Button>
            );

        const SelectedItemList = () => {
            let description = this.state.selectedKey === OWNED_SELECT_KEY ? "Sav vlastiti ponuđen sadržaj" : "Sav sadržaj posuđen od drugih korisnika";
            let items = this.state.selectedKey === OWNED_SELECT_KEY ? this.state.ownedItems : this.state.heldItems;
            let buttons = this.state.selectedKey === OWNED_SELECT_KEY ? [ReturnButton, DeleteButton] : [];
            return <ItemList title={description} items={items} buttons={buttons} />;
        };

        return (
            <div>
                <Row>
                    <Nav bsStyle="tabs" justified onSelect={this.handleSelect}>
                        <NavItem eventKey={OWNED_SELECT_KEY}>Ponuđeno</NavItem>
                        <NavItem eventKey={HELD_SELECT_KEY}>Posuđeno</NavItem>
                    </Nav>
                    <SelectedItemList />
                </Row>
                <Row>
                    <Collapse in={this.state.openForm}>
                    <div>
                        <NewOfferForm handleFormCollapse={this.handleFormCollapse} />
                    </div>
                    </Collapse>
                    <OpenFormButton />
                </Row>
            </div>
        );
    }
}

export default OfferContainer;