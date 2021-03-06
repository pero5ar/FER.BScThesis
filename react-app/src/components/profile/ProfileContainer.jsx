import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Clearfix, Button, Collapse } from 'react-bootstrap/lib';
import Auth from '../../modules/Auth';
import ImageColumn from '../shared/ImageColumn';
import TextColumn from '../shared/TextColumn';
import LoadingStatus from '../shared/LoadingStatus';
import EditProfileForm from './EditProfileForm';

class ProfileContainer extends Component {
    constructor(props) {
        super(props)

        this.handleFormCollapse = this.handleFormCollapse.bind(this);

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

    handleFormCollapse() {
        this.setState({ openForm: !this.state.openForm });
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

        const OpenFormButton = () => this.state.openForm ? null : (
                <Button onClick={this.handleFormCollapse}>
                    Uredi Profil
                </Button>
            );

        return (
            <Row>
                <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoading} />
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
                <Clearfix />
                <br />
                <br />
                { this.id === Auth.getId() &&
                <Col xs={12}>
                    <Collapse in={this.state.openForm} timeout={5000}>
                        <div>
                            <EditProfileForm handleFormCollapse={this.handleFormCollapse} />
                        </div>
                    </Collapse>
                    <OpenFormButton />
                </Col>
                }
            </Row>
        );
    }
}

export default withRouter(ProfileContainer);