import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from "immutable";
import Thread from '../../components/messages/Thread';
import { connect } from 'react-redux';
import MetronicInput from '../../components/ui/metronic/MetronicInput';
import { selectAvailableUsers, selectGetAvailableUsersRequest } from '../../redux/messages/selectors';
import { getAvailableUsers } from '../../redux/messages/actions';

class UserBrowser extends Component {

  componentDidMount () {
    this.props.getUsers()
  }

  _renderUsers () {
    const { users } = this.props;

    return users.map((user, key) => {
      return (
        <div key={key} className="m-list-search__result-item">
          <span className="m-list-search__result-item-pic">
              <img className="m--img-rounded" src={user.get('avatar')} title=""/>
          </span>
          <span className="m-list-search__result-item-text">{ user.get('username') }</span>
        </div>);
    });
  }

  render() {

    return (
      <div className="m-widget1 m-widget1--paddingless">
        <span className="m-list-search__result-category m-list-search__result-category--first">
          Users
        </span>
        <MetronicInput/>
        { this._renderUsers() }
      </div>
    );
  }
}

UserBrowser = connect(
  (state) => ({
    users: selectAvailableUsers(state),
    getUsersRequest: selectGetAvailableUsersRequest(state)
  }),
  (dispatch) => ({
    getUsers: (keyword) => { dispatch(getAvailableUsers(keyword)) }
  })
)(UserBrowser);

export default UserBrowser;