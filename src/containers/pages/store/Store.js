import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Target} from "material-ui";
import Filter from "../../../components/pages/store/Filter";
import products from "../../../data/json/products.json";
import ProductsSection from "../../../components/pages/store/ProductsSection";
import {
    selectGetRecordsRequest, selectRecords
} from "../../../redux/store/selectors";
import {withRouter} from "react-router-dom";
import {getCartRecords, getRecords, getSingleRecord} from "../../../redux/store/actions";
import Loader from "../../../components/layouts/Loader";


class Store extends Component {


    state = {
        isFiltered:false
    }

    componentDidMount(){
        this._getRecords();
    }


    _getRecords(params) {
        this.props.getRecords(params);
    }

    _setFilters(params) {
        this.setState({isFiltered:true});
        this._getRecords(params)
    }


    _renderNotFountMessage() {
        return (
          <div className="notFountMessage">
              <div className="display-1">
                  <h1>Products Founds</h1>
              </div>
          </div>
        )
    }


    render() {

        const {records, getRecordsRequest} = this.props;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');
        const {isFiltered} = this.state;

        return (
            <div className="animated fadeInLeft">
                {loading &&
                <Loader/>}
                <div className="m-portlet store-wrapper">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">

                               <Filter onChange={(fields) => {this._setFilters(fields)}}/>

                        </div>
                    </div>
                    {(success && !isFiltered) &&
                    <div id="store-body">
                        <ProductsSection type="newest" title="Newest" products={records.slice(0, 9)}/>
                        <ProductsSection type="popular" title="Most Popular" products={records.slice(0, 9)}/>
                        <ProductsSection type="top" title="Top Rating" products={records.slice(0, 9)}/>
                    </div>
                    }
                    {isFiltered &&
                    <div id="store-body">
                        <ProductsSection type="newest" title="Search Result" all={true} products={records}/>
                    </div>
                    }

                  {records.size === 0 && this._renderNotFountMessage()}
                </div>
            </div>
        );
    }
}

Store = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        records: selectRecords(state),
    }),
    (dispatch) => ({
        getRecords: (params = {type:'recent'}) => { dispatch(getRecords(params)) },
    })
)(Store);


export default withRouter(translate("Store")(Store));
