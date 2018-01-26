import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetronicSearchInput from '../ui/metronic/MetronicSearchInput';
import { CircularProgress } from 'material-ui';
import Immutable from "immutable";

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
    const { users, loading } = this.props;

    if (!loading && users.size === 0) {
      return (
        <div>
          <span className="m-list-search__result-item-text">Users not found</span>
        </div>
      );
    }

    return users.map((user, key) => {
      return (
        <div key={key} className="m-list-search__result-item" onClick={() => { this._onUserSelect(user.get('id')) }}>
          <span className="m-list-search__result-item-pic">
              <img className="m--img-rounded" src={user.get('avatar')} title=""/>
          </span>
          <span className="m-list-search__result-item-text">{ user.get('username') }</span>
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
        <div style={{ marginTop: '10px' }}>
          { this._renderUsers() }
        </div>
      </div>
    );
  }
}

export default UserBrowser;