import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {selectGetRecordsRequest, selectRecords} from "../../../redux/store/selectors";
import {getRecords} from "../../../redux/store/actions";
import ProductCard from "../../../components/store/ProductCard";
import Slider from "react-slick";

class SplashSlider extends PureComponent {

    componentDidMount() {
        this.props.getRecords()
    }

    _renderSlideItems(records) {
        return records.map((item, i) => {
            return (
                <div key={i}>
                    <ProductCard type="vertical" data={item}/>
                </div>);
            });
        }

    _renderSlider() {
        const {records, t} = this.props;
        
        if (records.size === 0 ) {
            return <div className='text-center'>
                <h4 className='m--margin-60'>{t('productsNotFound')}</h4>
            </div>;
        }
    
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            slidesToScroll: 5,            
            slidesToShow: 5,
            speed: 500,
            adaptiveHeight: true,
            swipeToSlide: true,
            beforeChange: function () {
                [...document.querySelectorAll('.slick-slide')].map((item, i) => {                     
                     item.classList.remove('slick-slide-previous');
                     return true;
                });
            },            
            afterChange: function () {
                let current = document.querySelector('.slick-center.slick-current');   
                current.previousSibling.classList.add('slick-slide-previous');
                current.nextElementSibling.classList.add('slick-slide-previous');
            },
            onReInit: function () {
                let current = document.querySelector('.slick-center.slick-current');
                current.previousSibling.classList.add('slick-slide-previous');
                current.nextElementSibling.classList.add('slick-slide-previous');
            },
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        fade: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Slider {...settings}>
                {this._renderSlideItems(records)}
            </Slider>
        );
    }        
    
    render() {
        const {t, getRecordsRequest} = this.props;
        return (
            <div className="splash-store">                
                <h2 className="text-center m--margin-bottom-25">{t('bookstore')}</h2>
                <section className="productSection">     
                    <div className="storeSlider m--margin-30">
                        {getRecordsRequest.get('success') && this._renderSlider() }
                    </div>                
                </section>
            </div>
        )
    }
}

SplashSlider = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state),
    records: selectRecords(state),
  }),
  (dispatch) => ({
    getRecords: (params = {perPage: '50', filter: {category: 1}}) => {
        dispatch(getRecords(params))
    }
  })
)(SplashSlider);

export default SplashSlider


