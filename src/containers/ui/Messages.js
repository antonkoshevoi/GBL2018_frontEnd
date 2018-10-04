import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import { selectGetUnreadMessagesRequest } from '../../redux/messages/selectors';
import { getUnreadMessages } from '../../redux/messages/actions';
import {NavLink} from "react-router-dom";
import {Typography} from '@material-ui/core';

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
          
    componentDidMount() {
        this.props.getMessages();
        
        this.interval = setInterval(() => this.tick(), 1000);
    }
    
    tick() {        
        this.setState((prevState) => {
            let seconds = prevState.seconds;
            if (seconds > 60) {
                this.props.getMessages();            
                seconds = 0;
            }
            return {
                seconds: seconds + 1
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
          
  _renderMessages () {
    const { unreadMessagesRequest } = this.props;

    return unreadMessagesRequest.get('records').map((message, key) => (
      <div key={key} className='m-widget1__item'>
        <div className='row m-row--no-padding align-items-center'>
          <div className='col-md-2 m--align-left'>
            <span className='m-widget1__number m--font-brand'>
              <Avatar src={ message.get('user').get('avatar') }/>
            </span>
          </div>
          <div className='col'>
            <NavLink to={`/messages/view/${message.get('id')}`}>
                <h3 className='m-widget1__title'>{ message.get('user').get('username') }</h3>
                <span className='m-widget1__desc'>{ message.get('subject') }</span>
            </NavLink>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { unreadMessagesRequest, activeMenu, t } = this.props;    
    
    const newMessages = unreadMessagesRequest.get('success') ?  unreadMessagesRequest.get('total') : null;

    return (
        <li className="m-nav__item m-topbar__Tasks m-topbar__Tasks--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
            <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={() => {this.props.switchMenu('messages')}}>
                <span className="m-nav__link-icon">
                    <i className="fa fa-envelope"></i>
                    {(newMessages > 0) && <span className="g-badge badge-red">{newMessages}</span> }
                </span>
            </a>
            {activeMenu === 'messages' && 
            <div className="m-dropdown__wrapper" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display: 'block'}}>
                <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'89.5px', color:'white'}}></span>
                <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                <div className="m-dropdown__inner">
                    <div className="m-dropdown__body">
                        <div className="m-dropdown__content">                                            
                            <Typography variant="subheading" style={{color: '#999'}}>
                                <i className="fa fa-envelope"></i> {t('messages')}
                            </Typography>                                                               
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
                                <NavLink to="/messages/new" className="m--margin-right-15 btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                                  <span className="m-nav__link-text">{t('newMessage')}</span>
                                </NavLink>            
                                <NavLink to="/messages" className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
                                  <span className="m-nav__link-text">{t('seeAll')}</span>
                                </NavLink>
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
    unreadMessagesRequest: selectGetUnreadMessagesRequest(state)
  }),
  (dispatch) => ({    
    getMessages: () => { dispatch(getUnreadMessages())}    
  })
)(Messages);

export default translate('translations')(Messages);
