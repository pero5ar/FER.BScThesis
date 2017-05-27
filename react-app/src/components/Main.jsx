import React, { Component } from 'react';
import ItemThumbnailContainer from './item/ItemThumbnailContainer';

class Main extends Component {
    render() {
        return (
            <div>
                { this.props.location.state }
                <ItemThumbnailContainer />
            </div>
        );
    }
}

export default Main;