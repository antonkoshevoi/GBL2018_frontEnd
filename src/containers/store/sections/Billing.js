import React, {Component} from 'react';
import {connect} from 'react-redux';
import Address from "./Address";
import {withTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';
import {selectValidateAddressRequest} from "../../../redux/store/selectors";
import {validateAddress} from "../../../redux/store/actions";
import PaymentMethods from './PaymentMethods';
import Loader from "../../../components/layouts/Loader";
import payPalImg from '../../../media/images/payments/paypal.png'
import creditCardImg from '../../../media/images/payments/credit_card.png'
import checkImg from '../../../media/images/payments/check.png'

class Billing extends Component {

    state = {
        address: this.props.data,        
        paymentMethod: null        
    };
    
    componentWillReceiveProps(nextProps){
        if (!this.props.validateAddressRequest.get('success') && nextProps.validateAddressRequest.get('success')) {            
            this.props.onDataSaved(this.state);
        }
    }    

    _handleForm(form) {
        this.setState({
            ...this.state,
            address: {
                ...form
            }
        });
    }
    
    _back() {
        this.props.goBack();
    }    

    _submit = () => {
        if (this.props.validateAddressRequest.get('success')) {
            this.props.validateAddress(this.state.address);
        }
    }
    
    _setPaymentMethod(value) {
        this.setState({
            paymentMethod: value
        });
    }
    
    _renderAddressForm() {
        
        const {validateAddressRequest, t} = this.props;

        const loading   = validateAddressRequest.get('loading');
        const errors    = validateAddressRequest.get('errors');    
        
        return <form action="">
            {loading && <Loader/>}    
            <div className="row">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 m-auto"> 
                    <Address
                        title={t('billing')}
                        onChange={(form) => this._handleForm(form)}
                        name='billingAddress'
                        errors={errors}
                        form={this.state.address}                  
                    />
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Button                                          
                    variant="contained"
                    onClick={() => this._setPaymentMethod(null)}
                    >
                    {t('back')}
                </Button>            
                <Button
                    variant="contained"                    
                    color="primary"
                    className="ml-2"
                    disabled={loading}
                    onClick={this._submit}
                    >
                    {t('nextStep')}
                </Button>
            </div>
        </form>;
    }
    
    render() {  
        const {paymentMethod} = this.state;
        const {t} = this.props;
        
        const paymentMethods = [
            {                
                method: 'payPal',
                img: payPalImg
            },
            {
                method: 'creditCard',
                img: creditCardImg
            },
            {                
                method: 'check',
                img: checkImg
            },
            {                
                method: 'wireTransfer',
                img: checkImg
            },
            {                
                method: 'cog',
                img: checkImg
            }
        ];
    
        if (!paymentMethod) {
            return <div>
                <PaymentMethods onSelect={(value) => this._setPaymentMethod(value) } methods={paymentMethods} />
                <div className="text-center mt-5">
                    <Button                                          
                        variant="contained"
                        onClick={() => {this._back()}}
                        >
                        {t('back')}
                    </Button>
                </div>
            </div>;
        };
        
        return this._renderAddressForm();
    }
}

Billing = connect(
    (state) => ({
        validateAddressRequest: selectValidateAddressRequest(state)        
    }),
    (dispatch) => ({
        validateAddress: (data) => dispatch(validateAddress(data))        
    }),
)(Billing);

export default withTranslation('translations')(Billing);
