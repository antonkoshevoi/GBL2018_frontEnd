import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Card, CardContent, Typography} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import {Price} from "../ui/Price";
import "../../styles/store.css"

class ProductCard extends Component {

  _renderCard(type, product) {
    const category = product.get('category') ? product.get('category').get('title') : 'No Info...';    
    const {t} = this.props;

    return (
      <div className={`cardItem ${type === 'vertical' ? ' verticalCardItem' : ' horizontalCardItem'}`}>
        <Card >
          <NavLink to={`/store/details/${product.get('id')}`} className="cardImage">
            <img src={product.get('thumbnail')} className="full-width" alt="book"/>
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
            <Typography className="cardDesc mt-2" component="p">
              {product.get('description')}
            </Typography>
            }
            <div className="cardActions mt-3">
              <div className="productPrice">
                  {product.get('discount') > 0 && <span className="discount"><span><Price price={product.get('price')} currency={product.get('currency')} /></span></span> }
                  <br/>
                  <div className="price">
                    {(product.get('price') > 0) ? <Price price={product.get('discountPrice')} currency={product.get('currency')} /> : <strong>{t('freeProduct')}</strong>}
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

export default withTranslation('translations')(ProductCard);
