import React, {Component} from 'react';
import {Grid} from 'react-bootstrap/lib';
import Navigation from './components/Navigation';
import Main from './components/Main';
import ItemDetails from './components/item/ItemDetails';
import OfferContainer from './components/offer/OfferContainer';
import NotificationContainer from './components/notification/NotificationContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';

const NavigationWithRouter = withRouter(Navigation);

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavigationWithRouter />
                    <Grid>
                        <Route exact path="/" component={Main}/>
                        <Route path="/item/:id" component={ItemDetails}/>
                        <Route path="/offer" component={OfferContainer}/>
                        <Route path="/notifications" component={NotificationContainer}/>
                        <Route exact path="/profile" component={ProfileContainer}/> {/*TODO: wrap this with redirect to login user profile*/}
                        <Route path="/profile/:id" component={ProfileContainer}/>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
