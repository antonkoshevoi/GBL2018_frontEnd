import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetPrivateChatsRequest, selectGetGroupChatsRequest } from '../../redux/messages/selectors';
import { getPrivateChats, getGroupChats } from '../../redux/messages/actions';
import { Avatar, CircularProgress } from '@material-ui/core';
import Loader from '../../components/layouts/Loader';
import Chat from "./sections/Chat";
import moment from 'moment/moment';

class Chats extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            chatId: null,
            type: 'group'
        };
    }

    componentWillMount() {
        this._getRecords();
    }
   
    componentWillReceiveProps(nextProps) {
        const { groupChatsRequest, privateChatsRequest} = this.props;        
        
        if (!groupChatsRequest.get('records').size && nextProps.groupChatsRequest.get('records').size) {
            if (!this.state.chatId) {                
                this._viewChat(nextProps.groupChatsRequest.get('records').get(0).get('chatId'));
            }
        }
        if (!privateChatsRequest.get('records').size && nextProps.privateChatsRequest.get('records').size) {
            if (!this.state.chatId) {                
                this._viewChat(nextProps.privateChatsRequest.get('records').get(0).get('chatId'));
            }
        }        
    }        
    
    _getRecords(type = 'group') {
        if (type === 'group') {
            this.props.getGroupChats();
        } else {
            this.props.getPrivateChats();
        }
    }    
    
    _viewChat(id) {
        console.log('viewChat: ' + id);
        this.setState({chatId: id});
    }
    
    _setType(type) {
        this.setState({
            type: type, 
            chatId: null
        });
        
        this._getRecords(type);
    }
    
    _renderGroups() {        
        const { groupChatsRequest, t} = this.props;        
        const {chatId} = this.state;
        
        if (groupChatsRequest.get('loading')) {            
            return <div class="my-2"><CircularProgress /></div>;
        }
        
        if (!groupChatsRequest.get('records').size) {
            return <h2 className='text-center m--margin-bottom-100 m--margin-top-100'>{t('groupChatsNotFound')}</h2>;
        }         
        
        return groupChatsRequest.get('records').map((record, key) => {
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
    
    _renderContacts() {        
        const {privateChatsRequest, t} = this.props;       
        const {chatId} = this.state;
        
        if (privateChatsRequest.get('loading')) {            
            return <div class="my-2"><CircularProgress /></div>;
        }
        
        if (!privateChatsRequest.get('records').size) {
            return <h2 className='text-center m--margin-bottom-100 m--margin-top-100'>{t('privateChatsNotFound')}</h2>;
        }  
        
        return privateChatsRequest.get('records').map((record, key) => {
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
                            <div>{t(record.get('user').get('role'))}</div>
                        </div>
                    </div>
                </div>
            );    
        });
    }
    
    _renderChats() {
        const {chatId, type} = this.state;        
        
        return (
            <div className='h-100 d-flex align-items-stretch'>
                <div className='row w-100'>
                    <div className='col-3 pr-0 chats-box'>
                        <div className="chat-types">
                            <div class="w-100 btn-group btn-group-toggle" data-toggle="buttons">
                                <button class={`w-50 btn btn-secondary ${type == 'group' ? 'active' : ''}`} onClick={() => this._setType('group')}>
                                    <i class="display-5 fa fa-users"></i>
                                </button>
                                <button class={`w-50 btn btn-secondary ${type == 'private' ? 'active' : ''}`} onClick={() => this._setType('private')}>
                                    <i class="display-5 fa fa-user"></i>
                                </button>   
                            </div>
                        </div>
                        <div className='chats'>
                            {type === 'group' ? this._renderGroups() : this._renderContacts()}
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
        const {t} = this.props;
        return (
            <div className='fadeInLeft h-100'>
                <div className='m-portlet m-portlet--head-solid-bg h-100'>
                    <div className={`m-portlet__head border-b-violet`}>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className={`m-portlet__head-icon violet`}><i className='fa fa-weixin'></i></span>
                                <h3 className='m-portlet__head-text'>{t('chats')}</h3>
                            </div>
                        </div>         
                    </div>                                 
                    {this._renderChats()}                    
                </div>
            </div>
        );
    }
}

Chats = connect(
    (state) => ({
        groupChatsRequest: selectGetGroupChatsRequest(state),
        privateChatsRequest: selectGetPrivateChatsRequest(state)
    }),
    (dispatch) => ({
        getGroupChats: (params = {}) => {
            dispatch(getGroupChats(params));
        },
        getPrivateChats: (params = {}) => {
            dispatch(getPrivateChats(params));
        }        
    })
)(Chats);

export default translate('translations')(Chats);