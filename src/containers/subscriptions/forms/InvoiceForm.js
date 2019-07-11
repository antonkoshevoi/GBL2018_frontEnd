import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {Divider} from '@material-ui/core';
import {Price} from '../../../components/ui/Price';
import {InvoiceNo} from '../../../components/ui/InvoiceNo';

class InvoiceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoice: props.data
        };
    }
  
    render() {
        const invoice       = this.state.invoice;
        const {t, auth}     = this.props;
               
        return (
            <div className='mx-5 my-4'>
                <div className='row'>                                
                    {invoice &&
                        <div className="col-sm-12">
                            <InvoiceNo number={invoice.get('subscriptionNo')} amount={invoice.get('price')} currency={invoice.get('currency')} />                                 
                            <div>
                                <h4 className="text-center">{t('subscriptionDetails')}</h4>
                                <div className="my-3">
                                    <div>
                                        <label>{t('name')}:</label> <strong>{t(invoice.get('title'))}</strong>
                                    </div>
                                    <div>
                                        <label>{t('allowedCourses')}:</label> <strong>{invoice.get('allowedCourses')} x {invoice.get('allowedStudents')}</strong>
                                    </div>
                                    {(invoice.get('period') === 'year') && 
                                        <div>
                                            <label>{t('annualBonus')}:</label> <strong>{invoice.get('allowedStudents') > 1 ? t('freeWorkbooks', {number: invoice.get('allowedStudents')}) : t('freeWorkbook')}</strong>
                                        </div>
                                    }
                                </div>
                                <Divider />
                                {(invoice.get('discount') > 0) ?
                                <div className="my-3">
                                    <div>
                                        <label>{t('price')}:</label> <strong><Price price={invoice.get('subTotal')} currency={invoice.get('currency')} /> </strong>
                                    </div>                                
                                    <div>
                                        <label>{t('promocode')}:</label> <strong>{invoice.get('discountCode')}</strong>
                                    </div>
                                    <div>
                                        <label>{t('discount')}:</label> <strong><Price price={invoice.get('discount')} currency={invoice.get('currency')} /> </strong>
                                    </div>
                                    <div>
                                        <label>{t('total')}:</label> <strong><Price price={invoice.get('totalPrice')} currency={invoice.get('currency')} /> / {t(invoice.get('period'))}</strong>
                                    </div>
                                </div> : <div className="my-3">
                                    <label>{t('price')}:</label> <strong><Price price={invoice.get('totalPrice')} currency={invoice.get('currency')} /> / {t(invoice.get('period'))}</strong>
                                </div>}
                            </div>                                            
                            <div className="text-center">
                                <a className="btn btn-success" href={invoice.get('invoiceUrl')} target="_blank" rel="noopener noreferrer">{t('downloadPdf')}</a>
                                {auth.get('isLoggedIn') ?
                                    <NavLink className="btn btn-success ml-3" to="/my-subscriptions">{t('viewMySubscriptions')}</NavLink>
                                    :
                                    <NavLink className="btn btn-success ml-3" to="/login">{t('login')}</NavLink>
                                }
                            </div>
                        </div>
                    }                                   
                </div>
            </div>
        );
    }
}

InvoiceForm = connect(
    (state) => ({
        auth: state.auth
    }),
    () => ({})
)(InvoiceForm);

export default withTranslation('translations')(InvoiceForm);