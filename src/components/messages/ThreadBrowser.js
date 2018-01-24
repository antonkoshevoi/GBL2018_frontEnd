import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from "immutable";
import Thread from './Thread';

class ThreadBrowser extends Component {
  static propTypes = {
    threads: PropTypes.instanceOf(Immutable.Map).isRequired,
    onSelectThread: PropTypes.func.isRequired,
    selectedThread: PropTypes.instanceOf(Immutable.Map)
  };

  _renderThreads () {
    const { threads, onSelectThread } = this.props;
    let views = [];

    threads.forEach((thread, key) => {
      views.push(
        <div key={key} onClick={() => { onSelectThread(thread.get('id')) }}>
          <Thread thread={thread}/>
        </div>);
    });

    return views;
  }

  render() {

    return (
      <div className="m-widget1 m-widget1--paddingless">
        { this._renderThreads() }
      </div>
    );
  }
}

export default ThreadBrowser;