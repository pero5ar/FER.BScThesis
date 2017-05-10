import React, { Component } from 'react';

class ItemDetails extends Component {
    render() {
        return (
            <div>
                DETALJI od {this.props.match.params.id}
            </div>
        );
    }
}

export default ItemDetails;