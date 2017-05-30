import React, { Component } from 'react';
import ItemThumbnailContainer from './item/ItemThumbnailContainer';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            iserror: false,
            filterText: this.props.location.state || ""
        }
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
            })
    }

    getFilteredItems() {
        let filter = this.state.filterText.toLowerCase();
        return this.state.items.filter(item => item.title && item.title.toLowerCase().startsWith(filter));
    }


    render() {
        return (
            <div>
                { this.props.location.state }
                { this.state.isError && <div style={ { color: "red" } }>Error :(</div> }
                <ItemThumbnailContainer items={ this.getFilteredItems() } />
            </div>
        );
    }
}

export default Main;