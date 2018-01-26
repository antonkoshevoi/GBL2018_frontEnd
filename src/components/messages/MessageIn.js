import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import RemarkComponent from './RemarkComponent';

class MessageIn extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    avatar: PropTypes.string
  };

  render() {
    const { body, username, avatar, color } = this.props;

    return (
      <div className="m-messenger__wrapper">
        <div className="m-messenger__message m-messenger__message--in">
          {avatar ? (
            <div className="m-messenger__message-pic">
              <img src={avatar} alt="" className="mCS_img_loaded"/>
            </div>
          ) : (
            <div className={`m-messenger__message-no-pic m--bg-fill-${color}`}>
              <span>{ username[0] }</span>
            </div>
          )}
          <div className="m-messenger__message-body">
            <div className="m-messenger__message-arrow"></div>
            <div className="m-messenger__message-content">
              <div className="m-messenger__message-username">
                { username } wrote
              </div>
              <div className="m-messenger__message-text">
                <RemarkComponent text={body || '(empty)'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('messenger')(MessageIn);