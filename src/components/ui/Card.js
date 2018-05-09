import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar} from 'material-ui';
import Button from 'material-ui/Button';

class Card extends Component {


  render() {
    const {
      avatar,
      className,
      title,
      icon,
      children,
      header,
      colorName,
      colorBorder,
      transparent,
      iconBackground,
      boxShadow,
      bodyStyle,
      isMainCard,
      isStore,
      isChart,
      isResetChartButton
    } = this.props;
    return (
      <div style={{marginBottom: 0, height: '100%', display: 'flex', flexDirection: 'column', ...this.props.style}}
           className={className + ' m-portlet  m-portlet--head-solid-bg m-portlet--' + colorName +
           (transparent ? ' transparent' : '') + (isStore ? ' dashboard-store' : '')}

      >
        <div className={`m-portlet__head ${isMainCard ? 'report-snapshot-header-border' : ''}
           ${!header ? 'm--hide' : ''} border-b-${colorBorder}`}>
          <div className="m-portlet__head-caption">
            <div className={`m-portlet__head-title ${isResetChartButton && 'online-users-chart-header'}`}>
              {!isMainCard && <span className="m-portlet__head-icon {{}}">
                            {avatar && avatar !== '' ?
                              <Avatar src={avatar}/> :
                              <i className={`${icon} ${iconBackground}`}></i>}
						</span>
              }

              <h3 className="m-portlet__head-text">
                {title}
              </h3>
              {isResetChartButton && <div className="m-portlet__head-text" onClick={this.props.resetDate}>
                <Button variant="raised" size="small" color="primary">
                  Reset
                </Button>
              </div>}
            </div>
          </div>

        </div>
        <div
          className={(isStore ? 'dashboard-store-body ' : '') + (isChart ? 'no-padding-top ' : '') + 'm-portlet__body position-relative'}
          style={{height: '100%', ...bodyStyle}}>
          {children}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  colorName: PropTypes.string,
  colorBorder: PropTypes.string
};

Card.defaultProps = {
  colorName: '',
  colorBorder: 'blue',
  header: true,
  transparent: false,
  iconBackground: ''
};

export default Card;
