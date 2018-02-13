import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";


class StoreSlider extends Component {

  _renderSlideItems(){
    const {data} = this.props;

    return data.map((item,i)=>{
       return (
         <div key={i}>

           <div className="sliderItem" style={{backgroundImage:'url('+ item.image +')'}}>
             <h4 className="slideTitle">{item.title}</h4>
             <p>{item.desc}</p>
           </div>
         </div>
       )
    })
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [{
        breakpoint: 1246,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    };
    return (
      <div className="storeSlider m--margin-bottom-30">
        <Slider {...settings}>
          {this._renderSlideItems()}
        </Slider>
      </div>
    );
  }
}

StoreSlider.propTypes = {
  data:PropTypes.array.isRequired
};

StoreSlider.defaultProps = {
  data:[]
};

export default StoreSlider;
