import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Thumbnail} from 'react-bootstrap/lib';

class ItemThumbnail extends Component {
    render() {
        let shortDescription = this.props.description.length > 100
                            ? ( this.props.description.substr(0,100) + "..." )
                            : this.props.description;

        return (
            <Col sm={this.props.size.sm} md={this.props.size.md}>
                <Link to={"/item/" + this.props.id}>
                    <Thumbnail src={this.props.image}>
                        <h3>{this.props.title}</h3>
                        <p>{shortDescription}</p>
                    </Thumbnail>
                </Link>
            </Col>
        );
    }
}

export default ItemThumbnail;