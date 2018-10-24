import React, {Component} from 'react';

class CardChart extends Component {

  render() {
    const {      
      title,      
      children,
      resetButtonLabel,
      resetButtonHandle
    } = this.props;
    return (
      <div style={{marginBottom: 0, height: '100%', display: 'flex', flexDirection: 'column', ...this.props.style}}
           className="m-portlet  m-portlet--head-solid-bg">
        <div className="m-portlet__head border-b-blue">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title online-users-chart-header">
              <span className="m-portlet__head-icon"><i className="fa fa-line-chart square-background circle-background"></i></span>              
              <h3 className="m-portlet__head-text">
                {title}
              </h3>
              <div className="m-portlet__head-text">
                <button type="button" className="btn btn-info btn-sm" onClick={resetButtonHandle}>
                  {resetButtonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="no-padding-top m-portlet__body position-relative" style={{height: '100%'}}>
          {children}
        </div>
      </div>
    );
  }
}

export default CardChart;
