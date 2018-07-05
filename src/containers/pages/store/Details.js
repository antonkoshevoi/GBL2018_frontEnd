import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import { push } from 'react-router-redux';
import DetailsSection from "../../../components/pages/store/DetailsSection";
import CommentsSection from "../../../components/pages/store/CommentsSection";
import {withRouter} from "react-router-dom";
import "../../../styles/store.css"
import Filter from "../../../components/pages/store/Filter";
import Sidebar from "../../../components/pages/store/Sidebar";
import {addToCarts, getRecords, getSingleRecord} from "../../../redux/store/actions";
import {
  selectAddToCartRequest, selectGetRecordsRequest, selectGetSingleRecord,
  selectGetSingleRecordRequest, selectRecords
} from "../../../redux/store/selectors";
import Loader from "../../../components/layouts/Loader";
import {buildSortersQuery} from "../../../helpers/utils";
import toastr from 'toastr';

class Details extends Component {

  state = {
    sorters: {
      created: 'desc'
    }
  }

  componentDidMount() {
    const recordId = this.props.match.params.id;
    this._getPageRecords(recordId);
  }

  componentWillReceiveProps(nextProps) {
    const recordId = this.props.match.params.id;
    const nextRecordId = nextProps.match.params.id;
    if (recordId !== nextRecordId) {
      this._getPageRecords(nextRecordId);
    }
  }

  _getRecord(id, params) {
    this.props.getSingleRecord(id)
  }

  _getRecords() {
    const {sorters} = this.state;
    this.props.getRecords({
      orderBy: buildSortersQuery(sorters)
    });
  }

  _getPageRecords(id) {
    this._getRecord(id);
    this._getRecords();
  }

  _addToCart(id) {
    const {t, auth} = this.props;

    if (auth.get('isLoggedIn')) {
        this.props.addToCarts(id);
    } else {
        toastr.success(t(`messages:loginOrCreateAccount`));
        this.props.goTo('/login');
    }       
  }

  render() {
    const {record, records, addToCartRequest, getSingleRecordRequest, getRecordsRequest} = this.props;
    const loadingSingle = getSingleRecordRequest.get('loading');
    const successSingle = getSingleRecordRequest.get('success');    
    const successRecords = getRecordsRequest.get('success');

    const similarRecords =
      (successRecords && successSingle) ?
      records.filter((item) => {
      return (item.get('category').get('id') == record.get('category').get('id')) && (item.get('id') !== record.get('id'))}).slice(0, 5) : [];

    return (
      <div className="m-portlet store-wrapper fadeInLeft animated">
        {loadingSingle &&
        <Loader/>}
        <div className="m-portlet__head m--margin-bottom-30">
          <div className="m-portlet__head-caption">
            <Filter isActive={false} type="details"/>
          </div>
        </div>
        <div className="container" id="productDetails">
          <div className="row">
            <div className="col-lg-8">
              {successSingle &&
              <div className="m-portlet">
                <DetailsSection data={record} addedRequest={addToCartRequest} buyClick={(id) => {
                  this._addToCart(id)
                }}/>
                <CommentsSection/>
              </div>
              }
            </div>
            <div className="col-lg-4">
              {successSingle &&
              <Sidebar data={similarRecords} title="Similar" dataType="similar"/>}
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
    auth: state.auth
  }),
  (dispatch) => ({
    getRecords: (params = {type: 'recent'}) => {
      dispatch(getRecords(params))
    },
    getSingleRecord: (id, params = {}) => {
      dispatch(getSingleRecord(id, params))
    },
    addToCarts: (id, params = {}) => {
      dispatch(addToCarts(id, params))
    },
    goTo: (url) => {dispatch(push(url))}
  })
)(Details);


export default withRouter(translate("Details")(Details));

