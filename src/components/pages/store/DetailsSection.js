import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRating from "../../ui/StarRating";

class DetailsSection extends Component {
    render() {

        const data = this.props.data;
        const category = 'No Info...';
        const price = Number(data.get('price'));

        return (
            <div id="product-details">
                <div className="headerBlock">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="productImage">
                                <img src={data.get('thumbnail')} className="full-width" alt="product"/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex flex-column m--full-height justify-content-between">
                                <div className="productInfo full-width m--padding-20">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4 className="productTitle">{data.get('title')}</h4>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <p className="g-red productType">{category}</p>
                                                </div>
                                                <div className="col-md-5 text-right">
                                                    <div className="align-text-bottom">
                                                        <StarRating score={data.get('score')}/>
                                                        <span className="m--margin-left-5">{data.get('count')} <i className="fa fa-user"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsBtn justify-content-between full-width align-items-end d-flex m--padding-right-20 align-self-end">
                                    <div className="m-widget25 ">
                                        <span className="m-widget25__price m--font-brand">${price}</span>
                                        <span className="m-widget25__desc">
                                            <span className="discount">
                                                <span>{(price/100*data.get('discount') + price) + '$'}</span>
                                            </span>
                                        </span>
                                    </div>
                                    <button className="btn m-btn btn-danger m-btn--icon" onClick={() => {this.props.buyClick(data.get('id'))}}>
                                        <span>
                                            <i className="fa fa-shopping-basket"></i>
                                            <span>Add To Cart</span>
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-12 m--margin-top-15">
                            <iframe className="full-width mainVideo" width={640} height={360} src={data.get('videoLink')}></iframe>
                        </div>
                    </div>
                </div>
                <div className='m-separator m-separator--dashed m-separator--'></div>
                <div className="DescBlock m--padding-20">
                    <p>{data.get('description')}</p>
                </div>
                <div className='m-separator m-separator--dashed'></div>
            </div>
        );
    }
}

DetailsSection.propTypes = {};

export default DetailsSection;
