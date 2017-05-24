import React, {Component} from 'react';
import {Grid} from 'react-bootstrap/lib';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Login from './components/Login'
import ItemDetails from './components/item/ItemDetails';
import OfferContainer from './components/offer/OfferContainer';
import NotificationContainer from './components/notification/NotificationContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Auth from './modules/Auth';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Grid>
                        <Route exact path="/" component={Main}/>
                        <Route path="/home" component={Main}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/item/:id" component={ItemDetails}/>
                        <Route path="/offer" render={() => Auth.isUserAuthenticated() ? <OfferContainer/> : <Redirect to="/login"/>}/>
                        <Route path="/notifications" render={() => Auth.isUserAuthenticated() ? <NotificationContainer/> : <Redirect to="/login"/>}/>
                        <Route exact path="/profile" render={() => Auth.isUserAuthenticated() ? <ProfileContainer/> : <Redirect to="/login"/>}/> {/*TODO: wrap this with redirect to login user profile*/}
                        <Route path="/profile/:id" render={() => Auth.isUserAuthenticated() ? <ProfileContainer/> : <Redirect to="/login"/>}/>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
