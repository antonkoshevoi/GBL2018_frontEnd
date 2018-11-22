import React, {Component} from 'react';
import Header from '../ui/Header';
import {withRouter} from "react-router-dom";

class MainLayout extends Component {

  render() {
    const {pathname} = this.props.location;                
    const segments = pathname.split('/').filter(Boolean);         
    
    return (
      <div className={`m-header--fixed m-header--fixed-mobile m-page m--full-height ${segments[0]}`} id={segments.join('_')}>
        <div className="m-body main-background justify-content-center">
          <Header hideMenu={true} mobileSidebar={ () => {} }/>
          <div className="m--padding-bottom-30">            
              {this.props.children}            
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MainLayout);