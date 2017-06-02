import React, {Component} from 'react';
import {Grid} from 'react-bootstrap/lib';
import Navigation from './components/Navigation';
import Main from './components/Main';
import Login from './components/auth/Login'
import Registration from './components/auth/Registration';
import ItemDetailsContainer from './components/item/ItemDetailsContainer';
import OfferContainer from './components/offer/OfferContainer';
import NotificationContainer from './components/notification/NotificationContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Auth from './modules/Auth';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Grid>
                        <Route exact path="/" component={Main}/>
                        <Route path="/home" component={Main}/>
                        <Route path="/login" render={() => Auth.isUserAuthenticated() ? <Redirect to="/home"/> : <Login/>}/>
                        <Route path="/register" render={() => Auth.isUserAuthenticated() ? <Redirect to="/home"/> : <Registration/>}/>
                        <Route path="/item/:id" component={ItemDetailsContainer}/>
                        <Route path="/offer" render={() => true ? <OfferContainer/> : <Redirect to="/login"/>}/>
                        <Route path="/notifications" render={() => Auth.isUserAuthenticated() ? <NotificationContainer/> : <Redirect to="/login"/>}/>
                        <Route exact path="/profile" render={() => Auth.isUserAuthenticated() ? <Redirect to={"/profile/" + Auth.getId()}/> : <Redirect to="/login"/>}/>
                        <Route path="/profile/:id" render={() => Auth.isUserAuthenticated() ? <ProfileContainer/> : <Redirect to="/login"/>}/>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
