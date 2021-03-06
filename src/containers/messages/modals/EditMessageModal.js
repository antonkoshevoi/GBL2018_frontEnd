import React, {Component} from 'react';
import {
  AppBar, CircularProgress, DialogContent, Toolbar, Typography,
  Divider, DialogActions, TextField, FormControl, FormHelperText
} from '@material-ui/core';
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { selectUpdateMessageRequest } from '../../../redux/messages/selectors';
import { updateMessage, resetUpdateMessageRequest } from '../../../redux/messages/actions';

class EditMessageModal extends Component {

    constructor (props) {
        super(props);
        this.state = {};
    }
       
    componentDidUpdate(prevProps) {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.setState({
                id:      this.props.message.id,
                message: this.props.message.body,
                expired: this.props.message.expired
            });   
        }        
        this._handleSuccess(prevProps);
    }

    _handleSuccess(prevProps) {
        if (this.props.updateMessageRequest.get('success') && !prevProps.updateMessageRequest.get('success')) {            
            this.props.onSuccess();
            this._close();
        }
    }
    
    _handleDateChange(m, dateField) { 
        this.setState({[dateField]: m});
    }     
    
    _handleChange(event) {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }

    _close () {
        this.setState({             
            id:      null,
            message: null,
            expired: null
        });    
        this.props.resetUpdateMessageRequest();    
        this.props.onClose();
    }

    _onSubmit (e) {
        e.preventDefault();
        const { message, expired, id } = this.state;
        this.props.updateMessage(id, {            
            message: message,
            expired: expired
        });
    }
  
    render() {
        const { isOpen, updateMessageRequest, title, icon, t } = this.props;
        const { message, expired } = this.state;
        const loading = updateMessageRequest.get('loading');        
        const errors  = updateMessageRequest.get('errors');

        return (
            <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                      
                        {loading ? (
                          <CircularProgress className="mr-3" color="inherit"/>
                        ) : (
                          <span className='icon mr-3'><i className={`display-5 ${icon}`}></i></span>
                        )}                      
                        <Typography variant="h6" color="inherit" >{title}</Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">                    
                    <form id='assign-teachers-form' onSubmit={(e) => { this._onSubmit(e) }}>
                        <div className='row'>                                                             
                            <div className='col-sm-6 col-md-6 col-lg-6'>
                                <FormControl className='full-width form-inputs'>                        
                                    <MuiDatePicker
                                        name='expired'
                                        label={t('expires')}
                                        value={expired || null}
                                        onChange={(m) => {
                                          this._handleDateChange(m, 'expired')
                                        }}
                                      />
                                {errors && errors.get('expired') && <FormHelperText error>{errors.get('expired').get(0)}</FormHelperText>}
                                </FormControl>
                            </div>                                           
                            <div className='col-sm-12 col-md-12'>
                                <FormControl className='full-width'>
                                    <TextField                                                                                    
                                        multiline
                                        name="message"                                        
                                        placeholder={t('message')}          
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"                                          
                                        rows="15"                                  
                                        value={message || ''}                                                       
                                        onChange={(e) => {
                                            this._handleChange(e)
                                        }}                      
                                    />
                                    {errors && errors.get('message') && <FormHelperText error>{errors.get('message').get(0)}</FormHelperText>}
                                </FormControl>
                            </div>        
                        </div>
                    </form>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <button disabled={loading} className='btn btn-success' onClick={ (e) => {this._onSubmit(e) }} >
                      {t('save')}
                    </button>
                    <button className='btn btn-default' onClick={ () => {this._close() }}>
                      {t('cancel')}
                    </button>                    
                </DialogActions>
            </Modal>
        );
    }
}

export default withTranslation('translations')(connect(
    (state) => ({
        updateMessageRequest: selectUpdateMessageRequest(state)
    }),
    (dispatch) => ({
        updateMessage: (id, params = {}) => { dispatch(updateMessage(id, params)) },
        resetUpdateMessageRequest: () => { dispatch(resetUpdateMessageRequest()) }  
    })
)(EditMessageModal));
