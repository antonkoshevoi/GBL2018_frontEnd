import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import '../../styles/messages.css';
import MessageIn from './MessageIn';
import MessageOut from './MessageOut';
import Immutable from "immutable";

class Messenger extends Component {
  static propTypes = {
    thread: PropTypes.instanceOf(Immutable.Map).isRequired,
    onNewMessage: PropTypes.func.isRequired,
  };

  state = {
    newMessage: ''
  };

  _scrollToBottom () {
    let element = document.getElementById('messages-container');
    element.scrollTop = element.scrollHeight;
  }

  /**
   * render messages by type
   * @private
   */
  _renderMessages () {
    const { thread } = this.props;
    const messages = thread.get('messages');

    return messages.reverse().map((message, key) => {

      if (message.get('type') === 'in') {

        return <MessageIn
          key={key}
          body={message.get('body')}
          username={message.get('user').get('username')}
          color={message.get('user').get('color')}
          avatar={message.get('user').get('avatar')}/>
      }

      if (message.get('type') === 'out') {
        return <MessageOut
          key={key}
          body={message.get('body')}/>
      }
    });
  };

  /**
   *
   * @param e
   * @private
   */
  _handleInputChange (e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  /**
   *
   * @param e
   * @private
   */
  _handleSubmit (e) {
    e.preventDefault();

    this.props.onNewMessage(this.state.newMessage);
    this.setState({
      newMessage: ''
    });
  }

  render() {
    return (
      <div className="m-messenger m-messenger--message-arrow m-messenger--skin-light">
        <div id='messages-container' className="m-messenger__messages mCS_7 mCS-autoHide" style={{height: '500px', position: 'relative', overflow: 'auto'}}>
          { this._renderMessages() }
        </div>

        <div className="m-messenger__seperator"></div>

        <form className="m-messenger__form" onSubmit={(e) => { this._handleSubmit(e); }}>
          <div className="m-messenger__form-controls">
            <input
              value={this.state.newMessage}
              onChange={(e) => { this._handleInputChange(e) }}
              type="text"
              name=""
              placeholder="Type here..."
              className="m-messenger__form-input"/>
          </div>
          <div className="m-messenger__form-tools">
            <a href="" className="m-messenger__form-attachment">
              <i className="la la-paperclip"></i>
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default translate('messenger')(Messenger);