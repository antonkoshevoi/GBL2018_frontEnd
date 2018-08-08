import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import '../../styles/messages.css';
import MessageIn from './MessageIn';
import MessageOut from './MessageOut';
import Immutable from "immutable";
import MessageDivider from './MessageDivider';
import {Scrollbars} from "react-custom-scrollbars";

class Messenger extends Component {
    static propTypes = {
        thread: PropTypes.instanceOf(Immutable.Map).isRequired,
        onNewMessage: PropTypes.func.isRequired,
    };

    state = {
          newMessage: ''
    };
  
    _scrollToBottom() {           
        const { scrollbars } = this.refs;
        scrollbars.scrollToBottom();        
    }  

    _renderMessages () {
        const { thread, userData, t } = this.props;
        const messages = thread.get('messages');        

        if (messages.size === 0) {
            return (
                <MessageDivider>{t('noMessagesYet')}</MessageDivider>
            );
        }

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
                    avatar={userData.get('avatar')}
                    body={message.get('body')}/>
            }
        });
    };

    _handleInputChange (e) {
        this.setState({
            newMessage: e.target.value
        });
    }

    _handleSubmit (e) {
        e.preventDefault();

        this.props.onNewMessage(this.state.newMessage);
        this.setState({
            newMessage: ''
        });    
    }
  
    componentDidMount() {
      this._scrollToBottom();
    }

    componentDidUpdate() {
      this._scrollToBottom();
    }

    render() {
        const { t } = this.props;
        return (
            <div className="m-messenger m-messenger--message-arrow m-messenger--skin-light">
              <div id='messages-container' className="m-messenger__messages mCS_7 mCS-autoHide" style={{height: '500px', position: 'relative', overflow: 'auto'}}>
                <Scrollbars ref="scrollbars">
                    { this._renderMessages() }
                </Scrollbars>          
              </div>

              <div className="m-messenger__seperator"></div>

              <form className="m-messenger__form" onSubmit={(e) => { this._handleSubmit(e); }}>
                <div className="m-messenger__form-controls">
                  <textarea
                    value={this.state.newMessage}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type="text"
                    name=""
                    rows={4}
                    placeholder={t('typeHere')}
                    className="m-messenger__form-input"></textarea>
                </div>
                <div className="m-messenger__form-tools">
                  <a className="m-messenger__form-attachment" onClick={(e) => { this._handleSubmit(e); }}>
                    <i className="la la-send"></i>
                  </a>
                </div>
              </form>
            </div>
        );
    }
}

export default translate('translations')(Messenger);