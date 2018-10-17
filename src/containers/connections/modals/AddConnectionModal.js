import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {
  AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography
} from '@material-ui/core';
import { create, resetCreateRequest } from "../../../redux/connections/actions";
import { selectCreateRequest } from "../../../redux/connections/selectors";
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
        this.setState({form: {}});
    }  
    
    _create() {
        this.props.create(this.state.form);
    }
    
    render() {
        const {createRequest, t, isOpen} = this.props;
        const loading   = createRequest.get('loading');
        const errors    = createRequest.get('errors');
        const {form}    = this.state;
        
        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                             
                        {loading ? <CircularProgress className="m--margin-right-15" color="inherit"/> : <Icon className="m--margin-right-15">person</Icon>}                
                        <Typography type="title" color="inherit" >
                            {t('connectionRequest')}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">
                    <div className='m-auto' style={{minWidth: 500}}>                
                        <div className="m-form">
                            <div className="form-group m-form__group row">
                                <label className="col-form-label col-lg-4" htmlFor="username">{t('enterUsernameOrEmail')}</label>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        name="username"
                                        onChange={(e) => { this._handleInputChange(e) }}
                                        value={form.username || ''}
                                        className="form-control m-input--air form-control-success m-input"
                                        id="firsName"/>
                                    {errors && errors.get('username') && <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                                </div>
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
        createRequest: selectCreateRequest(state)
    }),
    (dispatch) => ({    
        create: (params = {}) => { dispatch(create(params)) },
        resetCreateRequest: () => { dispatch(resetCreateRequest()) }
    })    
)(AddConnectionModal);

export default translate('translations')(AddConnectionModal);