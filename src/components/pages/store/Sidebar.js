import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductCard from "./ProductCard";
import {NavLink} from "react-router-dom";

class Sidebar extends Component {

    _renderProducts(products) {
        return products.map(function (item,i) {
            return <ProductCard key={i} data={item} type="horizontal"/>
        })
    }

    render() {
        const {title,data,productType} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 m--padding-left-10">
                        <h3 className="sidebarTitle">{title}</h3>
                    </div>
                    <div className="col-md-6 text-right m--padding-right-10">
                        <NavLink to="/store/products" params={{type:productType}} className="btn m-btn btn-sm btn-danger">All</NavLink>
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
    data:PropTypes.array.isRequired,
    title:PropTypes.string,
};

export default Sidebar;
