import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {getInvoice} from '../../redux/subscriptions/actions';
import {selectGetInvoiceRequest} from '../../redux/subscriptions/selectors';
import Loader from "../../components/layouts/Loader";
import InvoiceForm from "./forms/InvoiceForm";

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
            <h1 className="text-center m--margin-top-50 g-metal">{t('youBoughtSubscription')}</h1>                
            <div className="col-sm-12 col-md-10 col-lg-9 col-xl-8 m-auto">
                <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
                    <div className='m-portlet__body'>
                        {invoiceRequest.get('loading') ? <Loader/> : <InvoiceForm data={invoice} />}                                    
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

export default withRouter(withTranslation('translations')(Subscribed));