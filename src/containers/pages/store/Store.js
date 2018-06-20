import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Target} from '@material-ui/core';
import Filter from "../../../components/pages/store/Filter";
import products from "../../../data/json/products.json";
import ProductsSection from "../../../components/pages/store/ProductsSection";
import {
  selectGetRecordsRequest, selectRecords
} from "../../../redux/store/selectors";
import {withRouter} from "react-router-dom";
import {getCartRecords, getRecords, getSingleRecord} from "../../../redux/store/actions";
import Loader from "../../../components/layouts/Loader";
import StoreSlider from "../../../components/pages/store/StoreSlider";


const sliderData = [
  {
    image:'https://www.swinburne.edu.my/wp-content/uploads/2017/06/sa-short-courses.jpg',
    title:'Save Big With course bundles',
    desc:''
  },
  {
    image:'https://conceptacademies.co.uk/wp-content/uploads/2014/10/6700226_m.jpg',
    title:'BZabc:Buy the entire series!',
    desc:''
  },
  {
    image:'https://az616578.vo.msecnd.net/files/2017/02/26/636237341865706889-619832852_movies.jpg',
    title:'New Movies to Rent',
    desc:''
  }
]

class Store extends Component {


  state = {
    isFiltered: false
  }

  componentDidMount() {
    this._getRecords();
  }


  _getRecords(params) {
    this.props.getRecords(params);
  }

  _setFilters(params) {
    if (params)
      this.setState({isFiltered: true});
    this._getRecords(params)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.key !== this.props.location.key) {
      this.setState({isFiltered: false});
      this._getRecords();
    }
  }


  _renderNotFountMessage() {
    return (
      <div className="notFountMessage">
        <div className="display-1 text-center">
          <i className="la g-red	la-times-circle"></i>
          <h1>Products Not Found</h1>
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
              <Filter isActive={isFiltered} onChange={(fields) => {
                this._setFilters(fields)
              }}/>
            </div>
          </div>
          {(success && !isFiltered) &&
          <div id="store-body">


            <div className="row">
              <div className="col-md-12">
                <StoreSlider data={sliderData}/>
              </div>
            </div>
            <ProductsSection categoryId={1} type="Courses" title="Courses" products={records}/>
            <ProductsSection categoryId={4} type="Books" title="Books" products={records}/>
            <ProductsSection categoryId={3} type="Teaching Ads" title="Teaching Ads" products={records}/>
            <ProductsSection categoryId={6} type="Stationary" title="Stationary" products={records}/>
            <ProductsSection categoryId={5} type="Student Reward" title="Student Reward" products={records}/>
            <ProductsSection categoryId={7} type="Tutoring Service" title="Tutoring Service" products={records}/>
            <ProductsSection categoryId={2} type="Bundles" title="Bundles" products={records}/>
          </div>
          }
          {isFiltered &&
          <div id="store-body">
            <ProductsSection type="newest" title="" all={true} products={records}/>
          </div>
          }

          {(records.size === 0 && success) && this._renderNotFountMessage()}
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
    getRecords: (params = {perPage: '50'}) => {
      dispatch(getRecords(params))
    },
  })
)(Store);


export default withRouter(translate("Store")(Store));
