import React, {Component} from 'react';
import {Grid} from 'react-bootstrap/lib';
import Navigation from './components/Navigation';
import ItemThumbnailContainer from './components/item/ItemThumbnailContainer';
import OfferContainer from './components/offer/OfferContainer';
import NotificationContainer from './components/notification/NotificationContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Grid>
                        <Route exact path="/" component={ItemThumbnailContainer}/>
                        <Route path="/offer" component={OfferContainer}/>
                        <Route path="/notifications" component={NotificationContainer}/>
                        <Route path="/profile" component={ProfileContainer}/>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
