import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import posterImage from '../../media/images/menu_poster.jpg'
import { Avatar } from 'material-ui';
import { selectUserData } from '../../redux/user/selectors';
import { push } from 'react-router-redux';
import * as pluralize from 'pluralize';
import {NavLink} from "react-router-dom";

class Messages extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuOpened: false
    };
  }

  _renderMessages () {
    const { user, goToThread } = this.props;

    return user.get('messages').map((message, key) => (
      <div key={key} className='m-widget1__item' onClick={() => { goToThread(message.get('threadId')) }}>
        <div className='row m-row--no-padding align-items-center'>
          <div className='col-md-2 m--align-left'>
            <span className='m-widget1__number m--font-brand'>
              <Avatar src={ message.get('user').get('avatar') }/>
            </span>
          </div>
          <div className='col'>
            <h3 className='m-widget1__title'>{ message.get('user').get('username') }</h3>
            <span className='m-widget1__desc'>{ message.get('body') }</span>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { user, activeMenu, switchMenu } = this.props;
    const active = activeMenu === 'messages';

    const newMessages = user.get('unreadMessages');

    return (

          <div className=''>
            {newMessages ?

              <div className='m-dropdown__body'>
                <div className='m-dropdown__content'>
                  <div className='tab-content'>
                    <div className='tab-pane active show'>
                      <div className='m-widget1 m-widget1--paddingless'>
                        { this._renderMessages() }
                      </div>
                    </div>
                  </div>
                </div>
              </div> :
              <h4 className="text-center m--padding-top-20 m--padding-bottom-10">You have no new messages</h4>
            }

            <div className="text-right m--margin-top-15">
              <NavLink to="/messages" className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                <span className="m-nav__link-text">See All</span>
              </NavLink>
            </div>

          </div>
    );
  }
}

Messages = connect(
  (state) => ({
    user: selectUserData(state)
  }),
  (dispatch) => ({
    goToThread: (threadId) => { dispatch(push(`/messages/${threadId}`)) }
  })
)(Messages);

export default translate('Messages')(Messages);
