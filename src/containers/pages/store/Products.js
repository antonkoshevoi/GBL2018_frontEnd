import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import products from '../../../data/json/products.json';
import '../../../styles/store.css'

import ProductsSection from "../../../components/pages/store/ProductsSection";
import Filter from "../../../components/pages/store/Filter";
import {withRouter} from "react-router-dom";

class Products extends Component {
    render() {
        return (
            <div className="animated fadeInLeft">
                <div className="m-portlet store-wrapper">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                                <Filter/>
                        </div>
                    </div>

                    <div id="store-body" className="all-products">
                        <ProductsSection title={this.props.match.params.type} all={true} products={products}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(translate("Products")(connect(
    mapStateToProps,
)(Products)));

