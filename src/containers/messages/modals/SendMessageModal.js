import React, {Component} from 'react';
import {
  AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography,
  Divider, DialogActions, TextField, FormControl, FormHelperText
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { selectSendMessageRequest } from '../../../redux/messages/selectors';
import { sendChatMessage, resetSendMessageRequest } from '../../../redux/messages/actions';

class SendMessageModal extends Component {

    constructor (props) {
        super(props);
        this.state = {                       
            message:        null,
            recipientName:  null,
            userId:         null
        };
    }
       
    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.setState({
                recipientName:  nextProps.recipient.name,
                userId:         nextProps.recipient.id
            });   
        }        
        this._handleSuccess(nextProps);
    }

    _handleSuccess(nextProps) {
        if (!this.props.sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {            
            this._close();
        }
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        
        this.setState({[name]: value});        
    }

    _close () {
        this.setState({ 
            message: null,
            userId:  null       
        });    
        this.props.resetSendMessageRequest();    
        this.props.onClose();
    };

    _onSubmit (e) {
        e.preventDefault();

        const { message, userId } = this.state;

        this.props.sendMessage({            
            message:    message,            
            chatId:     `private-${userId}`
        });
    };
  
    render() {
        const { isOpen, sendMessageRequest, t } = this.props;
            
        const loading = sendMessageRequest.get('loading');        
        const errors  = sendMessageRequest.get('errors');

        return (
            <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                      
                        {loading ? (
                          <CircularProgress className="m--margin-right-15" color="inherit"/>
                        ) : (
                          <Icon className="m--margin-right-15">message</Icon>
                        )}                      
                        <Typography variant="h6" color="inherit" >
                            {t('sendMessage')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">                    
                    <form id='assign-teachers-form' onSubmit={(e) => { this._onSubmit(e) }}>
                        <div className='row'>
                            <div className='col-sm-12 col-md-12'>
                                <FormControl className='full-width'>
                                <TextField
                                    id="standard-read-only-input"
                                    label={t('recipient')}
                                    defaultValue={this.state.recipientName}                                     
                                    disabled={true}
                                />
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
                                        value={this.state.message || ''}                                                       
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
                    <button disabled={loading} className='mt-btn-success pull-right btn btn-success mt-btn' onClick={ (e) => {this._onSubmit(e) }} >
                      {t('sendMessage')}
                    </button>
                    <button className='pull-right btn btn-default' onClick={ (e) => {this._close() }}>
                      {t('cancel')}
                    </button>                    
                </DialogActions>
            </Modal>
        );
    }
}

SendMessageModal = connect(
    (state) => ({
        sendMessageRequest: selectSendMessageRequest(state)
    }),
    (dispatch) => ({
        sendMessage: (params = {}) => { dispatch(sendChatMessage(params)) },
        resetSendMessageRequest: () => { dispatch(resetSendMessageRequest()) }  
    })
)(SendMessageModal);

export default translate('translations')(SendMessageModal);
