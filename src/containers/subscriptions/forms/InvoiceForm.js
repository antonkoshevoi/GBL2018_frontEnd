import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {Price} from '../../../components/ui/Price';
import {renderToString} from 'react-dom/server'
import {Divider} from '@material-ui/core';

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
            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                <div className='row align-items-center'>                                
                    {invoice &&
                        <div className="col-sm-12">
                            <p className="text-center invoice-title">
                                <Trans i18nKey="translations:yourInvoice">
                                    <span className="m--font-bolder">{{invoiceNo: invoice.get('subscriptionNo')}}</span>
                                    <span className="m--font-bolder">{{invoiceAmount: renderToString(<Price price={invoice.get('price')} currency={invoice.get('currency')} />)}}</span>
                                </Trans>
                            </p>
                            <div>
                                <h3>{t('subscriptionDetails')}</h3>
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
                                    <NavLink className="btn btn-success m--margin-left-10" to="/my-subscriptions">{t('viewMySubscriptions')}</NavLink>
                                    :
                                    <NavLink className="btn btn-success m--margin-left-10" to="/login">{t('login')}</NavLink>
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