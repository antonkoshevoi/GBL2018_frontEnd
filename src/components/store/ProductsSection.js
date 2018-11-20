import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ProductCard from "./ProductCard";

class ProductsSection extends Component {

    _renderProducts(products, categoryId) {
        const {all} = this.props;

        if (products.size === 0) {
            return this._renderEmptyMsg()
        }

        return products.map(function (item, i) {
            return (
                (!all) ?
                <ProductCard key={i} type="vertical" data={item}/> :
                (
                    <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <ProductCard  type="vertical" data={item}/>
                    </div>
                )
            )
        })
    }

    _renderEmptyMsg() {
        return (
            <div className='text-center'>
                <h5 className='m--margin-left-15'> Products Not Found... </h5>
            </div>
        )
    }

    _renderView() {
        let {products, title, type, all, categoryId} = this.props;

        if (categoryId) {
            products = products.filter(item => item.get('category').get('id') === categoryId).slice(0, 9);
        }

        return (
            <section className="productSection">
                <div className={'row ' + (products.size === 0 && 'm--hide')}>
                    <div className="container" style={{minWidth:products.size === 0 ? '50%' : 0}}>
                        <div className="row sectionTopBar">
                            <div className="col-md-6">
                                <h3>{title}</h3>
                            </div>
                            <div className="col-md-6 text-right">
                                {(!all && products.size >= 9) && <NavLink to={`/store/products/courses/${type}`} className="btn m-btn no-border btn-sm btn-danger">More</NavLink>}
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

    render() {
        return this._renderView();
    }
}

ProductsSection.propTypes = {};

ProductsSection.defaultProps = {
    all: false,
    categoryId: null
}

export default ProductsSection;
