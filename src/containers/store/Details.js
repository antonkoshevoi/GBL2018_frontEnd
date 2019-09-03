import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {push} from 'react-router-redux';
import {withRouter} from "react-router-dom";
import Filter from "../../components/store/Filter";
import Sidebar from "../../components/store/Sidebar";
import {Loader} from "../../components/ui/Loader";
import {Price} from "../../components/ui/Price";
import {VideoFrame} from "../../components/ui/VideoFrame";
import {addToShoppingCart, getRecords, getSingleRecord} from "../../redux/store/actions";
import {selectAddToCartRequest, selectGetRecordsRequest, selectGetSingleRecord, selectGetSingleRecordRequest, selectRecords} from "../../redux/store/selectors";
import {buildSortersQuery} from "../../helpers/utils";
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';

class Details extends Component {

  state = {
    photoIndex: 0,
    showLightbox: false,
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
    this.props.addToShoppingCart(id);
  }
  
  _showLightbox(index) {
    this.setState({
      showLightbox: true,
      photoIndex: index
    });
  }
  
  _renderPrices() {
        const {record, goTo, t} = this.props;        

        if (record.get('digitalItemId')) {
            return <div className='d-flex justify-content-end pr-4'>
                <div>
                    <p className='mb-2 d-flex justify-content-between align-items-center'>
                        <span>{t('printable')}</span> <i className="fa fa-download display-6 ml-2" aria-hidden="true"></i>
                    </p>
                    {record.get('digitalItem').get('isBought') ?
                        <button className="btn btn-primary w-100" onClick={() => { goTo('/downloads') }}>
                            {t('download')}
                        </button>
                    :                    
                        <button className="btn btn-primary w-100" onClick={() => { this._addToCart(record.get('digitalItemId')) }}>
                            {(record.get('digitalItem').get('discountPrice') > 0) ? <Price price={record.get('digitalItem').get('discountPrice')} currency={record.get('currency')} /> : t('freeProduct')}
                        </button> 
                    }
                </div>
                <div className='ml-5'>
                    <p className='mb-2 d-flex justify-content-between align-items-centern'>
                        <span>{t('physical')}</span> 
                        <i className="fa fa-truck display-6" aria-hidden="true"></i>
                    </p>               
                    <button className="btn btn-success" onClick={() => { this._addToCart(record.get('id')) }}>                                            
                        {(record.get('discountPrice') > 0) ? <Price price={record.get('discountPrice')} currency={record.get('currency')} /> : t('freeProduct')}
                    </button>
                </div>
            </div>;
        }
        
        return <div className="actionsBtn justify-content-end full-width align-items-center d-flex pr-4 align-self-center">
            <div className="pr-3">{record.get('discount') > 0 && <span className="position-relative discount"><span><Price price={record.get('price')} currency={record.get('currency')} /></span></span>}</div>
            {(record.get('isDigitalOnly') && record.get('isBought')) ?
                <button className="btn btn-primary" onClick={() => { goTo('/downloads') }}>
                    <i className="fa fa-download display-6 mr-2" aria-hidden="true"></i> {t('download')}
                </button>
            :                
                <button className="btn btn-success" onClick={() => { this._addToCart(record.get('id')) }}>                                            
                    {(record.get('discountPrice') > 0) ? <Price price={record.get('discountPrice')} currency={record.get('currency')} /> : t('freeProduct')}
                </button>
            }
        </div>;     
  }

  _renderImages() {
    const {record} = this.props;        
    const {photoIndex, showLightbox} = this.state;    
            
    let images          = record.get('images').toJS().map((item) => item.url);
    let previewImages   = record.get('images').toJS().map((item) => item.previewUrl);
    
    if (record.get('videoLink')) {
        const videoId = record.get('videoLink').split('/').pop().replace('watch?v=', '');
        
        images.unshift(<VideoFrame title='' src={record.get('videoLink')} />);
        previewImages.unshift('https://img.youtube.com/vi/' + videoId +'/1.jpg');
    };
    
    return <div className="store-item-images">
      {previewImages.map((url, i) => {
        if (i >= 3) {
            return '';
        }
        return <img className="m-1 store-item-image" key={i} onClick={() => this._showLightbox(i)} src={url} alt="" />;
      })}
      {showLightbox && <Lightbox
        mainSrc={images[photoIndex]}
        nextSrc={images[(photoIndex + 1) % images.length]}
        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
        onCloseRequest={() => this.setState({ showLightbox: false })}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex: (photoIndex + images.length - 1) % images.length,
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % images.length,
          })
        }
      />}
    </div>;
  }
    
  render() {
    const {record, records, addToCartRequest, getSingleRecordRequest, getRecordsRequest, t} = this.props;
    const loading           = getSingleRecordRequest.get('loading') || addToCartRequest.get('loading');
    const successSingle     = getSingleRecordRequest.get('success');    
    const successRecords    = getRecordsRequest.get('success');
    
    const showFilters = {
        sort: false,
        all: true,
        filters: false,
        search: false,
        newest: true
    };    

    const similarRecords = (successRecords && successSingle) ?
      records.filter((item) => {
        return (item.get('category').get('id') === record.get('category').get('id')) && (item.get('id') !== record.get('id'))
      }).slice(0, 5) : [];

    return (
      <div className="m-portlet store-wrapper fadeInLeft animated">
        {loading && <Loader/>}
        <div className="m-portlet__head mb-4">
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
                        <div className="productImage m-2">
                          <img src={record.get('thumbnail')} className="full-width" alt="product"/>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="d-flex flex-column m--full-height justify-content-between">
                          <div className="productInfo full-width p-3">
                            <div className="row">
                              <div className="col-md-12">
                                <h4 className="productTitle">{record.get('title')}</h4>
                              </div>
                              <div className="col-md-12">                                               
                                <p className="mb-2">{t('product')}: {record.get('category').get('title')}</p>
                                <p className="mb-2">{t('age')}: {record.get('target').get('title') ? record.get('target').get('title') : t('noInfo')}</p>
                                <p className="mb-2">{t('subject')}: {record.get('subject').get('title') ? record.get('subject').get('title') : t('noInfo')}</p>                
                              </div>
                            </div>
                          </div>
                          {(record.get('images').size > 0 || record.get('videoLink')) && this._renderImages()}
                          {this._renderPrices()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='m-separator'></div>
                  <div className="DescBlock px-4">
                    <p>{record.get('description')}</p>
                  </div>
                  <div className='m-separator'></div>
                </div>
              </div>
              }
            </div>
            <div className="col-lg-4">
              {successSingle && <Sidebar data={similarRecords} title={t('similar')} />}
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
    addToShoppingCart: (id, params = {}) => {
      dispatch(addToShoppingCart(id, params))
    },
    goTo: (url) => {dispatch(push(url))}
  })
)(Details);


export default withRouter(withTranslation("translations")(Details));

