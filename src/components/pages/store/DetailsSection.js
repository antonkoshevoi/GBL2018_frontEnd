import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRating from "../../ui/StarRating";

class DetailsSection extends Component {
    render() {

        const {id,image,title,desc,price,score,type,video,total_vote} = this.props.data;


        return (
            <div id="product-details">
                <div className="headerBlock">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="productImage">
                                <img src={image} className="full-width" alt="product"/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="d-flex flex-column m--full-height justify-content-between">
                                <div className="productInfo full-width m--padding-20">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4 className="productTitle">{title}</h4>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <p className="g-red productType">{type}</p>
                                                </div>
                                                <div className="col-md-5 text-right">
                                                    <div className="align-text-bottom">
                                                        <StarRating score={score}/>
                                                        <span className="m--margin-left-5">{total_vote} <i className="fa fa-user"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="actionsBtn justify-content-between full-width align-items-end d-flex m--padding-right-20 align-self-end">
                                    <div className="m-widget25 ">
                                        <span className="m-widget25__price m--font-brand">{parseInt(price).toFixed(2) }</span>
                                        <span className="m-widget25__desc">$</span>
                                    </div>
                                    <button className="btn m-btn btn-danger m-btn--icon" onClick={() => {this.props.buyClick(id)}}>
                                        <span>
                                            <i className="fa fa-shopping-basket"></i>
                                            <span>Add To Cart</span>
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-12 m--margin-top-15">
                            <iframe className="full-width mainVideo" width={640} height={360} src={video}></iframe>
                        </div>
                    </div>
                </div>
                <div className='m-separator m-separator--dashed m-separator--'></div>
                <div className="DescBlock m--padding-20">
                    <p>{desc}</p>
                </div>
                <div className='m-separator m-separator--dashed'></div>
            </div>
        );
    }
}

DetailsSection.propTypes = {};

export default DetailsSection;
