import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { getThreads, selectThread, sendNewMessage } from '../../redux/messages/actions';
import { selectAllThreads, selectGetThreadsRequest, selectSelectedThread } from '../../redux/messages/selectors';
import Messenger from '../../components/messages/Messenger';
import ThreadBrowser from '../../components/messages/ThreadBrowser';

class Messages extends Component {

  componentDidMount () {
    const { getThreads } = this.props;
    getThreads();
  }

  _selectThread (id) {
    this.props.selectThread(id);
  }

  _sendNewMessage (message) {
    const { selectedThread, sendNewMessage } = this.props;
    sendNewMessage(selectedThread.get('id'), message);
  }

  render() {
    const { threads, selectedThread } = this.props;

    console.log(selectedThread);
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
            <div className="row m-portlet__body">
              <div className="col-lg-3">
                <ThreadBrowser
                  threads={threads}
                  selectedThread={selectedThread}
                  onSelectThread={(id) => { this._selectThread(id) }}/>
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
    selectedThread: selectSelectedThread(state),
    getThreadsRequest: selectGetThreadsRequest(state),
  }),
  (dispatch) => ({
    getThreads: () => { dispatch(getThreads()) },
    selectThread: (id) => { dispatch(selectThread(id)) },
    sendNewMessage: (threadId, message) => { dispatch(sendNewMessage(threadId, message)) },
  })
)(Messages);

export default translate('profile')(Messages);