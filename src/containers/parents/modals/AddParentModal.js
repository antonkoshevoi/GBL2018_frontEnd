import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {
  AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider
} from '@material-ui/core';
import { sentStudentRequest, resetStudentRequest, create, resetCreateRequest } from "../../../redux/parents/actions";
import { selectStudentStatusRequest, selectCreateRequest } from "../../../redux/parents/selectors";
import Modal from "../../../components/ui/Modal";

class AddParentModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {}
        }
    }    
    
    componentWillUnmount() {
        this.props.resetStudentRequest();
        this.props.resetCreateParentRequest();
    }    
  
    componentWillReceiveProps(nextProps) {        
        const {studentStatusRequest, createParentRequest } = this.props;
        
        if (!studentStatusRequest.get('success') && nextProps.studentStatusRequest.get('success')) {
            this._close();
            this.props.onSuccess();
        }
               
        if (!createParentRequest.get('success') && nextProps.createParentRequest.get('success')) {
            this._close();
            this.props.onSuccess();
        }      
    }
   
    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            form: {
                ...this.state.form,
                [name]: value      
            }
        });
    }
    
    _sendRequest() {
        this.props.sentStudentRequest({
            parentUsername: this.state.form.parentUsername
        });
    }
    
    _close() {
        this.props.onClose();
        this.props.resetCreateParentRequest();
        this.props.resetStudentRequest();
        this.setState({form: {}});
    }  
    
    _createParent() {
        this.props.createParent(this.state.form);
    }
        
    _renderRequestForm()
    {
        const {studentStatusRequest, createParentRequest, t} = this.props;
        const {form}        = this.state;
        const loading       = studentStatusRequest.get('loading') || createParentRequest.get('loading');        
        const errors        = studentStatusRequest.get('errors');
        const formErrors    = createParentRequest.get('errors');
        
        return (             
            <div className='m-auto' style={{maxWidth: 900}}>
                <h5 className="m--margin-bottom-20">{t('linkToParent')}</h5>
                <div className="m-form">
                    <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3" htmlFor="parentUsername">{t('enterParentUsernameOrEmail')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="parentUsername"
                                onChange={(e) => { this._handleInputChange(e) }}
                                value={form.parentUsername || ''}
                                className="form-control m-input--air form-control-success m-input"
                                id="firsName"/>
                            {errors && errors.get('parentUsername') && <div className="form-control-feedback text-center error">{errors.get('parentUsername').get(0)}</div>}
                        </div>
                        <div className="col-lg-3">
                            <input
                                type="button"                                                
                                value={t('sendRequest')}
                                onClick={() => { this._sendRequest() }}
                                className="btn btn-success"
                                disabled={loading}
                                />                      
                        </div>                    
                    </div>
                </div>
                <Divider className="m--margin-top-20 m--margin-bottom-20" />
                <h5>{t('createParentAccount')}</h5>
                <div className="m-form m--margin-top-20">
                    <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3" htmlFor="email">{t('email')} <span className="text-danger">*</span></label>
                        <div className="col-lg-6">
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => { this._handleInputChange(e)}}
                                value={form.email || ''}
                                className="form-control m-input--air form-control-success m-input"
                                id="email"/>
                            {formErrors && formErrors.get('email') && <div className="form-control-feedback text-center error">{formErrors.get('email').get(0)}</div>}
                        </div>
                    </div>  
                    <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3" htmlFor="password">{t('password')} <span className="text-danger">*</span></label>
                        <div className="col-lg-6">
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => { this._handleInputChange(e)}}
                                value={form.password || ''}
                                className="form-control m-input--air form-control-success m-input"
                                id="password"/>
                            {formErrors && formErrors.get('password') && <div className="form-control-feedback text-center error">{formErrors.get('password').get(0)}</div>}
                        </div>
                    </div>
                    <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3" htmlFor="username">{t('username')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="username"
                                onChange={(e) => { this._handleInputChange(e)}}
                                value={form.username || ''}
                                className="form-control m-input--air form-control-success m-input"
                                id="username"/>
                            {formErrors && formErrors.get('username') && <div className="form-control-feedback text-center error">{formErrors.get('username').get(0)}</div>}
                        </div>
                    </div>                                    
                    <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3" htmlFor="firsName">{t('firstName')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="firstName"
                                onChange={(e) => { this._handleInputChange(e) }}
                                value={form.firstName || ''}
                                className="form-control m-input--air form-control-success m-input"
                                id="firsName"/>
                            {formErrors && formErrors.get('firstName') && <div className="form-control-feedback text-center error">{formErrors.get('firstName').get(0)}</div>}
                        </div>
                    </div>
                    <div className="form-group m-form__group row">
                        <label className="col-form-label col-lg-3" htmlFor="lastName">{t('lastName')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="lastName"
                                onChange={(e) => { this._handleInputChange(e) }}
                                value={form.lastName || ''}
                                className="form-control m-input--air form-control-success m-input"
                                id="lastName"/>
                            {formErrors && formErrors.get('lastName') && <div className="form-control-feedback text-center error">{formErrors.get('lastName').get(0)}</div>}
                        </div>
                    </div>
                    <div className="form-group m-form__group row">
                        <div className="col-lg-12 text-center">
                            <input
                                type="button"                                                
                                value={t('register')}
                                onClick={() => { this._createParent() }}
                                className="btn btn-success m--margin-right-10"
                                disabled={loading} />
                            <input
                                type="button"                                                
                                value={t('cancel')}
                                onClick={() => { this._close() }}
                                className="btn btn-default"
                                disabled={loading} />                      
                        </div>                        
                    </div> 
                </div>
            </div>);
    }    
    
    render() {
        const {studentStatusRequest, createParentRequest, t, isOpen} = this.props;
        const loading = studentStatusRequest.get('loading') || createParentRequest.get('loading');
        return (
            <Modal bigger={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        {loading ? <CircularProgress className="m--margin-right-15" color="inherit"/> : <Icon className="m--margin-right-15">person</Icon>}                
                        <Typography type="title" color="inherit" >
                            {t('addParent')}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">
                    { this._renderRequestForm() }
                </DialogContent>
            </Modal>
        );
    }
}

AddParentModal = connect(
    (state) => ({
        studentStatusRequest: selectStudentStatusRequest(state),
        createParentRequest: selectCreateRequest(state)
    }),
    (dispatch) => ({    
        sentStudentRequest: (params = {}) => { dispatch(sentStudentRequest(params)) },
        resetStudentRequest: () => { dispatch(resetStudentRequest()) },        
        createParent: (params = {}) => { dispatch(create(params)) },
        resetCreateParentRequest: () => { dispatch(resetCreateRequest()) }
    })    
)(AddParentModal);

export default translate('translations')(AddParentModal);