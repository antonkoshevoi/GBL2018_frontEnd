import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import posterImage from '../../media/images/menu_poster.jpg'
import { Avatar } from 'material-ui';
import { selectUserData } from '../../redux/user/selectors';
import { push } from 'react-router-redux';
import * as pluralize from 'pluralize';

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
      <li className='m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width' data-dropdown-toggle='click' data-dropdown-persistent='true'>
        <a className='m-nav__link m-dropdown__toggle pointer' id='m_topbar_notification_icon' onClick={() => { switchMenu('messages') }}>
          <span className='m-nav__link-icon'>
            <i className='fa fa-envelope'/>
          </span>
        </a>
        {active &&
          <div className='m-dropdown__wrapper' onMouseLeave={() => { switchMenu(null) }} style={{display: 'block'}}>
            <div className='m-dropdown__inner'>
              <div className='m-dropdown__header m--align-center' style={{backgroundImage: `url(${posterImage})`}}>
                <span className='m-dropdown__header-title'>
                  {newMessages} New
                </span>
                <span className='m-dropdown__header-subtitle'>
                  { pluralize('Message', newMessages) }
                </span>
              </div>
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
              </div>
            </div>
          </div>}
      </li>
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
