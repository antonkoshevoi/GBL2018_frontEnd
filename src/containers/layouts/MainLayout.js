import React, { Component } from 'react';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import ParentSidebar from '../ui/ParentSidebar';
import Wrapper from '../../components/layouts/Wrapper';
import {withRouter} from "react-router-dom";
import {generateLinkId} from "../../helpers/utils";
import HasRole from "../middlewares/HasRole";

class MainLayout extends Component {

    state = {
        sidebarIsOpen:false
    }

    openMobileSidebar = event => {
        this.setState({sidebarIsOpen:!this.state.sidebarIsOpen})
    }



  render () {
      const {pathname} = this.props.location;
      const {sidebarIsOpen} = this.state;


      return (
      <div className={`m-grid m-grid--hor m-grid--root m-page m--full-height ${pathname.split('/')[1]}`} id={generateLinkId(pathname.split('/'))}>
        <div className={`m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body ${sidebarIsOpen ? 'm-sidebar-is-open' : ''}`}>
          <Header mobileSidebar={() => {this.openMobileSidebar()}}/>
          <HasRole roles={[
            'Superintendent',
            'Student',
            'Teacher',
            'Principal',
            'Administrator',
            'Superadministrator',
            'Affiliate',
          ]}>
            <Sidebar mobileSidebar={() => {this.openMobileSidebar()}}/>
          </HasRole>
          <HasRole roles={[
            "Parents"
          ]}>
            <ParentSidebar mobileSidebar={() => {this.openMobileSidebar()}}/>
          </HasRole>
          <Wrapper>
            {this.props.children}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default withRouter(MainLayout);