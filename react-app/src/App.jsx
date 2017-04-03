import React, {Component} from 'react';
import {Grid} from 'react-bootstrap/lib';
import Navigation from './components/Navigation';
import ItemThumbnailContainer from './components/ItemThumbnailContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Grid>
                    <ItemThumbnailContainer/>
                </Grid>
            </div>
        );
    }
}

export default App;
