import React, {Component} from 'react';
import {connect} from 'react-redux';
import Address from "./Address";
import {withTranslation} from 'react-i18next';
import {Button, Checkbox, FormControlLabel} from '@material-ui/core';
import {selectValidateAddressRequest} from "../../../redux/store/selectors";
import {validateAddress} from "../../../redux/store/actions";
import PaymentMethods from './PaymentMethods';
import Loader from "../../../components/layouts/Loader";
import payPalImg from '../../../media/images/payments/paypal.png'
import creditCardImg from '../../../media/images/payments/credit_card.png'
import checkImg from '../../../media/images/payments/check.png'

class Billing extends Component {

    state = {
        shippingAddress: this.props.shippingAddress,
        billingAddress: this.props.billingAddress,
        sameShipping: false,
        paymentMethod: null        
    };
    
    componentWillReceiveProps(nextProps){
        if (!this.props.validateAddressRequest.get('success') && nextProps.validateAddressRequest.get('success')) {            
            this.props.onDataSaved({
                billingAddress: this.state.billingAddress,
                paymentMethod: this.state.paymentMethod     
            });
        }
    }    

    _handleForm(form) {
        this.setState({
            ...this.state,
            billingAddress: {
                ...form
            }
        });
    }
    
    _back() {
        this.props.goBack();
    }    

    _submit = () => {
        if (this.props.validateAddressRequest.get('success')) {
            this.props.validateAddress(this.state.billingAddress);
        }
    }
    
    _setPaymentMethod(value) {
        this.setState({
            paymentMethod: value
        });
    }
    
    _handleSameShipping(event) {
        const {checked} = event.target;
        this.setState({
            ...this.state,
            sameShipping: checked
        });
        if (checked) {
            this.setState({
                billingAddress: this.state.shippingAddress
            });            
        }
    }
    
    _renderAddressForm() {
        
        const {validateAddressRequest, t} = this.props;
        const {sameShipping} = this.state;        

        const loading   = validateAddressRequest.get('loading');
        const errors    = validateAddressRequest.get('errors');
        
        return <form action="">
            {loading && <Loader/>}    
            <div className="row">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 m-auto">
                    <div className="order-2 order-md-1 offset-md-6 col-md-6 col-sm-12">                
                        <FormControlLabel
                          label={t('sameBillingInformation')}
                          control={
                            <Checkbox
                              color="primary"
                              checked={sameShipping}
                              onChange={(e) => this._handleSameShipping(e)}
                            />
                          }
                        />
                    </div>                
                    <Address
                        title={t('billing')}
                        onChange={(form) => this._handleForm(form)}
                        name='billingAddress'
                        disabled={sameShipping}
                        errors={errors}
                        form={this.state.billingAddress}                  
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
