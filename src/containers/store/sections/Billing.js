import React, {Component} from 'react';
import {connect} from 'react-redux';
import Address from "./Address";
import {withTranslation} from 'react-i18next';
import {Button, Checkbox, FormControlLabel} from '@material-ui/core';
import {selectValidateAddressRequest} from "../../../redux/store/selectors";
import {validateAddress} from "../../../redux/store/actions";
import PaymentMethods from './PaymentMethods';
import Loader from "../../../components/layouts/Loader";

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
        this.props.validateAddress(this.state.billingAddress);
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
            <div>
                <div className="d-flex justify-content-center">                
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
            <div className="text-center">
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
        
        if (!paymentMethod) {
            return <div>
                <PaymentMethods onSelect={(value) => this._setPaymentMethod(value) } />
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
