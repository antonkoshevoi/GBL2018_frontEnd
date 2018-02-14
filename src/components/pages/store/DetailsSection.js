import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StarRating from "../../ui/StarRating";
import {Icon} from "material-ui";

class DetailsSection extends Component {

  _renderCategories(categories){
    return categories.map((item,i)=>{
      return (
        <span>
          {item.title}
          {categories.length !== i + 1 && <span>/</span>}
          </span>
      )
    })
  }

  render() {
    const {data, addedRequest} = this.props;
    const category = 'No Info...';
    const price = Number(data.get('price'));
    const discountPrice = Number(price - (price * data.get('discount') / 100));

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
                          <p className="g-red productType  m--hide">{category}</p>
                          <p className="m--margin-bottom-5">Product: {data.get('category').get('title')}</p>
                          <p className="m--margin-bottom-5">Age: {data.get('target').get('title') ? data.get('target').get('title') : 'No Info...'}</p>
                          <p className="m--margin-bottom-5">Subject: {data.get('subject').get('title') ? data.get('subject').get('title') : 'No Info...'}</p>
                        </div>
                        <div className="col-md-5 text-right">
                          <div className="align-text-bottom">
                            <StarRating score={data.get('score') || 4}/>
                            <span className="m--margin-left-5">{data.get('count') || 54} <Icon fontSize={true} style={{fontSize:17, color:'#737373', transform: 'translateY(3px)'}}>person</Icon></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="actionsBtn justify-content-end full-width align-items-end d-flex m--padding-right-20 align-self-end">

                  <button className="btn m-btn btn-danger m-btn--icon no-border" onClick={() => {
                    this.props.buyClick(data.get('id'))
                  }}>
                                        <span>
                                          {addedRequest.get('success') &&
                                          <i className="fa floating-basket fa-shopping-basket"></i>}
                                          <span className="discount"><span>${price.toFixed(2)}  </span></span>
                                          <span>${discountPrice.toFixed(2)}</span>
                                            <span>BUY</span>
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
