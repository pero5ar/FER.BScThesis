import React, { Component } from 'react';
import { Row, Nav, NavItem } from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';
import LoadingStatus from '../shared/LoadingStatus';
import ReservationTable from './ReservationTable';

class ReservationContainer extends Component {
    constructor(params) {
        super(params);

        this.handleSelect = this.handleSelect.bind(this);

        this.OWNED_SELECT_KEY = 10;
        this.CLAIMED_SELECT_KEY = 11;

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
            .then(response => response.json())
            .then(claims => {
                console.log(claims);
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
            .then(response => response.json())
            .then(claims => {
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

        return (
            <div>
                <Row>
                    <Nav bsStyle="tabs" justified onSelect={this.handleSelect}>
                        <NavItem eventKey={this.OWNED_SELECT_KEY}>Zahtjevi na vlastite ponude</NavItem>
                        <NavItem eventKey={this.CLAIMED_SELECT_KEY}>Poslani zahtjevi</NavItem>
                    </Nav>
                    <ReservationTable
                        userType={this.state.selectedKey === this.OWNED_SELECT_KEY ? "Poslao" : "Vlasnik"}
                        claims={this.state.selectedKey === this.OWNED_SELECT_KEY ? this.state.ownedItemClaims : this.state.userClaims}
                        firstAction={this.state.selectedKey === this.OWNED_SELECT_KEY ? null : null}
                        secondAction={this.state.selectedKey === this.OWNED_SELECT_KEY ? null : null}
                    />
                </Row>
            </div>
        );
    }
}

export default ReservationContainer;