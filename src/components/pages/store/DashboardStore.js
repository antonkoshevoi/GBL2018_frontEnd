import React, {Component} from 'react';
import ProductCard from "./ProductCard";
import "../../../styles/store.css"
import Card from "../../ui/Card";
import Slider from "react-slick";
import {getRecords} from "../../../redux/store/actions";
import {selectGetRecordsRequest, selectRecords} from "../../../redux/store/selectors";
import {connect} from 'react-redux';
import {Grid} from "material-ui";

class DashboardStore extends Component {

  state = {
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 3000,
      // responsive: [{
      //   breakpoint: 1024,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 2
      //   }
      // }]
    }
  }

  _renderCards(data) {
    return data.map(function (item, i) {
      return (
        <Grid item xs={4} lg={4} sm={6} key={i}>
          <ProductCard key={i} data={item}/>
        </Grid>
      )
    })
  }

  componentDidMount() {
    const { getRecords } = this.props;

    getRecords();
  }

  componentDidUpdate() {
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    const {data} = this.props

    return (
      <Card className="cartItems m-o-hidden" title="Store" icon="fa fa-shopping-cart">
        <div className="m-widget25">
          <span className="m-widget25__price m--font-brand">{data.size}</span>
          <span className="m-widget25__desc">Total Products</span>
        </div>
        <div className="row">
          {/*<Slider {...this.state.settings}>*/}
            <Grid container spacing={24}>
              {this._renderCards(data)}
            </Grid>
          {/*</Slider>*/}
        </div>
      </Card>
    );
  }
}

DashboardStore = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    data: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {filter: {type: 'parent'}}) => {
      dispatch(getRecords(params))
    },
  })
)(DashboardStore);

export default DashboardStore;
