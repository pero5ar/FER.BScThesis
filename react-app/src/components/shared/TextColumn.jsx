import React, { Component } from 'react';
import {Col} from 'react-bootstrap/lib';

class TextColumn extends Component {
    render() {
        let bodyText = this.props.text.body.replace("\n", "<br />");

        return (
            <Col sm={this.props.size.sm} md={this.props.size.md}>
                <h2>{this.props.text.title}</h2>
                <h3>{this.props.text.subtitle}</h3>
                <br />
                <p>{this.props.text.body.split("\n").map(line =>
                        <span>
                            {line}
                            <br />
                        </span>
                    )}</p>
            </Col>
        );
    }
}

export default TextColumn;