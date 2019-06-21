import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Divider} from '@material-ui/core';
import {Price} from '../../../components/ui/Price';
import HasRole from "../../middlewares/HasRole";
import DiscountCode from './DiscountCode';

class Summary extends Component {

    componentDidMount() {
    }    

    componentWillReceiveProps(nextProps) {
    }

    _renderItems() {
        const {t, data} = this.props;
        const items = data.records;
        
        return items.map((item, key) => (
            <div key={key} className="row mb-2">
                <div className="col-8">
                    <div>
                        <strong>{item.title}</strong>
                    </div>
                    <span className="text-muted">
                        {item.count} {t('items')}
                    </span>
                </div>
                <div className="col-4 text-right">
                    <strong className="text-nowrap d-block"><Price price={item.totalPrice} currency={item.currency} /></strong>
                    {(item.affiliateDiscount > 0) && <span className="text-nowrap m--font-success d-block">- <Price price={item.affiliateDiscount} currency={item.currency} /></span>}
                </div>
            </div>
        ));
    }
  
    render() {
        const {data, t} = this.props;
        return <div className="ml-md-4 mb-5">
            <legend className='m--margin-bottom-10 text-center'>{t('summary')}</legend>
            <div className="card">
                <div className="card-body">                    
                    <div className="my-2 text-center d-sm-none">
                        <h4>{t('invoice')} #{data.invoiceNo}</h4>
                        <Divider className="my-3"/>
                    </div>                                        
                    <legend className='m--margin-bottom-10 text-center'>{t('items')}</legend>
                    {this._renderItems()}
                    <Divider className="my-3"/>
                    <div className="row my-2">
                        <div className="col-8">
                            <strong>{t('subtotal')}</strong>
                        </div>
                        <div className="col-4 text-right">
                            <strong className="text-nowrap"><Price price={data.subTotalPrice} currency={data.currency} /></strong>
                        </div>
                    </div>
                    {data.discountCode &&
                    <div className="row my-2">
                        <div className="col-8">
                            <strong>{t('promocode')}</strong>
                        </div>
                        <div className="col-4 text-right">
                            <strong className="text-nowrap m--font-success">{data.discountCode}</strong>
                        </div>
                    </div>}
                    <div className="row my-2">
                        <div className="col-8">
                            <strong>{t('discount')}</strong>
                        </div>
                        <div className="col-4 text-right">
                            <strong className="text-nowrap {(data.discountAmount > 0) && 'm--font-success'}"><Price price={data.discountAmount} currency={data.currency} /></strong>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-8">
                            <strong>{t('total')}</strong>
                        </div>
                        <div className="col-4 text-right">
                            <strong className="text-nowrap"><Price price={data.totalPrice} currency={data.currency} /></strong>
                        </div>
                    </div>
                    <HasRole roles={['Parents', 'Guest']}>
                        <div>
                            <Divider className="my-3"/>
                            <DiscountCode />
                        </div>
                    </HasRole>
                </div>
            </div>
        </div>;
    }
}

export default withTranslation('translations')(Summary);
