import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Row} from 'react-bootstrap/lib';
import ImageColumn from '../shared/ImageColumn';
import TextColumn from '../shared/TextColumn';
import Loading from 'react-loading';

class ProfileContainer extends Component {
    constructor(props) {
        super(props)

        this.id = this.props.match.params.id;
        this.state = {
            isError: false,
            isLoading: false,
            name: "",
            image: "",
            description: "",
            email: "",
            rating: "",
            ownedItems: [],
            rentedItems: [],
            statusText: null,
            statusColor: null
        };
    }

     componentDidMount() {
        this.setState({
            isError: false,
            isLoading: true
        });
        let _this = this;
        fetch(`/api/users/${this.id}`).then(response => response.json())
            .then(user => {
                _this.setState({
                    name: user.name,
                    image: user.profilePic,
                    description: user.description,
                    email: user.email,
                    rating: user.rating,
                    ownedItems: user.ownedItems,
                    rentedItems: user.rentedItems
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
            md: 8
        }
        const imageWidth = {
            sm: 12,
            md: 4
        }

        return (
            <Row>
                { this.state.isError && <div style={ { color: "red" } }>Error :(</div> }
                { this.state.isLoading && <Loading type='balls' color='#000000' /> }
                <ImageColumn 
                    size={imageWidth}
                    image={this.state.image}
                    status={this.state.statusColor}
                    info={this.state.statusText}
                 />
                <TextColumn
                    size={textWidth}
                    text={{
                        title: this.state.name,
                        subtitle: this.state.email,
                        body: this.state.description
                    }}
                />
            </Row>
        );
    }
}

export default withRouter(ProfileContainer);