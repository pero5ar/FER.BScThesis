import React, { Component } from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap/lib';

class ItemList extends Component {
    render() {
        let listItems = this.props.items.map((item, index) => (
            <ListGroupItem key={item._id} index={index} id={item.id} title={item.name} href={`/item/${tem.id}`}>
                {item.description}
            </ListGroupItem>
        ));

        return (
            <Panel header={this.props.title} bsStyle={this.props.style}>
                <ListGroup>
                    {listItems}
                </ListGroup>
            </Panel>
        );
    }
}

export default ItemList;