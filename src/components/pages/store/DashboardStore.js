import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductCard from "./ProductCard";
import "../../../styles/store.css"
import Card from "../../ui/Card";
import Slider from "react-slick";

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
             responsive: [{
                 breakpoint: 1024,
                 settings: {
                     slidesToShow: 2,
                     slidesToScroll: 2
                 }
             }]
        }
    }


    _renderCards(data) {
        return data.map(function (item,i) {
            return  (
                    <div className="col-sm-3 col-lg-4 col-xl-3">
                        <ProductCard key={i} data={item}/>
                    </div>
                )
        })
    }

    componentDidUpdate() {
        window.dispatchEvent(new Event('resize'));
    }
    render() {

        const {data} = this.props

        return (
           <Card className="cartItems m-o-hidden"  title="Store" icon="fa fa-shopping-cart">
               <div className="m-widget25">
                   <span className="m-widget25__price m--font-brand">54</span>
                   <span className="m-widget25__desc">Total Products</span>
               </div>
               <div className="row">
                   <Slider {...this.state.settings}>
                       {this._renderCards(data)}
                   </Slider>

               </div>
           </Card>

        );
    }
}

DashboardStore.propTypes = {
    data:PropTypes.array.isRequired
};

DashboardStore.defaultProps = {
    data:[]
}

export default DashboardStore;
