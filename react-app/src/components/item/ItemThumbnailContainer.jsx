import React, { Component } from 'react';
import { Row, Clearfix } from 'react-bootstrap/lib';
import no_image_avalible from '../../images/no_image_available.png';
import ItemThumbnail from './ItemThumbnail';

class ItemThumbnailContainer extends Component {
    render() {
        const size = {
            sm: 6,
            md: 3
        }
        
        let itemThumbnails = this.props.items.map((item, index) => (
            <ItemThumbnail
                size={size}
                key={item._id}
                index={index}
                id={item._id}
                image={item.image || no_image_avalible}
                title={item.name}
                description={item.description}
                />
        ));

        let resultRender = []
        for (let i = 0; i < itemThumbnails.length; i++) {
            resultRender.push(itemThumbnails[i]);
            if ((i+1) % 4 === 0) {
                resultRender.push(<Clearfix key={i*100} visible-xs-block></Clearfix>);
            }
        }

        return (
            <Row>
                { resultRender }
            </Row>
        );
    }
}

export default ItemThumbnailContainer;