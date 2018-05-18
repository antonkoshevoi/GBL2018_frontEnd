import React, { Component } from 'react';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import Wrapper from '../../components/layouts/Wrapper';
import {withRouter} from "react-router-dom";
import {generateLinkId} from "../../helpers/utils";
import HasRole from "../middlewares/HasRole";

import MenuSchool from "../../data/Menu";
import MenuParent from "../../data/MenuParent";
import SuperAdminMenu from "../../data/SuperAdminMenu";
import MenuTeacher from "../../data/MenuTeacher";

class MainLayout extends Component {

    state = {
        sidebarIsOpen:false
    }

  openMobileSidebar = event => {
    if (window.innerWidth > 1240) {
      this.setState({sidebarIsOpen: !this.state.sidebarIsOpen});
    } else {
      const sidebarIsOpen = this.state.sidebarIsOpen;
      if (window.scrollY > 50) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if (!sidebarIsOpen) {
          this.setState({sidebarIsOpen: !this.state.sidebarIsOpen});
        }
      } else {
        this.setState({sidebarIsOpen: !this.state.sidebarIsOpen});
      }
    }
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
            'Principal',
            'Administrator',
            'Affiliate'
          ]}>
            <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuSchool}/>
          </HasRole>
          <HasRole roles={[
            'Superadministrator',
          ]}>
            <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={SuperAdminMenu}/>
          </HasRole>
          <HasRole roles={[
            'Teacher'
          ]}>
            <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuTeacher}/>
          </HasRole>
          <HasRole roles={[
            "Parents"
          ]}>
            <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuParent}/>
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