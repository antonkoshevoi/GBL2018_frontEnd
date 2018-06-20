import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import Immutable from "immutable";

class Thread extends Component {
  static propTypes = {
    thread: PropTypes.instanceOf(Immutable.Map).isRequired,
  };

  render() {
    const { thread } = this.props;

    let avatar;
    let title;

    if (thread.get('private')) {
      const userAvatar = thread.get('user').get('avatar');
      const username = thread.get('user').get('username');
      const color = thread.get('user').get('color');

      if (userAvatar) {
        avatar = (
          <span className="m-list-search__result-item-pic">
            <img className="m--img-rounded" src={userAvatar} title=""/>
          </span>
        );
      } else {

        avatar = (
          <span className={`m-messenger__conversation-no-pic m--bg-fill-${color}`}>
            <span>{username[0]}</span>
          </span>
        );
      }

      title = username;
    } else {
      avatar = (
        <span className={`m-messenger__conversation-no-pic m--bg-fill-default`}>
          <span>G</span>
        </span>
      );
      title = 'group';
    }

    return (
      <div className="m-list-search__result-item">
        <span className="m-list-search__result-item-pic">
          {avatar}
        </span>
        <span className="m-list-search__result-item-text">{ title }</span>
      </div>
    );
  }
}

export default Thread;