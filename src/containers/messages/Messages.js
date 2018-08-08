import React, { Component } from 'react';
import Immutable from 'immutable';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { createNewThread, getAvailableUsers, getThreads, sendNewMessage } from '../../redux/messages/actions';
import {
  selectAllThreads, selectAvailableUsers, selectCreateNewThreadRequest, selectGetAvailableUsersRequest,
  selectGetThreadsRequest,
} from '../../redux/messages/selectors';
import Messenger from '../../components/messages/Messenger';
import ThreadBrowser from '../../components/messages/ThreadBrowser';
import UserBrowser from '../../components/messages/UserBrowser';
import {selectUserData} from "../../redux/user/selectors";
import {Scrollbars} from "react-custom-scrollbars";

class Messages extends Component {

  state = {
    selectedThreadId: undefined,
    newThread: undefined
  };

  componentDidMount () {
    const { getThreads, getUsers } = this.props;
    getThreads();
    getUsers();
  }

  componentWillReceiveProps (nextProps) {
    this._handleGetThreadsSuccess(nextProps);
    this._handleCreateThreadSuccess(nextProps);
    this._handleSetSelectThreadFromRoute(nextProps);
  }

  _handleSetSelectThreadFromRoute (nextProps) {
    const threadId = this.props.match.params.threadId;
    const nextThreadId = nextProps.match.params.threadId;

    if (threadId !== nextThreadId) {
      this.setState({
        selectedThreadId: nextThreadId
      })
    }
  }

  _handleGetThreadsSuccess (nextProps) {
    const success = this.props.getThreadsRequest.get('success');
    const nextSuccess = nextProps.getThreadsRequest.get('success');

    if (!success && nextSuccess && nextProps.threads.size > 0) {
      this.setState({
        selectedThreadId: nextProps.threads.first().get('id')
      })
    }
  }

  _handleCreateThreadSuccess (nextProps) {
    const success = this.props.createNewThreadRequest.get('success');
    const nextSuccess = nextProps.createNewThreadRequest.get('success');

    if (!success && nextSuccess) {
      this.setState({
        newThread: undefined,
        selectedThreadId: nextProps.threads.last().get('id')
      })
    }
  }

  _searchUsers (keyword) {
    this.props.getUsers(keyword);
  }

  _selectThread (id) {
    this.setState({
      newThread: undefined,
      selectedThreadId: id
    })
  }

  _sendNewMessage (message) {
    const { createNewThread, sendNewMessage } = this.props;
    const { newThread, selectedThreadId } = this.state;

    if (newThread !== undefined) {
      createNewThread(
        newThread.get('user').get('id'),
        message
      );
      return;
    }

    sendNewMessage(selectedThreadId, message);
  }

  _getThreads () {
    const { threads } = this.props;

    if (this.state.newThread !== undefined) {
      return threads.set('-1', this.state.newThread);
    }

    return threads;
  }

  _getSelectedThread () {
    if (this.state.newThread !== undefined) {
      return this.state.newThread;
    }

    const { threads } = this.props;
    const { selectedThreadId } = this.state;
    return threads.get(`${selectedThreadId}`);
  }

  _createThread (userId) {
    const { threads, users } = this.props;

    for (let item of threads) {
      const [ id, thread ] = item;
      if (thread.get('private') && thread.get('user').get('id') === userId) {
        this.setState({
          newThread: undefined,
          selectedThreadId: id
        });
        return;
      }
    }

    this.setState({
      newThread: Immutable.fromJS({
        id: -1,
        private: true,
        user: users.findEntry(user => user.get('id') === userId)[1].toJS(),
        messages: []
      })
    });
  }

  render() {
    const { users, getUsersRequest, userData, t } = this.props;
    const threads = this._getThreads();
    const selectedThread = this._getSelectedThread();

    return (      
        <div className="animated fadeInLeft">
          <div className="m-portlet messages-portlet  m-portlet--info">
          <div className='m-portlet__head border-b-blue'>
            <div className='m-portlet__head-caption'>
              <div className='m-portlet__head-title'>
                <span className='m-portlet__head-icon'>
		  <i className='la la-comments-o' style={{fontSize:'55px'}}></i>
                </span>
                <h3 className='m-portlet__head-text'>{t('messages')}</h3>
              </div>
            </div>
          </div>          
            <div className="m-portlet__body">
              <div className="row">
                <div className="col-lg-3 no-padding">
                  <div className="m-list-search">
                    <Scrollbars autoHide>
                    <div className="m-list-search__results">
                        <UserBrowser
                          users={users}
                          thread={selectedThread}
                          loading={getUsersRequest.get('loading')}
                          onSearch={(keyword) => { this._searchUsers(keyword); }}
                          onUserSelect={(id) => { this._createThread(id); }}/>
                        <ThreadBrowser
                          threads={threads}
                          onSelectThread={(id) => { this._selectThread(id) }}/>
                    </div>
                    </Scrollbars>
                  </div>
                </div>
                <div className="col-lg-9 no-padding">
                  {selectedThread &&
                    <Messenger thread={selectedThread} userData={userData} onNewMessage={(message) => { this._sendNewMessage(message); }}/>}
                </div>
              </div>
            </div>
          </div>
        </div>      
    );
  }
}

Messages = connect(
  (state) => ({
    threads: selectAllThreads(state),
    getThreadsRequest: selectGetThreadsRequest(state),
    users: selectAvailableUsers(state),
    getUsersRequest: selectGetAvailableUsersRequest(state),
    createNewThreadRequest: selectCreateNewThreadRequest(state),
    userData: selectUserData(state),
  }),
  (dispatch) => ({
    getThreads: () => { dispatch(getThreads()) },
    createNewThread: (userId, message) => { dispatch(createNewThread(userId, message)) },
    sendNewMessage: (threadId, message) => { dispatch(sendNewMessage(threadId, message)) },
    getUsers: (keyword) => { dispatch(getAvailableUsers(keyword)) }
  })
)(Messages);

export default translate('translations')(Messages);