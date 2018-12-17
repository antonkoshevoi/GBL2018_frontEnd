import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {NavLink} from 'react-router-dom';

class InvoiceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoice: props.data
        };
    }
  
    render() {
        const invoice = this.state.invoice;
        const {t, auth} = this.props;
        return (
            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>                                
                <div className='row align-items-center'>                                
                    {invoice &&
                        <div className="col-sm-12">
                            <p className="text-center invoice-title">
                                {t('yourInvoice', {invoiceNo: invoice.get('subscriptionNo'), invoiceAmount: ('$' + invoice.get('price'))})}.
                            </p>
                            <p>
                                <h3>{t('subscriptionDetails')}</h3>
                                <div>
                                    <label>{t('name')}:</label> <strong>{invoice.get('title')}</strong>
                                </div>
                                <div>
                                    <label>{t('price')}:</label> <strong>${invoice.get('price')} / {t(invoice.get('period'))}</strong>
                                </div>
                                <div>
                                    <label>{t('allowedCourses')}:</label> <strong>{invoice.get('allowedCourses')} x {invoice.get('allowedStudents')}</strong>
                                </div>
                                {(invoice.get('period') === 'year') && 
                                    <div>
                                        <label>{t('annualBonus')}:</label> <strong>{invoice.get('bonuses')}</strong>
                                    </div>
                                }
                            </p>                                            
                            <p className="text-center">
                                <a className="btn btn-success" href={invoice.get('invoiceUrl')} target="_blank" rel="noopener noreferrer">{t('downloadPdf')}</a>                                                
                                {auth.get('isLoggedIn') ?
                                    <NavLink className="btn btn-success m--margin-left-10" to="/my-subscriptions">{t('viewMySubscriptions')}</NavLink>
                                    :
                                    <NavLink className="btn btn-success m--margin-left-10" to="/login">{t('login')}</NavLink>
                                }
                            </p>
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

export default translate('translations')(InvoiceForm);