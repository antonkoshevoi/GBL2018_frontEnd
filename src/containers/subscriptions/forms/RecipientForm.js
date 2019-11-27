import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {FormHelperText} from '@material-ui/core';

class RecipientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {}
        };
    }
    
    componentDidMount() {
        const {form} = this.props;
        this.setState({
            form: {
              ...form
            }
        })
    }    

    _handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
          form: {
            ...this.state.form,
            [name]: value
          }
        }, () => { this.props.onChange(this.state.form); });
    }       

    render() {
        const {errors, t} = this.props;
        const {form} = this.state;
        
        return (          
            <div className='m-form__section'>
                <h2 className='mb-3'>{t('sender')}</h2>
                <div className="form-group row">
                    <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('yourName')} </label>
                    <div className="col-lg-4 col-md-4 col-6">
                      <input
                        required                    
                        value={form.firstName || ''}
                        name='firstName'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input'
                        placeholder={t('firstName')}/>
                        {errors && errors.get('firstName') && <FormHelperText error>{ errors.get('firstName').get(0) }</FormHelperText>}                          
                    </div>
                    <div className="col-lg-4 col-md-4 col-6">
                      <input
                        required                    
                        value={form.lastName || ''}
                        name='lastName'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input'
                        placeholder={t('lastName')}/>
                        {errors && errors.get('lastName') && <FormHelperText error>{ errors.get('lastName').get(0) }</FormHelperText>}                          
                    </div>                        
                </div>
                <h2 className='mb-3'>{t('recipient')}</h2>
                <div className="form-group row">
                    <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('recipientName')} </label>
                    <div className="col-lg-4 col-md-4 col-6">
                      <input
                        required                    
                        value={form.recipientFirstName || ''}
                        name='recipientFirstName'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input'
                        placeholder={t('firstName')}/>
                        {errors && errors.get('recipientFirstName') && <FormHelperText error>{ errors.get('recipientFirstName').get(0) }</FormHelperText>}                          
                    </div>
                    <div className="col-lg-4 col-md-4 col-6">
                      <input
                        required                    
                        value={form.recipientLastName || ''}
                        name='recipientLastName'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input'
                        placeholder={t('lastName')}/>
                        {errors && errors.get('recipientLastName') && <FormHelperText error>{ errors.get('recipientLastName').get(0) }</FormHelperText>}                          
                    </div>                        
                </div>
                <div className="form-group row">
                    <label className="col-form-label col-md-4 col-lg-4 col-sm-12">{t('recipientEmail')} </label>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                      <input
                        required                    
                        value={form.recipientEmail || ''}
                        name='recipientEmail'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input'
                        placeholder=''/>
                        {errors && errors.get('recipientEmail') && <FormHelperText error>{ errors.get('recipientEmail').get(0) }</FormHelperText>}                          
                    </div>
                </div>
                <h2 className='mb-3'>{t('message')}</h2>
                <div className="form-group row">
                    <label className="col-form-label col-md-4 col-lg-4 col-sm-12"></label>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                      <textarea      
                        name='message'
                        onChange={(e) => { this._handleInputChange(e) }}
                        type='text'
                        className='form-control m-input'>{form.message || ''}</textarea>
                        {errors && errors.get('message') && <FormHelperText error>{ errors.get('message').get(0) }</FormHelperText>}                          
                    </div>
                </div>                        
            </div>           
        );
    }
}

export default withTranslation('translations')(RecipientForm);