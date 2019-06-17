import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import ShoppingCardItems from './sections/ShoppingCardItems';
import DiscountCode from './sections/DiscountCode';

class ShoppingCart extends Component {

    render() {
        const {t} = this.props;
        return (
            <div className='fadeInLeft animated'>
                <DiscountCode />
                <div className="m-portlet m-portlet--full-height">                
                    <div className='m-portlet__head border-b-green'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='fa fa-shopping-cart'></i></span>
                                <h3 className='m-portlet__head-text'>{t('shoppingCart')}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="m-portlet__body">                
                        <ShoppingCardItems />                            
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translations')(ShoppingCart);