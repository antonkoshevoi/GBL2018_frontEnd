import React, {Component} from 'react';
import {connect} from 'react-redux';
import Address from "./Address";
import {withTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';
import {selectValidateAddressRequest} from "../../../redux/store/selectors";
import {validateAddress, resetValidateAddressRequest} from "../../../redux/store/actions";
import {Loader} from "../../../components/ui/Loader";

class Shipping extends Component {

    state = {
        address: this.props.data       
    };
    
    componentWillReceiveProps(nextProps){
        if (!this.props.validateAddressRequest.get('success') && nextProps.validateAddressRequest.get('success')) {
            this.props.onDataSaved(this.state.address);
            this.props.resetValidateAddressRequest();
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

    _submit = () => {
        this.props.validateAddress(this.state.address);
    }
    
    render() {        
        const {validateAddressRequest, t} = this.props;

        const loading   = validateAddressRequest.get('loading');
        const errors    = validateAddressRequest.get('errors');
        
        return (
            <form action="">
                {loading && <Loader/>}    
                <div className="text-center">
                        <Address
                            title={t('shipping')}
                            onChange={(form) => this._handleForm(form)}
                            name='shippingAddress'
                            errors={errors}
                            form={this.state.address}                  
                        />
                </div>
                <div className="text-center">
                    <Button
                        variant="contained"
                        color="primary"    
                        onClick={this._submit}
                        >
                        {t('nextStep')}
                    </Button>
                </div>
            </form>
        );
    }
}

Shipping = connect(
    (state) => ({
        validateAddressRequest: selectValidateAddressRequest(state)        
    }),
    (dispatch) => ({
        validateAddress: (data) => dispatch(validateAddress(data)),
        resetValidateAddressRequest: () => dispatch(resetValidateAddressRequest())        
    }),
)(Shipping);

export default withTranslation('translations')(Shipping);
