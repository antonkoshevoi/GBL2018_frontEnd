import React, {Component} from 'react';

class Card extends Component {

  render() {
    const {      
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
        <div className={`m-portlet__head border-b-${colorBorder || 'blue'}`}>
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
              <span className="m-portlet__head-icon">
                  <i className={`${icon} ${iconBackground || ''}`}></i>
              </span>              
              <h3 className="m-portlet__head-text">
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className='m-portlet__body position-relative h-100'>
          {children}
        </div>
      </div>
    );
  }
}

export default Card;
