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


class Store extends Component {

    componentDidMount(){
        this._getRecords();
    }


    _getRecords() {
        this.props.getRecords();
    }

    render() {

        const {records, getSingleRecord} = this.props;

        console.log(records);
        return (
            <div className="animated fadeInLeft">
                <div className="m-portlet store-wrapper">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">

                               <Filter/>

                        </div>
                    </div>

                    <div id="store-body">
                        <ProductsSection type="newest" title="Newest" products={records}/>
                        <ProductsSection type="popular" title="Most Popular" products={records}/>
                        <ProductsSection type="top" title="Top Rating" products={records}/>
                    </div>
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
