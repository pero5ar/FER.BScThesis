import React, { Component } from 'react';
import {Row} from 'react-bootstrap/lib';
import ImageColumn from '../shared/ImageColumn';
import TextColumn from '../shared/TextColumn';

function fetchName() {return "Ime"}

class ItemDetailsContainer extends Component {
    constructor(props) {
        super(props)

        this.id = this.props.match.params.id;
        this.state = {
            isError: false,
            isLoading: false,
            name: "",
            image: "",
            description: "",
            type: "",
            userOwnerId: "",
            userOwnerName: "",
            userHolderId: "",
            statusText: "",
            statusColor: "",
        }
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoading: true
        });
        this.setState({
            name: "Item " + this.id,
            image: "https://techpur.com/wp-content/plugins/facebook-share-like-popup-viralplus/default.jpg",
            description: "Lorem ipsum dolor sit amet, ne brute ocurreret vim, vim labores consulatu splendide ea. Melius nostrum ex pro, invenire percipitur ei sit. Melius timeam epicurei duo at, cibo veritus perpetua ad usu, cum eros probo tincidunt te. Alia dicit laboramus an pri, atqui vulputate nam et. Ridens laoreet interesset id has, te pro bonorum detracto. Et vim dictas latine.",
            type: "",
            userOwnerId: 1,
            userOwnerName: fetchName(),
            userHolderId: 2,
            statusText: (1===2) ? "zauzeto" : "slobodno",
            statusColor: (1===2) ? "danger" : "success",
            isLoading: false
        })
    }

    render() {
        const textWidth = {
            sm: 12,
            md: 6
        }
        const imageWidth = {
            sm: 12,
            md: 6
        }

        return (
            <Row> 
                <TextColumn
                    size={textWidth}
                    text={{
                        title: this.state.name,
                        subtitle: this.state.userOwnerName,
                        body: this.state.description
                    }}
                />
                <ImageColumn 
                    size={imageWidth}
                    image={this.state.image}
                    status={this.state.statusColor}
                    info={this.state.statusText}
                 />
            </Row>
        );
    }
}

export default ItemDetailsContainer;