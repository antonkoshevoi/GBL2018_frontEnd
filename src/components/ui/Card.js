import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@material-ui/core';

class Card extends Component {

  render() {
    const {
      avatar,
      className,
      title,
      icon,
      children,
      colorBorder,      
      iconBackground
    } = this.props;
    return (
      <div style={{marginBottom: 0, height: '100%', display: 'flex', flexDirection: 'column', ...this.props.style}}
           className={(className || '') + ' m-portlet  m-portlet--head-solid-bg'}
      >
        <div className={`m-portlet__head border-b-${colorBorder}`}>
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
              <span className="m-portlet__head-icon">
                  {avatar && avatar !== '' ? <Avatar src={avatar}/> : <i className={`${icon} ${iconBackground}`}></i>}
              </span>              
              <h3 className="m-portlet__head-text">
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className='m-portlet__body position-relative' style={{height: '100%'}}>
          {children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,  
  colorBorder: PropTypes.string
};

Card.defaultProps = {  
  colorBorder: 'blue',
  header: true,
  transparent: false,
  iconBackground: ''
};

export default Card;
