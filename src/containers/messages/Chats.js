import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatsRequest, selectGetGroupChatsRequest } from '../../redux/messages/selectors';
import { getChats, getGroupChats } from '../../redux/messages/actions';
import { Avatar } from '@material-ui/core';
import Loader from '../../components/layouts/Loader';
import Chat from "./sections/Chat";
import moment from 'moment/moment';

class Chats extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            chatId: null            
        };
    }

    componentWillMount() {
        this._getRecords();
    }
   
    componentWillReceiveProps(nextProps) {
        if (!this.props.getRecordsRequest.get('records').size && nextProps.getRecordsRequest.get('records').size) {
            let records = nextProps.getRecordsRequest.get('records');
            
            if (records.size && !this.state.chatId) {
                console.log('set chatId: ' + records.get(0).get('chatId'));
                this._viewChat(records.get(0).get('chatId'));
            }
        }
    }        
    
    _getRecords() {
        this.props.getRecords();
    }    
    
    _viewChat(id) {
        console.log('viewChat: ' + id);
        this.setState({chatId: id});
    }
    
    _renderRecords() {        
        const records = this.props.getRecordsRequest.get('records');        
        const {chatId} = this.state;
        
        return records.map((record, key) => {
            return (
                <div key={key} className={`chat ${record.get('chatId') === chatId ? 'current' : ''}`} onClick={() => this._viewChat(record.get('chatId')) }>
                    <div className='d-flex'>
                        <div className='align-self-center d-inline-block mr-3'>
                            <Avatar src={record.get('user').get('avatarSmall')} className='border' />
                        </div>
                        <div className='d-inline-block'>
                            <div>
                                <span className='chat-name'>{record.get('name')}</span>
                                {record.get('newMessages') > 0 && <span className='m-badge m-badge--brand m-badge--wide m-badge--danger p-0 ml-2'>{record.get('newMessages')}</span>}
                            </div>                        
                            <div>{record.get('user').get('name')}</div>
                            <div>{moment(record.get('created')).format('lll')}</div>
                        </div>
                    </div>
                </div>
            );    
        });
    }
    
    _renderChats() {
        const {chatId} = this.state;
        const {getRecordsRequest, t} = this.props;        
        
        if (!getRecordsRequest.get('records').size) {
            return <div className='m-portlet__body'>
                <h2 className='text-center my-5'>{t('messagesNotFound')}</h2>
            </div>;
        }
        
        return (
            <div className='h-100 d-flex align-items-stretch'>
                <div className='row w-100'>
                    <div className='col-3 pr-0 chats-box'>
                        <div className='chats'>
                            {this._renderRecords()}
                        </div>
                    </div>
                    <div className='col-9 pl-0'>
                        {chatId && <Chat chatId={chatId} />}
                    </div>                        
                </div>                
            </div>
        );
    }
    
    render() {
        const {getRecordsRequest, t} = this.props;        
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');        

        return (
            <div className='fadeInLeft h-100'> 
                {loading && <Loader />}                
                <div className='m-portlet m-portlet--head-solid-bg h-100'>
                    <div className={`m-portlet__head border-b-violet`}>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className={`m-portlet__head-icon violet`}><i className='fa fa-weixin'></i></span>
                                <h3 className='m-portlet__head-text'>{t('chats')}</h3>
                            </div>
                        </div>         
                    </div>                                 
                    {success && this._renderChats()}                    
                </div>
            </div>
        );
    }
}

Chats = connect(
    (state) => ({
        getRecordsRequest: selectGetGroupChatsRequest(state),        
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getGroupChats(params));
        }
    })
)(Chats);

export default translate('translations')(Chats);