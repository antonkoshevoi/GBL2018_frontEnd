import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductCard from "./ProductCard";
import {NavLink} from "react-router-dom";

class Sidebar extends Component {

  _renderProducts(products) {
    if (products.size === 0) {
      return this._renderEmptyMsg()
    }
    return products.map(function (item, i) {
      return <ProductCard key={i} data={item} type="horizontal"/>
    })
  }

  _renderEmptyMsg() {
    return (
      <div className='text-center'>
        <h5 className="m--margin-left-15 m--margin-top-15"> Products Not Found... </h5>
      </div>
    )
  }

  render() {
    const {title, data, dataType} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6 m--padding-left-10">
            <h3 className="sidebarTitle">{title}</h3>
          </div>
          <div className="col-md-6 text-right m--padding-right-10 m--hide">
            <NavLink to={`/store/products/courses/${dataType}`} className="btn no-border m-btn btn-sm btn-danger">More</NavLink>
          </div>
        </div>
        <div>
          {this._renderProducts(data)}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  title: PropTypes.string,
};

export default Sidebar;
