import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Thumbnail} from 'react-bootstrap/lib';

class ItemThumbnail extends Component {
    render() {
        return (
            <Col sm={this.props.size.sm} md={this.props.size.md}>
                <Link to={"/item/" + this.props.id}>
                    <Thumbnail src={this.props.image}>
                        <h3>{this.props.title}</h3>
                        <p>{this.props.description}</p>
                    </Thumbnail>
                </Link>
            </Col>
        );
    }
}

export default ItemThumbnail;