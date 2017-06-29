import React, { Component } from 'react';
import { Row, Nav, NavItem } from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';
import LoadingStatus from '../shared/LoadingStatus';
import ReservationTable from './ReservationTable';

class ReservationContainer extends Component {
    constructor(params) {
        super(params);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            isLoadingOwned: false,
            isLoadingUser: false,
            isError: false,
            ownedItemClaims: [],
            userClaims: [],
            ownedSelected: true
        }
    }

    handleSelect() {
        this.setState({ ownedSelected: !this.state.ownedSelected });
    }



    render() {
        if (this.state.isLoadingOwned || this.state.isLoadingHeld || this.state.isError) {
            return (
                <div>
                    <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoadingOwned || this.state.isLoadingHeld} />
                </div>
            );
        }

        return (
            <div>
                <Row>
                    <Nav bsStyle="tabs" justified onSelect={this.handleSelect}>
                        <NavItem eventKey={10}>Zahtjevi na vlastite ponude</NavItem>
                        <NavItem eventKey={11}>Poslani zahtjevi</NavItem>
                    </Nav>
                    <ReservationTable
                        userType={this.state.ownedSelected ? "Poslao" : "Vlasnik"}
                        claims={[]}
                        firstAction={this.state.ownedSelected ? null : null}
                        secondAction={this.state.ownedSelected ? null : null}
                    />
                </Row>
            </div>
        );
    }
}

export default ReservationContainer;