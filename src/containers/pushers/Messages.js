import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import { selectUserData } from '../../redux/user/selectors';
import { push } from 'react-router-redux';
import {NavLink} from "react-router-dom";

class Messages extends Component {

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
    const { user, t } = this.props;
    
    const newMessages = user.get('unreadMessages');

    return (

          <div>
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
              <h4 className="text-center m--padding-top-20 m--padding-bottom-10">{t('youHaveNoNewMessages')}</h4>
            }

            <div className="text-right m--margin-top-15">
              <NavLink to="/compose" className="m--margin-right-15 btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                <span className="m-nav__link-text">{t('newMessage')}</span>
              </NavLink>            
              <NavLink to="/messages" className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                <span className="m-nav__link-text">{t('seeAll')}</span>
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

export default translate('translations')(Messages);
