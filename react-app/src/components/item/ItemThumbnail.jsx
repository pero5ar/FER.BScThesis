import React, { Component } from 'react';
import {Col, Thumbnail} from 'react-bootstrap/lib';

class ItemThumbnail extends Component {
    render() {
        return (
            <Col sm={6} md={3}>
                <Thumbnail src={this.props.image}>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                </Thumbnail>
            </Col>
        );
    }
}

export default ItemThumbnail;