import React, {Component} from 'react';
import {Grid} from 'react-bootstrap/lib';
import Navigation from './components/Navigation';
import Main from './components/Main';
import LogIn from './components/LogIn'
import ItemDetails from './components/item/ItemDetails';
import OfferContainer from './components/offer/OfferContainer';
import NotificationContainer from './components/notification/NotificationContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false   // TODO: maintain this across tabs
        };
        this.handleLogIn = this.handleLogIn.bind(this);
    }

    handleLogIn() {     // TODO: fetch data
        this.setState({
            isLoggedIn: !this.state.isLoggedIn
        });
    }

    render() {
        const LogInWithState = (props) => (<LogIn handleLogIn={this.handleLogIn} {...props}/>);

        return (
            <Router>
                <div>
                    <Navigation/>
                    <Grid>
                        <Route exact path="/" component={Main}/>
                        <Route path="/home" component={Main}/>
                        <Route path="/login" component={LogInWithState}/>
                        <Route path="/item/:id" component={ItemDetails}/>
                        <Route path="/offer" render={() => this.state.isLoggedIn ? <OfferContainer/> : <Redirect to="/login"/>}/>
                        <Route path="/notifications" render={() => this.state.isLoggedIn ? <NotificationContainer/> : <Redirect to="/login"/>}/>
                        <Route exact path="/profile" render={() => this.state.isLoggedIn ? <ProfileContainer/> : <Redirect to="/login"/>}/> {/*TODO: wrap this with redirect to login user profile*/}
                        <Route path="/profile/:id" render={() => this.state.isLoggedIn ? <ProfileContainer/> : <Redirect to="/login"/>}/>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
