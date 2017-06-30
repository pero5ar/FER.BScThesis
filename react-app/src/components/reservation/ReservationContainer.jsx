import React, { Component } from 'react';
import { Row, Nav, NavItem } from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';
import LoadingStatus from '../shared/LoadingStatus';
import ReservationTable from './ReservationTable';

function handleDeleteClaim(id) {
    fetch(`/api/cancelRequest/${id}`, {
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
}

function handleAcceptClaim(id) {
    fetch(`/api/acceptRequest/${id}`, {
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

const OWNED_SELECT_KEY = 10;
const CLAIMED_SELECT_KEY = 11;

class ReservationContainer extends Component {
    constructor(params) {
        super(params);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            isLoadingOwned: false,
            isLoadingClaimed: false,
            isError: false,
            ownedItemClaims: [],
            userClaims: [],
            selectedKey: 0
        }
    }

    handleSelect(key) {
        this.setState({ selectedKey: key });
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoadingOwned: false,
            isLoadingClaimed: true
        });
        let _this = this;
        fetch(`/api/userClaimsOwnerDetails/${Auth.getId()}`)
            .then(response => response.status === 204 ? [] : response.json())
            .then(claims => {
                if (claims.lenght === 0) {
                    _this.setState({
                        ownedItemClaims: [],
                        isLoadingOwned: false
                    });
                    return;
                }
                let formatedClaims = claims.map(c => ({
                    id: c.claim._id,
                    date: c.claim.date,
                    itemName: c.itemName,
                    itemId: c.claim.itemId,
                    userName: c.userName,
                    userId: c.claim.userHolderId
                }));
                _this.setState( {
                    ownedItemClaims: formatedClaims,
                    isLoadingOwned: false
                });
            })
            .catch(err => {
                _this.setState( {
                    ownedItemClaims: [],
                    isLoadingOwned: false,
                    isError: true
                });
            });
        fetch(`/api/getUserClaimsDetails/${Auth.getId()}`)
            .then(response => response.status === 204 ? [] : response.json())
            .then(claims => {
                if (claims.lenght === 0) {
                    _this.setState({
                        userClaims: [],
                        isLoadingClaimed: false
                    });
                    return;
                }
                let formatedClaims = claims.map(c => ({
                    id: c.claim._id,
                    date: c.claim.date,
                    itemName: c.itemName,
                    itemId: c.claim.itemId,
                    userName: c.userName,
                    userId: c.claim.userOwnerId
                }));
                _this.setState( {
                    userClaims: formatedClaims,
                    isLoadingClaimed: false
                });
            })
            .catch(err => {
                _this.setState( {
                    userClaims: [],
                    isLoadingClaimed: false,
                    isError: true
                });
            });
    }


    render() {
        if (this.state.isLoadingOwned || this.state.isLoadingClaimed || this.state.isError) {
            return (
                <div>
                    <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoadingOwned || this.state.isLoadingClaimed} />
                </div>
            );
        }

        const acceptAction = {
            style: "success",
            name: "Prihvati",
            handle: handleAcceptClaim
        };

        const deleteAction = {
            style: "danger",
            name: "Obriši",
            handle: handleDeleteClaim
        };

        return (
            <div>
                <Row>
                    <Nav bsStyle="tabs" justified onSelect={this.handleSelect}>
                        <NavItem eventKey={OWNED_SELECT_KEY}>Zahtjevi na vlastite ponude</NavItem>
                        <NavItem eventKey={CLAIMED_SELECT_KEY}>Poslani zahtjevi</NavItem>
                    </Nav>
                    <ReservationTable
                        userType={this.state.selectedKey === OWNED_SELECT_KEY ? "Poslao" : "Vlasnik"}
                        claims={this.state.selectedKey === OWNED_SELECT_KEY ? this.state.ownedItemClaims : this.state.userClaims}
                        firstAction={this.state.selectedKey === OWNED_SELECT_KEY ? acceptAction : null}
                        secondAction={deleteAction}
                    />
                </Row>
            </div>
        );
    }
}

export default ReservationContainer;