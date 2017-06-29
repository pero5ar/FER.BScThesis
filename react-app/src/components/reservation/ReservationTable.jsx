import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap/lib';

class ReservationTable extends Component {
    render() {
        let tableItems = this.props.claims.map(claim => (   // TODO: format claims before sending and order by date
            <tr>
                <td className="col-md-2">{claim.claim.date}</td>
                <td className="col-md-4"><Link to={`/item/${claim.itemId}`}>{claim.itemName}</Link></td>
                <td className="col-md-2"><Link to={`/user/${claim.userId}`}>{claim.userName}</Link></td>
                <td className="col-md-2">{this.props.firstAction &&
                        <Button bsSize="xsmall" bsStyle={this.props.firstAction.style}
                            onClick={e => {
                                e.preventDefault();
                                this.props.firstAction.handle(claim.id);
                            }}>
                            {this.props.firstAction.Name}
                        </Button>
                }</td>
                <td className="col-md-2">{this.props.secondAction &&
                        <Button bsSize="xsmall" bsStyle={this.props.secondAction.style}
                            onClick={e => {
                                e.preventDefault();
                                this.props.secondAction.handle(claim.id);
                            }}>
                            {this.props.secondAction.Name}
                        </Button>
                }</td>
            </tr>
        ));

        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                <tr>
                    <th className="col-md-2">Vrijeme</th>
                    <th className="col-md-4">Predmet ponude</th>
                    <th className="col-md-2">{this.props.userType}</th>
                    <th className="col-md-2"></th>
                    <th className="col-md-2"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {tableItems}
                </tr>
                </tbody>
            </Table>
        );
    }
}

export default ReservationTable;