import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectGetUnreadMessagesRequest } from '../../redux/messages/selectors';
import { getUnreadMessages } from '../../redux/messages/actions';
import { selectUserData } from "../../redux/user/selectors";
import { NavLink } from "react-router-dom";

class Messages extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            seconds: 0,
            counts: []
        };
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
    const { t, unreadMessagesRequest } = this.props;      
    return unreadMessagesRequest.get('records').map((item, key) => (
        <div key={key} className='mt-3'>
            <h6 className='my-0'>{t(item.get('type'))}
                {item.get('count') ?
                    <NavLink className='ml-2' to={`/messages/${item.get('type')}`} onClick={() => {this.props.switchMenu(null)}}>
                        <span className='m-badge m-badge--brand m-badge--wide'>{item.get('count')}</span>
                    </NavLink>
                : 
                    <span className='ml-2 m-badge m-badge--brand m-badge--wide m-badge--metal'>0</span>
                }
            </h6>
            <div className='my-3 m-separator m-separator--dashed'></div>
        </div>
    ));
  }

  render() {
    const { activeMenu , unreadMessagesRequest, t } = this.props;           
    let total = 0;    
    
    if (unreadMessagesRequest.get('success')) {
        unreadMessagesRequest.get('records').map((item) => {    
            total = total + item.get('count');
            return total;
        });
    }     
    
    return (
        <li className="m-nav__item m-topbar__Tasks m-topbar__Tasks--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
            {(total > 0) && <span className="g-badge badge-red">{total}</span> }
            <button className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={() => {this.props.switchMenu('messages')}}>
                <span className="m-nav__link-icon">
                    <i className="fa fa-envelope"></i>
                </span>
            </button>
            {activeMenu === 'messages' && 
            <div className="m-dropdown__wrapper messages" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display: 'block'}}>
                <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'89.5px', color:'white'}}></span>
                <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                <div className="m-dropdown__inner">
                    <div className="m-dropdown__body">
                        <div className="m-dropdown__content">
                            <h5 className="g-metal">
                                <i className="fa fa-envelope m--margin-right-5"></i> {t('messages')}
                            </h5>
                            <div>
                              {(total > 0) ?
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
        userData: selectUserData(state),
        unreadMessagesRequest: selectGetUnreadMessagesRequest(state)
    }),
    (dispatch) => ({    
        getMessages: () => { dispatch(getUnreadMessages())}    
    })
)(Messages);

export default translate('translations')(Messages);
