import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap/lib';

class ReservationTable extends Component {
    render() {
        this.props.claims.sort((x, y) => Date.parse(x.date) - Date.parse(y.date))
        let tableItems = this.props.claims.map(claim => {
            let date = new Date(Date.parse(claim.date));
            return (
                <tr key={claim.itemId + claim.userId + claim.date}>
                    <td className="col-xs-2">{date.toLocaleDateString("hr-HR")} {date.toLocaleTimeString("hr-HR")}</td>
                    <td className="col-xs-5"><Link to={`/item/${claim.itemId}`}>{claim.itemName}</Link></td>
                    <td className="col-xs-2"><Link to={`/profile/${claim.userId}`}>{claim.userName}</Link></td>
                    <td className="col-xs-3">
                        <div style={{float: "right"}}>
                            {this.props.firstAction &&
                                    <Button bsSize="xsmall" bsStyle={this.props.firstAction.style || "default"}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.firstAction.handle(claim.id);
                                        }}>
                                        {this.props.firstAction.name}
                                    </Button>
                            }
                            {" "}
                            {this.props.secondAction &&
                                    <Button bsSize="xsmall" bsStyle={this.props.secondAction.style || "default"}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.secondAction.handle(claim.id);
                                        }}>
                                        {this.props.secondAction.name}
                                    </Button>
                            }
                        </div>
                    </td>
                </tr>
            );
        });

        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                <tr>
                    <th className="col-xs-2">Vrijeme</th>
                    <th className="col-xs-5">Predmet ponude</th>
                    <th className="col-xs-2">{this.props.userType}</th>
                    <th className="col-xs-3"></th>
                </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </Table>
        );
    }
}

export default ReservationTable;