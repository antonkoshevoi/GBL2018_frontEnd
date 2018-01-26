import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { getThreads, selectThread, sendNewMessage } from '../../redux/messages/actions';
import { selectAllThreads, selectGetThreadsRequest, selectSelectedThread } from '../../redux/messages/selectors';
import Messenger from '../../components/messages/Messenger';
import ThreadBrowser from '../../components/messages/ThreadBrowser';
import MetronicInput from '../../components/ui/metronic/MetronicInput';
import UserBrowser from './UserBrowser';

class Messages extends Component {

  state = {
    selectedThreadId: undefined
  };

  componentDidMount () {
    const { getThreads } = this.props;
    getThreads();
  }

  componentWillReceiveProps (nextProps) {
    const success = this.props.getThreadsRequest.get('success');
    const nextSuccess = nextProps.getThreadsRequest.get('success');

    if (!success && nextSuccess) {
      this.setState({
        selectedThreadId: nextProps.threads.first().get('id')
      })
    }
  }

  _selectThread (id) {
    this.setState({
      selectedThreadId: id
    })
  }

  _sendNewMessage (message) {
    const { sendNewMessage } = this.props;
    const { selectedThreadId } = this.state;
    sendNewMessage(selectedThreadId, message);
  }

  render() {
    const { threads } = this.props;
    const { selectedThreadId } = this.state;
    const selectedThread = threads.get(`${selectedThreadId}`);

    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
            <div className="row m-portlet__body">
              <div className="col-lg-3">
                <div className="m-list-search">
                  <div className="m-list-search__results">
                    <UserBrowser/>
                    <ThreadBrowser
                      threads={threads}
                      onSelectThread={(id) => { this._selectThread(id) }}/>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                {selectedThread &&
                  <Messenger thread={selectedThread} onNewMessage={(message) => { this._sendNewMessage(message); }}/>}
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
  }),
  (dispatch) => ({
    getThreads: () => { dispatch(getThreads()) },
    sendNewMessage: (threadId, message) => { dispatch(sendNewMessage(threadId, message)) },
  })
)(Messages);

export default translate('profile')(Messages);