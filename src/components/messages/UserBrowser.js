import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetronicSearchInput from '../ui/metronic/MetronicSearchInput';
import { CircularProgress } from '@material-ui/core';
import Immutable from "immutable";
import {Scrollbars} from "react-custom-scrollbars";

class UserBrowser extends Component {
  static propTypes = {
    users: PropTypes.instanceOf(Immutable.List).isRequired,
    loading: PropTypes.bool,
    onSearch: PropTypes.func.isRequired,
    onUserSelect: PropTypes.func.isRequired
  };

  _onUserSelect (id) {
    this.props.onUserSelect(id);
  }

  _renderUsers () {
    const { users, loading, thread } = this.props;
    const activeUserName = (thread !== undefined) ? thread.get('user').get('username') : '';

      if (!loading && users.size === 0) {
      return (
        <div>
          <span className="m-list-search__result-item-text">Users not found</span>
        </div>
      );
    }

    return users.map((user, key) => {

      return (
          <div className={`m-widget4__item pointer ${activeUserName === user.get('username') && 'active'}`} key={key}
               onClick={() => { this._onUserSelect(user.get('id')) }}>
              <div className="m-widget4__img m-widget4__img--pic">
                  <img src={user.get('avatar')} alt={ user.get('username') }/>
              </div>
              <div className="m-widget4__info">
                    <span className="m-widget4__title">
                    { user.get('username') }
                    </span><br/>
                    <span className="m-widget4__sub">
                    </span>
              </div>
          </div>       
      );
    });
  }

  render() {
    const { loading, onSearch } = this.props;

    return (
      <div className="m-widget1 m-widget1--paddingless">
        <span className="m-list-search__result-category m-list-search__result-category--first">
          Users
        </span>
        <div className="m-input-icon m-input-icon--right">
          <MetronicSearchInput
            className="form-control m-input"
            id="search"
            type='search'
            placeholder="Search..."
            onChange={onSearch}/>
          <span className="m-input-icon__icon m-input-icon__icon--right">
            {loading ? (
              <CircularProgress style={{
                width: '25px',
                height: '25px',
                marginTop: '5px',
                color: 'inherit'
              }}/>
            ) : (
              <span><i className="la la-search"/></span>
            )}
          </span>
        </div>
        <div style={{ marginTop: '10px' }} className="m-widget4 message-users-list">
            <Scrollbars >
                { this._renderUsers() }
            </Scrollbars>
        </div>
      </div>
    );
  }
}

export default UserBrowser;