import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Target} from "material-ui";
import Filter from "../../../components/pages/store/Filter";
import products from "../../../data/json/products.json";
import ProductsSection from "../../../components/pages/store/ProductsSection";


class Store extends Component {



    render() {
        return (
            <div className="animated fadeInLeft">
                <div className="m-portlet store-wrapper">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">

                               <Filter/>

                        </div>
                    </div>

                    <div id="store-body">
                        <ProductsSection type="newest" title="Newest" products={products.slice(0,9)}/>
                        <ProductsSection type="popular" title="Most Popular" products={products.slice(0,9)}/>
                        <ProductsSection type="top" title="Top Rating" products={products.slice(0,9)}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("Store")(connect(
    mapStateToProps,
)(Store));

