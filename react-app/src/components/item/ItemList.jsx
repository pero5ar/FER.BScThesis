import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap/lib';

class ItemList extends Component {
    render() {
        const ItemButtons = ({id, holder}) => {
            let buttons = []
            this.props.buttons.forEach(PropButton => {
                buttons.push(<PropButton id={id} holder={holder} />)
                buttons.push(" ");
            });
            return (
                <div style={{float: "right"}}>
                    {buttons}
                </div>
            );
        };

        let listItems = this.props.items.map((item, index) => {
            return (
                <ListGroupItem key={item._id} index={index} id={item._id} href={`/item/${item._id}`}>
                    {item.name || " "}
                    <ItemButtons id={item._id} holder={item.userHolderId} />
                </ListGroupItem>
            );
        });

        return (
            <Panel header={this.props.title} bsStyle={this.props.style || "default"}>
                <ListGroup>
                    {listItems}
                </ListGroup>
            </Panel>
        );
    }
}

export default ItemList;