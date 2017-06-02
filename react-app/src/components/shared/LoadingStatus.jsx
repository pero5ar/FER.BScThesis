import React, { Component } from 'react';
import Loading from 'react-loading';
import {Row, Col, Glyphicon} from 'react-bootstrap/lib';

class LoadingStatus extends Component {
    render() {
        return (
            <Row>
                <Col xs={6} xsOffset={3} md={2} mdOffset={5}>
                    { this.props.isError && <div className="centerSVG">Error <Glyphicon glyph="exclamation-sign" /></div> }
                    { this.props.isLoading && <div className="centerSVG"><Loading type='spinningBubbles' color='#000000' style={{ display: "inline" }}/></div> }
                </Col>
            </Row>
        );
    }
}

export default LoadingStatus;