import React, { Component } from 'react';
import { Row, Button, Clearfix } from 'react-bootstrap/lib';
import no_image_avalible from '../../images/no_image_available.png';
import Auth from '../../modules/Auth';
import ImageColumn from '../shared/ImageColumn';
import TextColumn from '../shared/TextColumn';
import LoadingStatus from '../shared/LoadingStatus';

class ItemDetailsContainer extends Component {
    constructor(props) {
        super(props)

        this.handleReserve = this.handleReserve.bind(this);

        this.id = this.props.match.params.id;
        this.state = {
            isError: false,
            isLoading: false,
            reservable: false,
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

    handleReserve() {
        this.setState({
            isLoading: true
        });
        let _this = this;
        let data = {
            userOwnerId: this.state.userOwnerId,  // prima request
            userHolderId: Auth.getId(),  // radi request
            date : new Date()
        }
        fetch(`/api/userRequest`, {
                method: "POST",
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(res => {
                _this.setState({
                    isLoading: false,
                    reservable: false
                })
            })
            .catch(err => {
                _this.setState({
                    isError: true,
                    isLoading: false
                });
            });
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoading: true
        });
        let _this = this;
        fetch(`/api/items/${this.id}`)
            .then(response => response.json())
            .then(item => {
                let avalible = !item.userHolderId || item.userOwnerId === item.userHolderId;
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
                if (avalible && Auth.isUserAuthenticated()) {
                    let userId = Auth.getId();
                    if (userId !== item.userOwnerId) {
                        fetch(`/api/itemRequests/${this.id}`)
                            .then(response => response.json())
                            .then(claims => {
                                let reservable = true;
                                for (let claim in claims) {
                                    if (userId === claim.userHolderId) {
                                        reservable = false;
                                        break;
                                    }
                                }
                                _this.setState({
                                    reservable: reservable
                                })
                            })
                    }
                }
                return item.userOwnerId;
            })
            .then(userOwnerId => {
                if (!userOwnerId) {
                    _this.setState({
                        userOwnerName: "unknown"
                    });
                    return;
                }
                fetch(`/api/users/${userOwnerId}`)
                    .then(response => response.json())
                    .then(user => {
                        _this.setState({
                            userOwnerName: user.name
                        });
                    })
            })
            .then(() => {
                _this.setState({
                    isLoading: false
                });
            })
            .catch(err => {
                _this.setState({
                    isError: true,
                    isLoading: false
                });
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

        const ReserveButton = () => !this.state.reservable ? null : (
                <Button bsStyle="danger" onClick={this.handleReserve}>
                    Rezerviraj
                </Button>
            );

        const OwnerProfileButton = () => !this.state.userOwnerId ? null : (
                <Button href={`/profile/${this.state.userOwnerId}`}>
                    Profil vlasnika
                </Button>
            );

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
                    image={this.state.image || no_image_avalible}
                    status={this.state.statusColor}
                    info={this.state.statusText}
                 />
                <Clearfix />
                <br />
                <br />
                <OwnerProfileButton />
                &nbsp;
                <ReserveButton />
            </Row>
        );
    }
}

export default ItemDetailsContainer;