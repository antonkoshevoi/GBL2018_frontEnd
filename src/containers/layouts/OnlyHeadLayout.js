import React, {Component} from 'react';
import Header from '../ui/Header';
import {withRouter} from "react-router-dom";
import background from '../../media/images/bg-3.jpg';

class MainLayout extends Component {

  render() {
    const {pathname} = this.props.location;                
    const segments = pathname.split('/').filter(Boolean);         
    
    return (
      <div className={`m-grid m-grid--hor m-grid--root m-page m--full-height ${segments[0]}`} id={segments.join('_')}>
        <div
          className="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body justify-content-center">
          <Header hideMenu={true} mobileSidebar={ () => {} }/>

          <div style={{backgroundImage: `url(${background})`}} className="m-grid__item m-grid__item--fluid d-flex justify-content-center ">
            <div className="m-content col-10 ">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MainLayout);