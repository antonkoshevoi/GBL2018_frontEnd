import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import products from '../../../data/json/products.json';
import '../../../styles/store.css'

import ProductsSection from "../../../components/pages/store/ProductsSection";
import Filter from "../../../components/pages/store/Filter";
import {withRouter} from "react-router-dom";
import {getRecords} from "../../../redux/store/actions";
import {selectGetRecordsRequest, selectRecords} from "../../../redux/store/selectors";
import Loader from "../../../components/layouts/Loader";

class Products extends Component {

    state = {
        isFiltered:false
    }

    componentDidMount(){
        this._getRecords();
    }


    _getRecords(params) {
        this.props.getRecords(params);
    }

    render() {
        const {records, getRecordsRequest} = this.props;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');

        return (
            <div className="animated fadeInLeft">
                {loading &&
                <Loader/>}
                <div className="m-portlet store-wrapper">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                                <Filter/>
                        </div>
                    </div>

                    <div id="store-body" className="all-products">
                        <ProductsSection title={this.props.match.params.type} all={true} products={records}/>
                    </div>
                </div>
            </div>
        );
    }
}


Products = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        records: selectRecords(state),
    }),
    (dispatch) => ({
        getRecords: (params = {type:'recent'}) => { dispatch(getRecords(params)) },
    })
)(Products);



export default withRouter(translate("Products")(Products));


