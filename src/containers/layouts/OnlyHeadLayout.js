import React, {Component} from 'react';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import ParentSidebar from '../ui/ParentSidebar';
import Wrapper from '../../components/layouts/Wrapper';
import {withRouter} from "react-router-dom";
import {generateLinkId} from "../../helpers/utils";
import HasRole from "../middlewares/HasRole";

class MainLayout extends Component {

  state = {
    sidebarIsOpen: false
  }

  openMobileSidebar = event => {
    // this.setState({sidebarIsOpen:!this.state.sidebarIsOpen})
  }


  render() {
    const {pathname} = this.props.location;
    const {sidebarIsOpen} = this.state;


    return (
      <div className={`m-grid m-grid--hor m-grid--root m-page m--full-height ${pathname.split('/')[1]}`}
           id={generateLinkId(pathname.split('/'))}>
        <div
          className={`m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body ${sidebarIsOpen ? 'm-sidebar-is-open' : ''} justify-content-center`}>
          <Header mobileSidebar={() => {
            this.openMobileSidebar()
          }}/>

          <div className="m-grid__item m-grid__item--fluid d-flex justify-content-center ">
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