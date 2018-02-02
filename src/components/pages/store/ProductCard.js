import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardContent, Typography} from "material-ui";
import {NavLink} from "react-router-dom";
import StarRating from "../../ui/StarRating";
import "../../../styles/store.css"

class ProductCard extends Component {

  _renderCard(type, product) {
    const category = product.get('category') ? product.get('category').get('title') : 'No Info...';
    const price = Number(product.get('price'));

    return (
      <div className={`cardItem ${type === 'vertical' ? ' verticalCardItem' : ' horizontalCardItem'}`}>
        <Card >
          <NavLink to={`/store/details/${product.get('id')}`} className="cardImage">
            <img src={product.get('thumbnail')} className="full-width" alt="book"/>
          </NavLink>
          <CardContent className="cardContent">
            <Typography className="cardTitle" type="headline" component="h2">
              <NavLink to={`/store/details/${product.get('id')}`}>
                {product.get('title')}
              </NavLink>
            </Typography>
            <Typography className="cardDesc" component="p">
              { category }
            </Typography>
            {type === 'horizontal' &&
            <Typography className="cardDesc m--margin-top-5" component="p">
              {(product.get('description').length > 77) ? product.get('description').substring(0, 77) + '...' : product.get('description')}
            </Typography>
            }
            <div className="cardActions m--margin-top-15">
              <NavLink to={`/store/details/${product.get('id')}`}>
                <StarRating score={product.get('score')}/>
              </NavLink>
              <div className="productPrice"><span
                className="discount"><span>{(price / 100 * product.get('discount') + price) + '$'}</span></span><br/>{price + ' $'}
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
