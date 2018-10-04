import React, {Component} from 'react';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon, Checkbox,
  Toolbar, Typography,
  Divider, Button, DialogActions,
  InputLabel, Input, TextField, FormControl, FormHelperText, FormControlLabel
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { selectReplyMessageRequest } from '../../../redux/messages/selectors';
import { replyMessage, resetReplyMessageRequest } from '../../../redux/messages/actions';

class ReplyMessageModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            id: null,       
            subject: null,
            message: null,
            origin: {}
        };
    }
       
    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.setState({
                id:         nextProps.message.id,
                subject:    'RE: ' + nextProps.message.subject,
                from:       nextProps.message.user.name
            });   
        }        
        this._handleSuccess(nextProps);
    }

    _handleSuccess(nextProps) {
        if (!this.props.replyMessageRequest.get('success') && nextProps.replyMessageRequest.get('success')) {            
            this._close();
        }
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        
        this.setState({[name]: value});        
    }

    _close () {
        this.setState({            
            subject: null,
            message: null            
        });    
        this.props.resetReplyMessageRequest();    
        this.props.onClose();
    };

    _onSubmit (e) {
        e.preventDefault();

        const { message, subject } = this.state;

        this.props.replyMessage(this.props.message.id, {
            subject: subject,
            message: message
        });
    };
  
    render() {
        const { isOpen, replyMessageRequest, message, t } = this.props;
            
        const loading = replyMessageRequest.get('loading');
        const success = replyMessageRequest.get('success');
        const errors  = replyMessageRequest.get('errors');

        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                      
                        {loading ? (
                          <CircularProgress className="m--margin-right-15" color="inherit"/>
                        ) : (
                          <Icon className="m--margin-right-15">message</Icon>
                        )}                      
                        <Typography type="title" color="inherit" >
                            {t('replyMessage')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25" style={{minWidth: 650}}>                    
                    <form id='assign-teachers-form' onSubmit={(e) => { this._onSubmit(e) }}>
                        <div className='row'>
                            <div className='col-sm-12 col-md-12'>
                                <FormControl className='full-width'>
                                <TextField
                                    id="standard-read-only-input"
                                    label={t('recipient')}
                                    defaultValue={this.state.from}                                     
                                    InputProps={{
                                      disabled: true
                                    }}/>
                                </FormControl>
                            </div>
                            
                            <div className='col-sm-12 col-md-12'>
                                <FormControl className='full-width'>
                                    <TextField
                                       name="subject"
                                       label={t('subject')}
                                       value={this.state.subject || ''}
                                       margin="normal"        
                                       onChange={(e) => {this._handleChange(e)}}
                                    />         
                                    {errors && errors.get('subject') && <FormHelperText error>{errors.get('subject').get(0)}</FormHelperText>}
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
                    <Button
                      type='submit'
                      form='assign-students-form'
                      disabled={loading}
                      variant="raised"
                      className='mt-btn-success pull-right btn btn-success mt-btn'
                      onClick={ (e) => {this._onSubmit(e) }}
                      color='primary'>
                      {t('reply')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

ReplyMessageModal = connect(
    (state) => ({
        replyMessageRequest: selectReplyMessageRequest(state),
    }),
    (dispatch) => ({
        replyMessage: (id, params = {}) => { dispatch(replyMessage(id, params)) },
        resetReplyMessageRequest: () => { dispatch(resetReplyMessageRequest()) }  
    })
)(ReplyMessageModal);

export default translate('translations')(ReplyMessageModal);
