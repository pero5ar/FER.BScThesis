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
    console.log(id);
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

const ReturnButton = ({id, holder}) => /* !(holder && holder !== Auth.getId()) ? null : */ (
        <Button bsSize="xsmall" bsStyle={"warning"}
            onClick={e => {
                e.preventDefault();
                handleReturnItem(id);
            }}>
            Vraćeno
        </Button>
    );

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
            ownedSelected: true
        }
    }

    handleFormCollapse() {
        this.setState({ openForm: !this.state.openForm });
    }

    handleSelect() {
        this.setState({ ownedSelected: !this.state.ownedSelected });
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
            let description = this.state.ownedSelected ? "Sav vlastiti ponuđen sadržaj" : "Sav posuđen sadržaj";
            let items = this.state.ownedSelected ? this.state.ownedItems : this.state.heldItems;
            let buttons = this.state.ownedSelected ? [ReturnButton, DeleteButton] : [];
            return <ItemList title={description} items={items} buttons={buttons} />;
        };

        return (
            <div>
                <Row>
                    <Nav bsStyle="tabs" justified onSelect={this.handleSelect}>
                        <NavItem eventKey={10}>Ponuđeno</NavItem>
                        <NavItem eventKey={11}>Posuđeno</NavItem>
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