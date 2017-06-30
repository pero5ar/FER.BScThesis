import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap/lib';
import { ITEM_TYPES } from '../modules/Constants';
import ItemThumbnailContainer from './item/ItemThumbnailContainer';
import LoadingStatus from './shared/LoadingStatus';

class Main extends Component {
    constructor(props) {
        super(props);

        this.handleSelectCategory = this.handleSelectCategory.bind(this);

        this.state = {
            items: [],
            isLoading: false,
            isError: false,
            categoryId: -1,
            filterText: this.props.location.search ? this.props.location.search.substr(1) : ""
        };
    }

    handleSelectCategory(key) {
        this.setState({ categoryId: key-2 })
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
        return this.state.items.filter(item => ( this.state.categoryId === -1
                                                    || item.type === ITEM_TYPES[this.state.categoryId] )
                                            && (( item.name
                                                    && item.name.toLowerCase().includes(filter) )
                                                || ( item.description
                                                    && item.description.substr(0, 200).toLowerCase().includes(filter) ))
                                            );
    }

    render() {
        let tabs = ITEM_TYPES.map((type, index) => (
            <Tab eventKey={index+2} title={type.toUpperCase()} />
        ));
        tabs.unshift(<Tab eventKey={1} title="SVE" />);

        return (
            <div>
                <Tabs defaultActiveKey={1} animation={false} onSelect={this.handleSelectCategory}>
                    {tabs}
                </Tabs>
                <LoadingStatus isError={this.state.isError} isLoading={this.state.isLoading} />
                <ItemThumbnailContainer items={ this.getFilteredItems() } />
            </div>
        );
    }
}

export default Main;