import React, { Component } from 'react';
import {Row} from 'react-bootstrap/lib';
import ImageColumn from '../shared/ImageColumn';
import TextColumn from '../shared/TextColumn';
import LoadingStatus from '../shared/LoadingStatus';

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
        };
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoading: true
        });
        let _this = this;
        fetch(`/api/items/${this.id}`).then(response => response.json())
            .then(item => {
                let avalible = item.userOwnerId !== item.userHolderId;
                _this.setState({
                    name: item.name,
                    image: item.image,
                    description: item.description,
                    type: item.type,
                    userOwnerId: item.userOwnerId,
                    userHolderId: item.userHolderId,
                    statusText: avalible ? "slobodno" : "zauzeto",
                    statusColor: avalible ? "success" : "danger"
                });
                return item.userOwnerId;
            }).then(userOwnerId => {
                if (!userOwnerId) {
                    _this.setState({
                        userOwnerName: "unknown"
                    });
                    return;
                } 
                fetch(`/api/users/${userOwnerId}`).then(response => response.json())
                .then(user => {
                    _this.setState({
                        userOwnerName: user.name
                    });
                })
            }).then(() => {
                _this.setState({
                    isLoading: false
                });
            }).catch(err => {
                _this.setState({
                    isError: true,
                    isLoading: false
                })
            });
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
                <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoading} />
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