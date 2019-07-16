import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import {Button, FormHelperText} from '@material-ui/core';
import {selectValidateRequest} from '../../../redux/signup/selectors';
import {validate} from '../../../redux/signup/actions';
import {Loader} from "../../../components/ui/Loader";

class SignUp extends Component {

    constructor(props) {
        super(props);                
        this.state = props.data || {};
    }
    
    componentWillReceiveProps(nextProps){
        if (!this.props.validateRequest.get('success') && nextProps.validateRequest.get('success')) {            
            this.props.onDataSaved({
                email: this.state.email,
                password: this.state.password     
            });
        }
    }     
    
    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }
    
    _submit() {        
        this.props.validate(this.state);
    };  

    render() {
        const { validateRequest, t} = this.props;
        const loading = validateRequest.get('loading');
        const errors = validateRequest.get('errors');
                
        return (            
            <div>
                {loading && <Loader />}
                <legend className='mb-3 text-center'>{t('signUp')}</legend>
                <div className='m-form__section'>
                    <div className="form-group row">
                        <label className="col-form-label col-md-3 col-lg-3 col-sm-12">{t('email')} </label>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <input
                                required                    
                                value={this.state.email || ''}
                                name='email'
                                onChange={(e) => { this._handleInputChange(e) }}
                                type='text'
                                className='form-control m-input' />

                            {errors && errors.get('email') && <FormHelperText error>{ errors.get('email').get(0) }</FormHelperText>}                          
                        </div>
                    </div>    
                  <div className="form-group row">
                        <label className="col-form-label col-md-3 col-lg-3 col-sm-12">{t('password')}</label>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <input
                                required                    
                                value={this.state.password || ''}
                                name='password'
                                onChange={(e) => { this._handleInputChange(e) }}
                                type='password'
                                className='form-control m-input' />

                            {errors && errors.get('password') && <FormHelperText error>{ errors.get('password').get(0) }</FormHelperText>}
                        </div>
                    </div>                    
                </div>                    
                <div className="my-4 text-center">                      
                    <Button
                        variant="contained"
                        color="primary"
                        className="ml-2"                        
                        onClick={(e) => { this._submit(e) }}
                    >
                        {t('next')}
                    </Button>
                </div>
                <div className="my-4 text-center">
                   {t('gotAccount')} <NavLink to="/login" className="g-blue">{t('signIn')}</NavLink>
                </div>
            </div>            
        );
    }
}

SignUp = connect(
  (state) => ({
    validateRequest: selectValidateRequest(state)    
  }),
  (dispatch) => ({
    validate: (data) => {dispatch(validate(data))},    
  })
)(SignUp);

export default withTranslation('translations')(SignUp);