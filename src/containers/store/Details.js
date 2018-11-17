import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {push} from 'react-router-redux';
import {Icon} from '@material-ui/core';
import {withRouter} from "react-router-dom";
import Filter from "../../components/store/Filter";
import Sidebar from "../../components/store/Sidebar";
import StarRating from "../../components/ui/StarRating";
import Loader from "../../components/layouts/Loader";
import {addToCarts, getRecords, getSingleRecord} from "../../redux/store/actions";
import {selectAddToCartRequest, selectGetRecordsRequest, selectGetSingleRecord, selectGetSingleRecordRequest, selectRecords} from "../../redux/store/selectors";
import {buildSortersQuery} from "../../helpers/utils";
import toastr from 'toastr';
import "../../styles/store.css"

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
    const {record, records, addToCartRequest, getSingleRecordRequest, getRecordsRequest, t} = this.props;
    const loadingSingle = getSingleRecordRequest.get('loading');
    const successSingle = getSingleRecordRequest.get('success');    
    const successRecords = getRecordsRequest.get('success');    
    const price         = successSingle ? Number(record.get('price')) : 0;
    const discountPrice = Number(price - (price * record.get('discount') / 100));
    const showFilters = {
        sort: false,
        all: true,
        subject: true,
        target: true,
        search: false,
        newest: true
    };    

    const similarRecords = (successRecords && successSingle) ?
      records.filter((item) => {
        return (item.get('category').get('id') === record.get('category').get('id')) && (item.get('id') !== record.get('id'))
      }).slice(0, 5) : [];

    return (
      <div className="m-portlet store-wrapper fadeInLeft animated">
        {loadingSingle && <Loader/>}
        <div className="m-portlet__head m--margin-bottom-30">
          <div className="m-portlet__head-caption">
            <Filter isActive={false} type="details" onChange={() => { }} isShow={showFilters} />
          </div>
        </div>
        <div className="container" id="productDetails">
          <div className="row">
            <div className="col-lg-8">
              {successSingle &&
              <div className="m-portlet">
                <div id="product-details">
                  <div className="headerBlock">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="productImage m--margin-10">
                          <img src={record.get('thumbnail')} className="full-width" alt="product"/>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="d-flex flex-column m--full-height justify-content-between">
                          <div className="productInfo full-width m--padding-20">
                            <div className="row">
                              <div className="col-md-12">
                                <h4 className="productTitle">{record.get('title')}</h4>
                              </div>
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-7">                                    
                                    <p className="m--margin-bottom-5">{t('product')}: {record.get('category').get('title')}</p>
                                    <p className="m--margin-bottom-5">{t('age')}: {record.get('target').get('title') ? record.get('target').get('title') : t('noInfo')}</p>
                                    <p className="m--margin-bottom-5">{t('subject')}: {record.get('subject').get('title') ? record.get('subject').get('title') : t('noInfo')}</p>
                                  </div>
                                  <div className="col-md-5 text-right">
                                    <div className="align-text-bottom">
                                      <StarRating score={record.get('score') || 4}/>
                                      <span className="m--margin-left-5">{record.get('count') || 54} <Icon style={{fontSize:17, color:'#737373', transform: 'translateY(3px)'}}>person</Icon></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="actionsBtn justify-content-end full-width align-items-end d-flex m--padding-right-20 align-self-end">
                            <button className="btn m-btn btn-danger m-btn--icon no-border" onClick={() => { this._addToCart(record.get('id')) }}>
                              <span>
                                {addToCartRequest.get('success') && <i className="fa floating-basket fa-shopping-basket"></i>}
                                {record.get('discount') > 0 && <span className="discount"><span>${price.toFixed(2)} </span></span>}
                                <span>${discountPrice.toFixed(2)}</span>
                                  <span className="text-uppercase">{t('buy')}</span>
                              </span>
                            </button>
                          </div>
                        </div>

                      </div>
                      {record.get('videoLink') &&
                      <div className="col-md-12 m--margin-top-15">
                        <iframe title={record.get('title')} className="full-width mainVideo" width={640} height={360} src={record.get('videoLink')}></iframe>
                      </div>}
                    </div>
                  </div>
                  <div className='m-separator m-separator--dashed m-separator--'></div>
                  <div className="DescBlock m--padding-20">
                    <p>{record.get('description')}</p>
                  </div>
                  <div className='m-separator m-separator--dashed'></div>
                </div>
              </div>
              }
            </div>
            <div className="col-lg-4">
              {successSingle &&
              <Sidebar data={similarRecords} title={t('similar')} dataType="similar"/>}
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


export default withRouter(translate("translations")(Details));

