import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {withRouter, NavLink} from 'react-router-dom';
import {getInvoice} from '../../redux/subscriptions/actions';
import {selectGetInvoiceRequest} from '../../redux/subscriptions/selectors';
import Loader from "../../components/layouts/Loader";

class Subscribed extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const subscriptionId = this.props.match.params.id;
        this.props.getInvoice(subscriptionId);
    }
  
  render() {
    const {invoiceRequest, t} = this.props;
    const invoice = invoiceRequest.get('record');    
    return (
        <div className='fadeInLeft animated'>
            <h1 className="text-center m--margin-top-25 g-metal">{t('youBoughtSubscription')}</h1>                
            <div className="col-sm-12 col-md-10 col-lg-9 col-xl-8 m-auto">
                <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
                    <div className='m-portlet__body'>
                        <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>                                
                            <div className='row align-items-center'>
                                {invoiceRequest.get('loading') && <Loader/>}

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
                                            <label>{t('allowedCourses')}:</label> <strong>{invoice.get('allowedCourses')}</strong>
                                            </div>
                                            {(invoice.get('period') === 'year') && 
                                                <div>
                                                    <label>{t('annualBonus')}:</label> <strong>{invoice.get('bonuses')}</strong>
                                                </div>
                                            }
                                        </p>                                            
                                        <p className="text-center">
                                            <a className="btn btn-success" href={invoice.get('invoiceUrl')} target="_blank" rel="noopener noreferrer">{t('downloadPdf')}</a>                                                
                                            <NavLink className="btn btn-success m--margin-left-10" to="/my-subscriptions">{t('viewMySubscriptions')}</NavLink>
                                        </p>
                                    </div>
                                }                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Subscribed = connect(
  (state) => ({
    invoiceRequest: selectGetInvoiceRequest(state)
  }),
  (dispatch) => ({
    getInvoice: (id) => dispatch(getInvoice(id))    
  })
)(Subscribed);

export default withRouter(translate('translations')(Subscribed));