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


import {addToCarts,  getRecords, getSingleRecord} from "../../../redux/store/actions";
import {
    selectAddToCartRequest, selectGetRecordsRequest, selectGetSingleRecord,
    selectGetSingleRecordRequest, selectRecords
} from "../../../redux/store/selectors";

class Details extends Component {

    componentDidMount() {
        const recordId = this.props.match.params.id;
        this._getRecord(recordId);
        this._getRecords();
    }

    _getProductById(id) {
        return products.filter(item =>  item.id == id)[0]
    }

    _getRecord(id,params) {
        this.props.getSingleRecord(id)
    }

    _getRecords() {
        this.props.getRecords();
    }

    _addToCart(id) {
        this.props.addToCarts(id)
    }

    render() {
        const productID = this.props.match.params.id;

        const {record, records, addToCartRequest ,getSingleRecordRequest} = this.props;
        const loadingSingle = getSingleRecordRequest.get('loading');
        const successSingle = getSingleRecordRequest.get('success');

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
                            {successSingle &&
                            <DetailsSection data={record} buyClick={(id) => {this._addToCart(id)}}/>}
                            <CommentsSection/>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {successSingle &&
                        <Sidebar data={records} title="Recent" dataType="recent"/>}
                    </div>
                </div>
            </div>

            </div>

        );
    }
}

Details = connect(
    (state) => ({
        getSingleRecordRequest: selectGetSingleRecordRequest(state),
        addToCartRequest: selectAddToCartRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state),
        records: selectRecords(state),
        record: selectGetSingleRecord(state),
    }),
    (dispatch) => ({
        getRecords: (params = {type:'recent'}) => { dispatch(getRecords(params)) },
        getSingleRecord: (id, params = {}) => { dispatch(getSingleRecord(id, params)) },
        addToCarts: (id, params = {}) => { dispatch(addToCarts(id, params)) },
    })
)(Details);



export default withRouter(translate("Details")(Details));

