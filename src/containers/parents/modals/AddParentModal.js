import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider
} from '@material-ui/core';
import { sentStudentRequest, resetSentStudentRequest, create, resetCreateRequest } from "../../../redux/student-parents/actions";
import { selectSentStudentRequest, selectCreateRequest } from "../../../redux/student-parents/selectors";
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
  
    componentDidUpdate(prevProps) {
        const {sentStudentRequest, createParentRequest } = this.props;
        
        if (sentStudentRequest.get('success') && !prevProps.sentStudentRequest.get('success')) {
            this._close();
            this.props.onSuccess();
        }
               
        if (createParentRequest.get('success') && !prevProps.createParentRequest.get('success')) {
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
        this.props.sentRequest({
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
        const {sentStudentRequest, createParentRequest, t} = this.props;
        const {form}        = this.state;
        const loading       = sentStudentRequest.get('loading') || createParentRequest.get('loading');        
        const errors        = sentStudentRequest.get('errors');
        const formErrors    = createParentRequest.get('errors');
        
        return (             
            <div className='m-auto' style={{maxWidth: 900}}>
                <h5 className="mb-4">{t('linkToParent')}</h5>
                <div className="m-form">
                    <div className="form-group row">
                        <label className="col-form-label col-lg-3" htmlFor="parentUsername">{t('enterParentUsernameOrEmail')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="parentUsername"
                                onChange={(e) => { this._handleInputChange(e) }}
                                value={form.parentUsername || ''}
                                className="form-control m-input"
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
                <Divider className="mt-4 mb-4" />
                <h5>{t('createParentAccount')}</h5>
                <div className="m-form mt-4">
                    <div className="form-group row">
                        <label className="col-form-label col-lg-3" htmlFor="email">{t('email')} <span className="text-danger">*</span></label>
                        <div className="col-lg-6">
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => { this._handleInputChange(e)}}
                                value={form.email || ''}
                                className="form-control m-input"
                                id="email"/>
                            {formErrors && formErrors.get('email') && <div className="form-control-feedback text-center error">{formErrors.get('email').get(0)}</div>}
                        </div>
                    </div>  
                    <div className="form-group row">
                        <label className="col-form-label col-lg-3" htmlFor="password">{t('password')} <span className="text-danger">*</span></label>
                        <div className="col-lg-6">
                            <input
                                type="password"
                                name="password"
                                onChange={(e) => { this._handleInputChange(e)}}
                                value={form.password || ''}
                                className="form-control m-input"
                                id="password"/>
                            {formErrors && formErrors.get('password') && <div className="form-control-feedback text-center error">{formErrors.get('password').get(0)}</div>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-lg-3" htmlFor="username">{t('username')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="username"
                                onChange={(e) => { this._handleInputChange(e)}}
                                value={form.username || ''}
                                className="form-control m-input"
                                id="username"/>
                            {formErrors && formErrors.get('username') && <div className="form-control-feedback text-center error">{formErrors.get('username').get(0)}</div>}
                        </div>
                    </div>                                    
                    <div className="form-group row">
                        <label className="col-form-label col-lg-3" htmlFor="firsName">{t('firstName')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="firstName"
                                onChange={(e) => { this._handleInputChange(e) }}
                                value={form.firstName || ''}
                                className="form-control m-input"
                                id="firsName"/>
                            {formErrors && formErrors.get('firstName') && <div className="form-control-feedback text-center error">{formErrors.get('firstName').get(0)}</div>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-form-label col-lg-3" htmlFor="lastName">{t('lastName')}</label>
                        <div className="col-lg-6">
                            <input
                                type="text"
                                name="lastName"
                                onChange={(e) => { this._handleInputChange(e) }}
                                value={form.lastName || ''}
                                className="form-control m-input"
                                id="lastName"/>
                            {formErrors && formErrors.get('lastName') && <div className="form-control-feedback text-center error">{formErrors.get('lastName').get(0)}</div>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-12 text-center">
                            <input
                                type="button"                                                
                                value={t('register')}
                                onClick={() => { this._createParent() }}
                                className="btn btn-success mr-3"
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
        const {sentStudentRequest, createParentRequest, t, isOpen} = this.props;
        const loading = sentStudentRequest.get('loading') || createParentRequest.get('loading');
        return (
            <Modal bigger={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        {loading ? <CircularProgress className="mr-3" color="inherit"/> : <Icon className="mr-3">person</Icon>}                
                        <Typography variant="h6" color="inherit" >
                            {t('addParent')}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">
                    { this._renderRequestForm() }
                </DialogContent>
            </Modal>
        );
    }
}

export default withTranslation('translations')(connect(
    (state) => ({
        sentStudentRequest: selectSentStudentRequest(state),
        createParentRequest: selectCreateRequest(state)
    }),
    (dispatch) => ({    
        sentRequest: (params = {}) => { dispatch(sentStudentRequest(params)) },
        resetStudentRequest: () => { dispatch(resetSentStudentRequest()) },        
        createParent: (params = {}) => { dispatch(create(params)) },
        resetCreateParentRequest: () => { dispatch(resetCreateRequest()) }
    })    
)(AddParentModal));