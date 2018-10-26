import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {
  AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider
} from '@material-ui/core';
import { create, invite, resetCreateRequest, resetInviteRequest } from "../../../redux/connections/actions";
import { selectCreateRequest, selectInviteRequest } from "../../../redux/connections/selectors";
import Modal from "../../../components/ui/Modal";

class AddConnectionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {}
        }
    }    
    
    componentWillUnmount() {        
        this.props.resetCreateRequest();
    }    
  
    componentWillReceiveProps(nextProps) {
        const {createRequest } = this.props;
                       
        if (!createRequest.get('success') && nextProps.createRequest.get('success')) {
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
    
    _close() {        
        this.props.onClose();
        this.props.resetCreateRequest();
        this.props.resetInviteRequest();
        this.setState({form: {}});
    }  
    
    _invite() {
        this.props.invite(this.state.form);
    }

    _create() {
        this.props.create(this.state.form);
    }
    
    render() {
        const {createRequest, inviteRequest, t, isOpen} = this.props;
        const loading   = createRequest.get('loading') || inviteRequest.get('loading');
        const errors    = createRequest.get('errors') || inviteRequest.get('errors');        
        
        const {form}    = this.state;
        
        return (
            <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        {loading ? <CircularProgress className="m--margin-right-15" color="inherit"/> : <Icon className="m--margin-right-15">person</Icon>}                
                        <Typography variant="h6" color="inherit" >
                            {t('connectionRequest')}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">
                    <div className='m-auto' id="form-dialog-title">                
                        <div className="m-form">
                        <h5>{t('inviteAlreadyRegisteredUser')}</h5>   
                            <div className="form-group m-form__group row">
                                <label className="col-form-label col-lg-4" htmlFor="username">{t('enterUsernameOrEmail')}</label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.username || ''}
                                        className="form-control m-input--air form-control-success m-input"
                                        id="firsName"/>
                                    {errors && errors.get('username') && <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                                </div>
                                <div className="col-lg-2">
                                    <input
                                        type="button"                                                
                                        value={t('invite')}
                                        onClick={() => { this._invite() }}
                                        className="btn btn-success m--margin-right-10"
                                        disabled={loading} />
                                </div>
                            </div>
                        </div>
                        <Divider className="m--margin-top-20 m--margin-bottom-20" />
                        <h5>{t('inviteNewUser')}</h5>
                        <div className="m-form m--margin-top-20">
                            <div className="form-group m-form__group row">
                                <label className="col-form-label col-lg-4" htmlFor="email">{t('email')} <span className="text-danger">*</span></label>
                                <div className="col-lg-6">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) => { this._handleInputChange(e)}}
                                        value={form.email || ''}
                                        className="form-control m-input--air form-control-success m-input"
                                        id="email"/>
                                    {errors && errors.get('email') && <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                                </div>
                            </div>
                            <div className="form-group m-form__group row">
                                <label className="col-form-label col-lg-4" htmlFor="firsName">{t('firstName')}</label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.firstName || ''}
                                        className="form-control m-input--air form-control-success m-input"
                                        id="firsName"/>
                                    {errors && errors.get('firstName') && <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                                </div>
                            </div>
                            <div className="form-group m-form__group row">
                                <label className="col-form-label col-lg-4" htmlFor="lastName">{t('lastName')}</label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.lastName || ''}
                                        className="form-control m-input--air form-control-success m-input"
                                        id="lastName"/>
                                    {errors && errors.get('lastName') && <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                                </div>
                            </div>
                            <div className="form-group m-form__group row">
                                <div className="col-lg-12">
                                    <div className="text-center m--margin-top-25">
                                        <input
                                            type="button"                                                
                                            value={t('sentRequest')}
                                            onClick={() => { this._create() }}
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
                        </div>
                    </div>
                </DialogContent>
            </Modal>
        );
    }
}

AddConnectionModal = connect(
    (state) => ({        
        createRequest: selectCreateRequest(state),
        inviteRequest: selectInviteRequest(state)
    }),
    (dispatch) => ({    
        invite: (params = {}) => { dispatch(invite(params)) },
        create: (params = {}) => { dispatch(create(params)) },
        resetCreateRequest: () => { dispatch(resetCreateRequest()) },
        resetInviteRequest: () => { dispatch(resetInviteRequest()) }
    })    
)(AddConnectionModal);

export default translate('translations')(AddConnectionModal);