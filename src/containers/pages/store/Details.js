import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import DetailsSection from "../../../components/pages/store/DetailsSection";
import CommentsSection from "../../../components/pages/store/CommentsSection";
import {withRouter} from "react-router-dom";
import "../../../styles/store.css"
import products from "../../../data/json/products.json";
import Filter from "../../../components/pages/store/Filter";
import Sidebar from "../../../components/pages/store/Sidebar";


import {addToCarts, getCartRecords, getSingleRecord} from "../../../redux/store/actions";
import {
    selectAddToCartRequest, selectGetSingleRecord,
    selectGetSingleRecordRequest
} from "../../../redux/store/selectors";

class Details extends Component {

    _getProductById(id) {
        return products.filter(item =>  item.id == id)[0]
    }


    _addToCart(id) {
        this.props.addToCarts(id)
    }

    render() {
        const productID = this.props.match.params.id;

        const {record, addToCartRequest} = this.props;

        console.log(addToCartRequest.get("fail"));

        return (
            <div className="m-portlet store-wrapper fadeInLeft animated">
                <div className="m-portlet__head m--margin-bottom-30">
                    <div className="m-portlet__head-caption">
                            <Filter/>
                    </div>
                </div>
                <div className="container" id="productDetails">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="m-portlet">
                            <DetailsSection data={this._getProductById(productID)} buyClick={(id) => {this._addToCart(id)}}/>
                            <CommentsSection/>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Sidebar data={products} title="Recent" dataType="recent"/>
                    </div>
                </div>
            </div>

            </div>

        );
    }
}

Details = connect(
    (state) => ({
        getSingleRecord: selectGetSingleRecordRequest(state),
        addToCartRequest: selectAddToCartRequest(state),
        record: selectGetSingleRecord(state),
    }),
    (dispatch) => ({
        getRecords: (params = {type:'recent'}) => { dispatch(getCartRecords(params)) },
        getSingleRecord: (id, params = {}) => { dispatch(getSingleRecord(id, params)) },
        addToCarts: (id, params = {}) => { dispatch(addToCarts(id, params)) },
    })
)(Details);



export default withRouter(translate("Details")(Details));

