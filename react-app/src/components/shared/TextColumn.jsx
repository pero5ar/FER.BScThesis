import React, { Component } from 'react';
import {Col} from 'react-bootstrap/lib';

class TextColumn extends Component {
    render() {
        return (
            <Col sm={this.props.size.sm} md={this.props.size.md}>
                <h2>{this.props.text.title}</h2>
                <h3>{this.props.text.subtitle}</h3>
                <br />
                <p>{this.props.text.body}</p>
            </Col>
        );
    }
}

export default TextColumn;