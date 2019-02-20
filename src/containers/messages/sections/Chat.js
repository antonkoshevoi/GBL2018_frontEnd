import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatMessagesRequest, selectSendMessageRequest, selectDeleteRecordRequest } from '../../../redux/messages/selectors';
import { getChatMessages, sendChatMessage, deleteChatMessage } from '../../../redux/messages/actions';
import { CircularProgress, Avatar, TextField, FormControl } from '@material-ui/core';
import Loader from '../../../components/layouts/Loader';
import moment from 'moment/moment';

class Chat extends Component {
       
    constructor(props) {
        super(props);
                
        console.log('Chat: ' + this.props.chatId);
        this.state = {
            message:    '',
            chatId:     this.props.chatId
        }
    }

    componentWillMount() {
        if (this.props.chatId) {
            this._getRecords(this.props.chatId);
        }
    }
   
    componentWillReceiveProps(nextProps) {
        if (nextProps.chatId !== this.props.chatId) {
            this._getRecords(nextProps.chatId);
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
    
    _delete(id) {
        this.props.deleteMessage(id);
    }
    
    _send() {
        const { message, chatId} = this.state;
        
        this.setState({message: ''});
        
        this.props.sendMessage({
            chatId:     chatId,
            message:    message
        });
    }
    
    _renderRecords() {
        const {t, deleteRecordRequest, getRecordsRequest} = this.props;        
        const records = getRecordsRequest.get('records');
        const styles = {right: '0px', top: '25%'};
        
        if (!records.size) {
            return <div><h3 className='text-center my-5'>{t('messagesNotFound')}</h3></div>;
        }

        return records.map((record, key) => (
            <div className={`message-box my-2 ${record.get('isMine') ? 'sent' : 'inbox'}`}  index={key} key={key}>
                {!record.get('isMine') && <div className='d-inline-block mr-3'>
                    <Avatar src={record.get('userAvatar')} className='border' />
                </div>}
                <div className='d-inline-block'>
                    <div className='text-muted'>
                        {record.get('isMine') ? t('me') : record.get('userName')}, {moment(record.get('created')).format('lll')}
                    </div>
                    <div className='message-content mt-1'>
                        <div className={`pre-line ${record.get('removed') ? 'text-muted' : ''}`}>                    
                            {record.get('removed') ? t('messageRemoved') : record.get('body')}
                        </div>                
                    </div>
                    {record.get('isMine') && <div className='d-inline-block'>                     
                        <button disabled={deleteRecordRequest.get('loading')} onClick={() => this._delete(record.get('id'))} className="btn m-btn btn-sm m-btn--icon m-btn--icon-only btn-link m--margin-left-5">                            
                            {(deleteRecordRequest.get('loading') && deleteRecordRequest.get('id') === record.get('id')) ? <CircularProgress style={styles} size={20} /> : <i className="text-danger fa fa-times"></i>}
                        </button>
                    </div>}
                </div>
            </div>
        ));        
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

    componentDidMount() {
        this._scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState) {
        const {sendMessageRequest, getRecordsRequest} = this.props;
    
        const size      = getRecordsRequest.get('records').size;
        const prevSize  = prevProps.getRecordsRequest.get('records').size;
        
        if (size > prevSize || sendMessageRequest.get('loading')) {    
            this._scrollToBottom();
        }
    }

    render() {
        const {getRecordsRequest, sendMessageRequest, t} = this.props;
        const {message} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');        

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
                    <div className='form-group mx-2'>
                        <FormControl className='full-width'>
                            <TextField
                                multiline
                                name="message"
                                placeholder={t('message')}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                rows="2"
                                autoFocus
                                readOnly={sendMessageRequest.get('loading')}
                                value={message || ''}
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
        deleteRecordRequest: selectDeleteRecordRequest(state)
    }),
    (dispatch) => ({
        getChatMessages: (id, params = {}) => {
            dispatch(getChatMessages(id, params));
        },
        sendMessage: (params = {}) => {
            dispatch(sendChatMessage(params));
        },
        deleteMessage: (id) => {
            dispatch(deleteChatMessage(id));                    
        }
    })
)(Chat);

export default translate('translations')(Chat);