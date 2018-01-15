import React, { Component } from 'react';
import Header from '../ui/Header';
import Sidebar from '../../components/layouts/Sidebar';
import Wrapper from '../../components/layouts/Wrapper';

class MainLayout extends Component {

  render () {

    return (
      <div className='m-grid m-grid--hor m-grid--root m-page m--full-height'>
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

export default MainLayout;