import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import DetailsSection from "../../../components/pages/store/DetailsSection";
import CommentsSection from "../../../components/pages/store/CommentsSection";
import {withRouter} from "react-router-dom";
import "../../../styles/store.css"
import products from "../../../data/json/products.json";
import Filter from "../../../components/pages/store/Filter";
import Sidebar from "../../../components/pages/store/Sidebar";


class Details extends Component {

    _getProductById(id) {
        return products.filter(item =>  item.id == id)[0]
    }

    render() {
        const productID = this.props.match.params.id;
        return (
            <div className="m-portlet store-wrapper fadeInLeft animated">
                <div className="m-portlet__head m--margin-bottom-30">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <Filter/>
                        </div>
                    </div>
                </div>
                <div className="container" id="productDetails">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="m-portlet">
                            <DetailsSection data={this._getProductById(productID)}/>
                            <CommentsSection/>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Sidebar data={products} title="Recent" dataType="recent"/>
                    </div>
                </div>
            </div>

            </div>

        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default withRouter(translate("Details")(connect(
    mapStateToProps,
)(Details)));

