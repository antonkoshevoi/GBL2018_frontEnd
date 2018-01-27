import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from "immutable";
import Thread from './Thread';
import {Scrollbars} from "react-custom-scrollbars";

class ThreadBrowser extends Component {
  static propTypes = {
    threads: PropTypes.instanceOf(Immutable.Map).isRequired,
    onSelectThread: PropTypes.func.isRequired,
  };

  _renderThreads () {
    const { threads, onSelectThread, userData } = this.props;
    let views = [];

    threads.forEach((thread, key) => {
      views.push(
        <div key={key} onClick={() => { onSelectThread(thread.get('id')) }} >
          <Thread thread={thread} />
        </div>);
    });

    return views;
  }

  render() {

    return (
      <div className="m-widget1 m-widget1--paddingless">
        <span className="m-list-search__result-category">
            Conversations
        </span>
        <Scrollbars autoHeight={true}>
          { this._renderThreads() }
        </Scrollbars>
      </div>
    );
  }
}

export default ThreadBrowser;