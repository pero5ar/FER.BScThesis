import React, { Component } from 'react';
import ItemThumbnailContainer from './item/ItemThumbnailContainer';
import Loading from 'react-loading';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            isError: false,
            filterText: this.props.location.state || ""
        };
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoading: true
        });
        let _this = this;
        fetch("/api/items").then(response => response.json())
            .then(items => {
                _this.setState( {
                    items: items,
                    isLoading: false
                })
            })
            .catch(err => {
                _this.setState( {
                    items: [],
                    isLoading: false,
                    isError: true
                })
            });
    }

    getFilteredItems() {
        let filter = this.state.filterText.toLowerCase();
        return this.state.items.filter(item => item.name && item.name.toLowerCase().startsWith(filter));
    }


    render() {
        return (
            <div>
                { this.props.location.state }
                { this.state.isError && <div style={ { color: "red" } }>Error :(</div> }
                { this.state.isLoading && <Loading type='balls' color='#000000' /> }
                <ItemThumbnailContainer items={ this.getFilteredItems() } />
            </div>
        );
    }
}

export default Main;