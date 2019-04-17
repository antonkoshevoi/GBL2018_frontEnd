import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {Price} from "../ui/Price";
import StarRating from "../ui/StarRating";
import "../../styles/store.css"

class ProductCard extends Component {

  _renderCard(type, product) {
    const category = product.get('category') ? product.get('category').get('title') : 'No Info...';
    const price = Number(product.get('price'));
    const discountPrice = Number(price - (price * product.get('discount') / 100));

    let productThumb = product.get('thumbnail').replace(/^http:\/\//i, 'https://');

    return (
      <div className={`cardItem ${type === 'vertical' ? ' verticalCardItem' : ' horizontalCardItem'}`}>
        <Card >
          <NavLink to={`/store/details/${product.get('id')}`} className="cardImage">
            <img src={productThumb} className="full-width" alt="book"/>
          </NavLink>
          <CardContent className="cardContent">
            <Typography className="cardTitle" variant="h2" component="h2">
              <NavLink to={`/store/details/${product.get('id')}`}>
                {product.get('title')}
              </NavLink>
            </Typography>
            <Typography className="cardDesc" component="p">
              { category }
            </Typography>
            {type === 'horizontal' &&
            <Typography className="cardDesc m--margin-top-5" component="p">
              {product.get('description')}
            </Typography>
            }
            <div className="cardActions m--margin-top-15">              
              <StarRating score={product.get('score')}/>              
              <div className="productPrice">
                  {product.get('discount') > 0 && <span className="discount"><span><Price price={price} currency={product.get('currency')} /></span></span> }
                  <br/>
                  <div className="price">
                    <Price price={discountPrice} currency={product.get('currency')} />                    
                  </div>
              </div>
            </div>
          </CardContent>

        </Card>
      </div>
    )
  }

  render() {
    const {type, data} = this.props;
    return (
      this._renderCard(type, data)
    );
  }
}


ProductCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string
};

ProductCard.defaultProps = {
  type: 'vertical'
}

export default ProductCard;
