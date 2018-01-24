import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'material-ui';
import Immutable from "immutable";

class Thread extends Component {
  static propTypes = {
    thread: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  render() {
    const { thread } = this.props;

    const messages = thread.get('messages');
    let preview = 'No messages yet';

    if (messages.size > 0) {
      preview = messages.get(0).get('body');
    }

    let avatar;
    let title;

    if (thread.get('private')) {
      const userAvatar = thread.get('user').get('avatar');
      const username = thread.get('user').get('username');
      const color = thread.get('user').get('color');

      if (userAvatar) {
        avatar = <Avatar src={userAvatar}/>;
      } else {

        avatar = (
          <div className={`m-messenger__message-no-pic m--bg-fill-${color}`}>
            <span>{username[0]}</span>
          </div>
        );
      }

      title = username;
    } else {
      avatar = <Avatar src='/'/>;
      title = 'group';
    }

    return (
      <div className="m-widget1__item thread">
        <div className="row m-row--no-padding align-items-center">
          <div className="col-md-2 m--align-left">
            <span className="m-widget1__number m--font-brand">
              { avatar }
            </span>
          </div>
          <div className="col">
            <h3 className="m-widget1__title">{ title }</h3>
            <span className="m-widget1__desc">{ preview }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Thread;