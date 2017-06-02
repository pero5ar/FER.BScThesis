import React, { Component } from 'react';
import ItemThumbnailContainer from './item/ItemThumbnailContainer';
import LoadingStatus from './shared/LoadingStatus';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            isError: false,
            filterText: this.props.location.search ? this.props.location.search.substr(1) : ""
        };
    }

    componentDidMount() {
        this.setState({
            isError: false,
            isLoading: true
        });
        let _this = this;
        fetch("/api/items")
            .then(response => response.json())
            .then(items => {
                _this.setState( {
                    items: items,
                    isLoading: false
                });
            })
            .catch(err => {
                _this.setState( {
                    items: [],
                    isLoading: false,
                    isError: true
                });
            });
    }

    getFilteredItems() {
        let filter = this.state.filterText.toLowerCase();
        return this.state.items.filter(item => item.name && item.name.toLowerCase().startsWith(filter));
    }

    render() {
        return (
            <div>
                { this.state.filterText }
                <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoading} />
                <ItemThumbnailContainer items={ this.getFilteredItems() } />
            </div>
        );
    }
}

export default Main;