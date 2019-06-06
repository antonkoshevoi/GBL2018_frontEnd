import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import ShoppingCardItems from '../../store/sections/ShoppingCardItems';

class ShoppingCart extends Component {

    render() {
        const {t} = this.props;
        
        return (
            <div>                
                <div className='block-header border-b-green'>                                                      
                    <h3 className='m-portlet__head-text'>{t('shoppingCart')}</h3>
                </div>          
                <div className="m-portlet m-portlet--full-heigh">
                    <div className="m-portlet__body dashboard-shopping-cart-body">                                                              
                        <ShoppingCardItems preview={true} />                        
                    </div>
                </div>
            </div>
        );        
    }
}

export default withTranslation('translations')(ShoppingCart);