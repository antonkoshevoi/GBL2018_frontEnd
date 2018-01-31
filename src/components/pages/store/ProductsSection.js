import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardContent, CardMedia, Typography} from "material-ui";
import StarRating from "../../ui/StarRating";
import {NavLink} from "react-router-dom";
import ProductCard from "./ProductCard";

class ProductsSection extends Component {


  _renderProducts(products) {
    const {all} = this.props;

    return products.map(function (item, i) {
      return (
        (!all) ?
          <ProductCard key={i} type="vertical" data={item}/> :
          (<div key={i} className="">
            <ProductCard type="vertical" data={item}/>
          </div>)

      )
    })
  }


  render() {
    const {products, title, type, all} = this.props;

    return (
      <section className="productSection">
        <div className="row">
          <div className="col-md-12">
            <div className="row sectionTopBar">
              <div className="col-md-6">
                <h2>{title}</h2>
              </div>
              <div className="col-md-6 text-right">
                {!all && <NavLink to={`/store/products/courses/${type}`} params={{type: 'sad'}}
                                  className="btn m-btn btn-sm btn-danger">ALL</NavLink> }
              </div>
            </div>
            <div className="row">
              {this._renderProducts(products)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ProductsSection.propTypes = {};

ProductsSection.defaultProps = {
  all: false
}

export default ProductsSection;
