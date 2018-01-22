import React, { Component } from 'react';
import Header from '../ui/Header';
import Sidebar from '../../components/layouts/Sidebar';
import Wrapper from '../../components/layouts/Wrapper';
import {withRouter} from "react-router-dom";
import {generateLinkId} from "../../helpers/utils";

class MainLayout extends Component {

  render () {
      const {pathname} = this.props.location;

      return (
      <div className={`m-grid m-grid--hor m-grid--root m-page m--full-height ${pathname.split('/')[1]}`} id={generateLinkId(pathname.split('/'))}>
        <div className='m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body'>
          <Header/>
          <Sidebar/>
          <Wrapper>
            {this.props.children}
          </Wrapper>
        </div>
      </div>
    );
  }
}

export default withRouter(MainLayout);