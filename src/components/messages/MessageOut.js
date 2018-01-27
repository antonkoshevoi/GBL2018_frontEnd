import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import RemarkComponent from './RemarkComponent';

class MessageIn extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
  };

  render() {
    const { body, avatar } = this.props;

    return (
      <div className="m-messenger__wrapper">
        <div className="m-messenger__message m-messenger__message--out">
          <div className="m-messenger__message-pic">
            <img src={avatar} alt="" className="mCS_img_loaded"/>
          </div>
          <div className="m-messenger__message-body">
            <div className="m-messenger__message-arrow"></div>
            <div className="m-messenger__message-content">
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