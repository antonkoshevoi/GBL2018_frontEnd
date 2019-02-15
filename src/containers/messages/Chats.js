import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetPrivateChatsRequest, selectGetGroupChatsRequest } from '../../redux/messages/selectors';
import { getPrivateChats, getGroupChats } from '../../redux/messages/actions';
import { Avatar, CircularProgress } from '@material-ui/core';
import { debounce } from '../../helpers/utils';
import Chat from "./sections/Chat";
import moment from 'moment/moment';

class Chats extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            chatId: null,
            type: 'group',
            filter: ''
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
    
    _getRecords(type = 'group', params = {}) {
        if (type === 'group') {
            this.props.getGroupChats(params);
        } else {
            this.props.getPrivateChats(params);
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
        
        this._getRecords(type, {
                perPage: 1000,
                filter: {
                  composed: this.state.filter
              }
        });
    }    
    
    _onChangeFilter(value) {
        this.setState({ filter: value }, debounce(() => {
          this._getRecords(this.state.type, {
              filter: {
                  composed: value
              }
          });
        }, 1000));
    }    
    
    _renderGroups() {        
        const { groupChatsRequest, t} = this.props;        
        const {chatId} = this.state;
        
        if (groupChatsRequest.get('loading')) {            
            return <div className="m--margin-100"><CircularProgress /></div>;
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
                            {record.get('lastActivity') && <div className="text-muted">{moment(record.get('lastActivity')).format('lll')}</div>}
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
            return <div className="m--margin-100"><CircularProgress /></div>;
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
                            {record.get('lastActivity') && <div className="text-muted">{moment(record.get('lastActivity')).format('lll')}</div>}
                        </div>
                    </div>
                </div>
            );    
        });
    }
    
    _renderChats() {
        const {chatId, type, filter} = this.state;
        const {t} = this.props;        
        
        return (
            <div className='d-flex align-items-stretch'>
                <div className='row w-100 chats-container' ref={(node) => this.chatsContainer = node}>
                    <div className='col-5 col-md-4 col-lg-3 pr-0 chats-box'>
                        <div className="chat-types">
                            <div className="w-100 btn-group btn-group-toggle" data-toggle="buttons">
                                <button className={`w-50 btn btn-secondary ${type === 'group' ? 'active' : ''}`} onClick={() => this._setType('group')}>
                                    <i className="display-5 fa fa-users"></i>
                                </button>
                                <button className={`w-50 btn btn-secondary ${type === 'private' ? 'active' : ''}`} onClick={() => this._setType('private')}>
                                    <i className="display-5 fa fa-user"></i>
                                </button>   
                            </div>
                        </div>
                        <div className="search-chats">
                            <input 
                                onChange={(e) => { this._onChangeFilter(e.target.value) }} 
                                placeholder={t(type === 'group' ? 'searchGroups' : 'searchUsers')} 
                                className="form-control m-input--air form-control-success m-input"
                                value={filter}
                                type="text" />
                        </div>
                        <div className='chats'>
                            {type === 'group' ? this._renderGroups() : this._renderContacts()}
                        </div>
                    </div>
                    <div className='col-7 col-md-8 col-lg-9 pl-0'>
                        {chatId && <Chat chatId={chatId} />}
                    </div>                        
                </div>                
            </div>
        );
    }
    
    render() {
        const {t} = this.props;
        return (
            <div className='fadeInLeft'>     
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className={`m-portlet__head border-b-violet`}>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className={`m-portlet__head-icon violet`}><i className='fa fa-weixin'></i></span>
                                <h3 className='m-portlet__head-text'>{t('chats')}</h3>
                            </div>
                        </div>         
                    </div>             
                    <div>                    
                        {this._renderChats()}
                    </div>
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