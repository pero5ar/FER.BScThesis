import React, { Component } from 'react';
import {Col, Image, Label} from 'react-bootstrap/lib';

class ImageColumn extends Component {
    render() {
        return (
            <Col sm={this.props.size.sm} md={this.props.size.md}>
                <Image src={this.props.image} responsive/> 
                <h4><Label bsStyle={this.props.status}>{this.props.info}</Label></h4>
            </Col>
        );
    }
}

export default ImageColumn;