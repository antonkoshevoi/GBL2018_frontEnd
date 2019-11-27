import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatMessagesRequest, selectSendMessageRequest, selectUpdateMessageRequest, selectDeleteRecordRequest } from '../../../redux/messages/selectors';
import { getChatMessages, sendChatMessage, updateChatMessage, deleteChatMessage } from '../../../redux/messages/actions';
import { CircularProgress, Avatar, TextField, FormControl, IconButton, Menu, MenuItem } from '@material-ui/core';
import { DateTime } from "../../../components/ui/DateTime";
import {Loader} from '../../../components/ui/Loader';

class Chat extends Component {
       
    constructor(props) {
        super(props);
                       
        this.state = {
            message:        {},        
            messageId:      null,
            messageText:    '',
            chatId:         this.props.chatId,
            actionsAnchor:  null
        }
    }

    componentDidMount() {
        if (this.props.chatId) {
            this._getRecords(this.props.chatId);
        }
        this._scrollToBottom();
    }
   
    componentDidUpdate(prevProps) {
        const {sendMessageRequest, getRecordsRequest, deleteRecordRequest} = this.props;
        const size      = getRecordsRequest.get('records').size;
        const prevSize  = prevProps.getRecordsRequest.get('records').size;
        
        if (prevProps.chatId !== this.props.chatId) {
            this._getRecords(this.props.chatId);
        }
        if (!prevProps.deleteRecordRequest.get('success') && deleteRecordRequest.get('success')) {
            this._handleActionsClose();
        }
                    
        if (size > prevSize || sendMessageRequest.get('loading')) {    
            this._scrollToBottom();
        }        
    }
    
    _getRecords(chatId) {
        this.setState({
            chatId: chatId
        });
        this.props.getChatMessages(chatId);
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }
    
    _delete() {
        const { message } = this.state;
        if (message) {
            this.props.deleteMessage(message.id);
        }
    }
    
    _send() {
        const { chatId, messageId, messageText} = this.state;
        
        this.setState({
            messageId:   null,
            messageText: '',
            message:     {}
        });
        
        if (messageId) {
            this.props.updateMessage(messageId, {                
                message:    messageText
            });
        } else {
            this.props.sendMessage({
                chatId:     chatId,
                message:    messageText
            });            
        }
    }
    
    _edit() {
        const {message} = this.state;
        this.setState({
            messageId:      message.id   || null,
            messageText:    message.body || null
        });
        this._handleActionsClose();
    }

    _handleActionsClick(event, message) {
        this.setState({ 
            actionsAnchor: event.currentTarget,
            message: message.toJS()
        });
        console.log(message.toJS());
    };

    _handleActionsClose = () => {
        this.setState({ 
            actionsAnchor: null,
            message: {}
        });
    };    
    
    _renderRecords() {
        const {t, deleteRecordRequest, getRecordsRequest} = this.props;        
        const { actionsAnchor } = this.state;
        const records = getRecordsRequest.get('records');
        const actionsIsOpen = Boolean(actionsAnchor);        
        
        if (!records.size) {
            return <div><h3 className='text-center my-5'>{t('messagesNotFound')}</h3></div>;
        }
        return (<div>
            {records.map((record, key) => (
                <div className={`message-box my-2 ${record.get('isMine') ? 'sent' : 'inbox'}`}  index={key} key={key}>
                    {!record.get('isMine') && <div className='d-inline-block mr-3'>
                        <Avatar src={record.get('userAvatar')} className='border' />
                    </div>}
                    <div className='d-inline-block'>
                        <div className='text-muted'>
                            {record.get('isMine') ? t('me') : record.get('userName')}, <DateTime time={record.get('created')} />
                        </div>
                        <div className='message-content mt-1'>
                            <div className={`pre-line ${record.get('removed') ? 'text-muted' : ''}`}>                    
                                {record.get('removed') ? t('messageRemoved') : record.get('body')}                                
                            </div>                
                        </div>
                        {record.get('isMine') && <div className='d-inline-block'> 
                            <div className="ml-1">
                                <IconButton aria-label="More" aria-owns={actionsIsOpen ? 'actions-menu' : undefined} aria-haspopup="true" onClick={(e) => this._handleActionsClick(e, record)}>
                                    <i className="fa fa-ellipsis-h"></i>
                                </IconButton>
                            </div>                    
                        </div>}             
                    </div>
                </div>
            ))}
            <Menu id="actions-menu" anchorEl={actionsAnchor} open={actionsIsOpen} onClose={() => this._handleActionsClose()}>          
                <MenuItem onClick={() => this._edit()}>
                    <i className="fa fa-pencil"></i>
                    <span className="ml-2">{t('edit')}</span>
                </MenuItem>          
                <MenuItem disabled={deleteRecordRequest.get('loading')} onClick={() => this._delete()}>
                    {deleteRecordRequest.get('loading') ? <CircularProgress size={20} /> : <i className="fa fa-times"></i>}
                    <span className="ml-2">{t('delete')}</span>
                </MenuItem>
            </Menu>
        </div>);
    }    
   
    _handleKeyPress(e) {
        if (e.shiftKey) {
            return;
        }        
        if (e.key === 'Enter') {
            this._send();
            e.preventDefault();
        }
    }

    _scrollToBottom = () => {       
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    render() {
        const {getRecordsRequest, sendMessageRequest, updateMessageRequest, disabledByOwner, disabledByRecipient, t} = this.props;
        const {messageText, messageId} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');        

        let placeholder = 'message';
        if (disabledByRecipient) {
            placeholder = 'userDisabledThisChat';
        }
        if (disabledByOwner) {
            placeholder = 'youDisabledThisChat';
        }        
        return (
            <div className='h-100 px-sm-3'>
                {loading && <Loader /> }
                <div className="chat-messages" ref={(el) => { this.messages = el; }}>
                    <div className='mx-2'>
                        {success && this._renderRecords() }
                        {sendMessageRequest.get('loading') && <CircularProgress className="float-right my-2 mx-2" />}
                    </div>
                </div>
                <div className='px-sm-3 new-message'>
                    <div className='form-group mx-2 mb-0'>
                        <FormControl className='full-width'>
                            {messageId && <div><i className="fa fa-pencil"></i> {t('editMessage')}</div>}
                            <TextField
                                multiline
                                name="messageText"
                                placeholder={t(placeholder)}
                                className={messageId ? 'mt-1' : 'mt-3'}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                rows="2"
                                autoFocus
                                disabled={disabledByOwner || disabledByRecipient}
                                readOnly={sendMessageRequest.get('loading') || updateMessageRequest.get('loading')}
                                value={messageText || ''}
                                onKeyPress={(e) => {
                                    this._handleKeyPress(e)
                                }}
                                onChange={(e) => {
                                    this._handleChange(e)
                                }}
                            />
                        </FormControl>
                    </div>
                </div>
            </div>
        );
    }
}

Chat = connect(
    (state) => ({
        getRecordsRequest: selectGetChatMessagesRequest(state),
        sendMessageRequest: selectSendMessageRequest(state),
        updateMessageRequest: selectUpdateMessageRequest(state),
        deleteRecordRequest: selectDeleteRecordRequest(state)
    }),
    (dispatch) => ({
        getChatMessages: (id, params = {}) => {
            dispatch(getChatMessages(id, params));
        },
        sendMessage: (params = {}) => {
            dispatch(sendChatMessage(params));
        },
        updateMessage: (id, params = {}) => {
            dispatch(updateChatMessage(id, params));
        },        
        deleteMessage: (id) => {
            dispatch(deleteChatMessage(id));                    
        }
    })
)(Chat);

export default withTranslation('translations')(Chat);