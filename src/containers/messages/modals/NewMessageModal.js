import React, {Component} from 'react';
import {
  AppBar, CircularProgress, DialogContent, Toolbar, Typography,
  Divider, DialogActions, TextField, FormControl, FormHelperText,
  Select, MenuItem, InputLabel
} from '@material-ui/core';
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { selectSendMessageRequest, selectGetGroupsRequest } from '../../../redux/messages/selectors';
import { getGroups, sendMessage, resetSendMessageRequest } from '../../../redux/messages/actions';

class NewMessageModal extends Component {

    constructor(props) {
        super(props);        
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {
            group: null,
            message: null,
            expired: null
        };
    }
    
    componentDidMount() {
        this.props.getGroups();
    }    
       
    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.setState(this.getInitialState());   
        }        
        this._handleSuccess(nextProps);
    }

    _handleSuccess(nextProps) {
        if (!this.props.sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {            
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
        this.setState(this.getInitialState());    
        this.props.resetSendMessageRequest();    
        this.props.onClose();
    };

    _onSubmit (e) {
        e.preventDefault();
        const { message, expired, group } = this.state;
        const { type } = this.props;
        this.props.sendMessage({
            group: group,      
            message: message,
            expired: expired,
            type: type || 'chat'
        });
    };
  
    render() {
        const { isOpen, sendMessageRequest, groupsRequest, title, icon, t } = this.props;
        const { message, expired } = this.state;
        const loading = sendMessageRequest.get('loading');        
        const errors  = sendMessageRequest.get('errors');

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
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <FormControl className='full-width form-inputs'>
                                    <InputLabel htmlFor='recipients'>{t('recipients')}</InputLabel>                            
                                    <Select
                                        value={this.state.group || ''}
                                        onChange={(e) => { this._handleChange(e) }}
                                        name="group"
                                        >
                                        <MenuItem value=""></MenuItem>
                                        {groupsRequest.get('records').toJS().map((item, key) => {
                                            return <MenuItem key={key} value={item.id}>{item.name}</MenuItem>;                                
                                        })}
                                    </Select>                                                      
                                    {errors && errors.get('group') && <FormHelperText error>{errors.get('group').get(0)}</FormHelperText>}
                                </FormControl>
                            </div>  
                        </div>      
                        <div className='row'>      
                            <div className='col-sm-12 col-md-6 col-lg-6'>
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
                        </div>
                        <div className='row'>      
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
                      {t('sendMessage')}
                    </button>
                    <button className='btn btn-default' onClick={ (e) => {this._close() }}>
                      {t('cancel')}
                    </button>                    
                </DialogActions>
            </Modal>
        );
    }
}

NewMessageModal = connect(
    (state) => ({        
        sendMessageRequest: selectSendMessageRequest(state),
        groupsRequest: selectGetGroupsRequest(state)
    }),
    (dispatch) => ({
        getGroups: (params = {}) => { dispatch(getGroups(params)) },
        sendMessage: (params = {}) => { dispatch(sendMessage(params)) },
        resetSendMessageRequest: () => { dispatch(resetSendMessageRequest()) }        
    })
)(NewMessageModal);

export default withTranslation('translations')(NewMessageModal);