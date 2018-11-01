import React, { Component } from 'react';
import Header from '../ui/Header';
import Sidebar from '../ui/Sidebar';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import HasRole from "../middlewares/HasRole";
import MenuSchool from "../../data/Menu";
import MenuParent from "../../data/MenuParent";
import MenuStudent from "../../data/MenuStudent";
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
        const { location, auth }    = this.props;
        const { sidebarIsOpen }     = this.state;        

        const segments = location.pathname.split('/').filter(Boolean);                        
        
        const fullScreenPages = [
            'reports', 
            'my-reports'
        ];
        
        const hideMenu = (fullScreenPages.indexOf(segments[0]) !== -1) || !auth.get('isLoggedIn'); 

        return (
            <div className={`m-grid m-grid--hor m-grid--root m-page m--full-height ${segments[0]}`} id={segments.join('_')}>          
                <div className={`m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body ${sidebarIsOpen ? 'm-sidebar-is-open' : ''}`}>
                    <Header mobileSidebar={() => {this.openMobileSidebar()}}/>
                    {! hideMenu && <div>
                        <HasRole roles={['School']}>
                          <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuSchool}/>
                        </HasRole>
                        <HasRole roles={['Superadministrator']}>
                          <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={SuperAdminMenu}/>
                        </HasRole>
                        <HasRole roles={['Teacher']}>
                          <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuTeacher}/>
                        </HasRole>
                        <HasRole roles={['Parents']}>
                          <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuParent}/>
                        </HasRole>
                        <HasRole roles={['Student']}>
                          <Sidebar mobileSidebar={() => {this.openMobileSidebar()}} structure={MenuStudent}/>
                        </HasRole>
                    </div>}
                    <div className={`m-grid__item m-grid__item--fluid m-wrapper ${hideMenu ? 'margin-0' : ''}`}>               
                        <div className="m-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
      );
    }
}

MainLayout = connect(
  (state) => ({
    auth: state.auth
  })
)(MainLayout);

export default withRouter(MainLayout);