import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AppBar, CircularProgress, DialogContent, DialogActions, Icon, Toolbar, Typography, Divider, Radio, FormControlLabel } from '@material-ui/core';
import { create, invite, resetCreateRequest, resetInviteRequest } from "../../../redux/connections/actions";
import { selectCreateRequest, selectInviteRequest } from "../../../redux/connections/selectors";
import Modal from "../../../components/ui/Modal";

class AddConnectionModal extends Component {

    constructor(props) {
        super(props);
        this.state = this._initState();
    }    
    
    componentWillUnmount() {        
        this.props.resetCreateRequest();
    }    
  
    componentDidUpdate(prevProps) {
        const {createRequest, inviteRequest } = this.props;
                       
        if ((createRequest.get('success') && !prevProps.createRequest.get('success')) || 
                (inviteRequest.get('success') && !prevProps.inviteRequest.get('success'))) {
            this._close();
            this.props.onSuccess();
        }       
    }
    
    _handleChangeType(event) {
        const { value } = event.target;        
        this.setState({
            type: value
        });        
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
    
    _handleForm() {
        return this.state.type === 'registeredUser' ? this._invite() : this._create()
    }
    
    _close() {        
        this.props.onClose();
        this.props.resetCreateRequest();
        this.props.resetInviteRequest();
        this.setState(this._initState());
    }
    
    _initState() {
        return {form: {}, type: 'registeredUser'};
    }
    
    _invite() {
        this.props.invite(this.state.form);
    }

    _create() {
        this.props.create(this.state.form);
    }
    
    render() {
        const {createRequest, inviteRequest, t, isOpen} = this.props;
        const loading       = createRequest.get('loading') || inviteRequest.get('loading');
        const createErrors  = createRequest.get('errors');        
        const inviteErrors  = inviteRequest.get('errors');
        const {form, type}  = this.state;
        
        return (
            <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        {loading ? <CircularProgress className="mr-3" color="inherit"/> : <Icon className="mr-3">person</Icon>}                
                        <Typography variant="h6" color="inherit" >{t('connectionRequest')}</Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">
                    <div className='m-auto' id="form-dialog-title">                
                        <div className="m-form">
                            <div className="form-group row">
                                <div className="col">
                                    <FormControlLabel 
                                        label={<h5 className="m-0">{t('inviteAlreadyRegisteredUser')}</h5>}
                                        control={<Radio color="primary" name="type" checked={type === 'registeredUser'} onChange={(e) => {this._handleChangeType(e)}} value="registeredUser" />}          
                                    />
                                </div>
                            </div>
                            {(type === 'registeredUser') && 
                                        
                            <div className="form-group row">
                                <label className="col-form-label col-lg-4" htmlFor="username">{t('enterUsernameOrEmail')} <span className="text-danger">*</span></label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.username || ''}
                                        className="form-control m-input" />
                                    {inviteErrors && inviteErrors.get('username') && <div className="form-control-feedback text-center error">{inviteErrors.get('username').get(0)}</div>}
                                </div>           
                            </div>
                            }
                            <div className="form-group row">
                                <div className="col">
                                    <FormControlLabel 
                                        label={<h5 className="m-0">{t('inviteNewUser')}</h5>}
                                        control={<Radio color="primary" name="type" checked={type === 'newUser'} onChange={(e) => {this._handleChangeType(e)}} value="newUser" />}          
                                    />
                                </div>           
                            </div>
                        {(type === 'newUser') && 
                        <div>
                            <div className="form-group row">
                                <label className="col-form-label col-lg-4" htmlFor="email">{t('email')} <span className="text-danger">*</span></label>
                                <div className="col-lg-6">
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={(e) => { this._handleInputChange(e)}}
                                        value={form.email || ''}
                                        className="form-control m-input"
                                        id="email"/>
                                    {createErrors && createErrors.get('email') && <div className="form-control-feedback text-center error">{createErrors.get('email').get(0)}</div>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-lg-4" htmlFor="firsName">{t('firstName')}</label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        name="firstName"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.firstName || ''}
                                        className="form-control m-input"
                                        id="firsName"/>
                                    {createErrors && createErrors.get('firstName') && <div className="form-control-feedback text-center error">{createErrors.get('firstName').get(0)}</div>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-lg-4" htmlFor="lastName">{t('lastName')}</label>
                                <div className="col-lg-6">
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.lastName || ''}
                                        className="form-control m-input"
                                        id="lastName"/>
                                    {createErrors && createErrors.get('lastName') && <div className="form-control-feedback text-center error">{createErrors.get('lastName').get(0)}</div>}
                                </div>
                            </div>
                        </div>}
                        <Divider className='my-3'/>
                        <div className="form-group row">
                            <label className="col-form-label col-lg-4" htmlFor="lastName">{t('message')}</label>
                            <div className="col-lg-6">
                                <textarea maxLength="300" onChange={(e) => { this._handleInputChange(e) }} name="message" className="form-control m-input">{form.message || ''}</textarea>
                            </div>
                        </div>                   
                    </div>
                    </div>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <input
                        type="button"                                                
                        value={t('sentRequest')}
                        onClick={() => { this._handleForm() }}
                        className="btn btn-success mr-3"
                        disabled={loading} />
                    <input
                        type="button"                                                
                        value={t('cancel')}
                        onClick={() => { this._close() }}
                        className="btn btn-default"
                       disabled={loading} />
                </DialogActions>                
            </Modal>
        );
    }
}

export default withTranslation('translations')(connect(
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
)(AddConnectionModal));