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
        <div className="col-sm-12 col-md-10 col-lg-9 col-xl-6 m-auto m-auto">
            <h1 className="text-center my-5 g-metal">{t('youBoughtSubscription')}</h1>
            {invoiceRequest.get('loading') && <Loader/>}
            {invoiceRequest.get('success') && <div className='m-portlet m-portlet--head-solid-bg my-5'>
                <div className='m-portlet__body'>
                    <InvoiceForm data={invoice} />
                </div>
            </div>}
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