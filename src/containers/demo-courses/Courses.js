import React, {Component} from 'react';
import {Tab, Tabs} from '@material-ui/core';
import {translate} from "react-i18next";
import InvitationsTab from './InvitationsTab';
import DemoCoursesTab from './DemoCoursesTab';
import SearchInput from '../../components/ui/SearchInput';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demoCoursesSearch: '',
      invitationSearch: '',
      dialogIsOpen: false,
      activeTab: '1'
    }
  }

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  _handleSearch (value) {
    if (this.state.activeTab === '1') {
        this.setState({
          demoCoursesSearch: value
        })
    }

    if (this.state.activeTab === '2') {
        this.setState({
          invitationSearch: value
        })
    }
  }

  render() {
    const { activeTab } = this.state;
    const { t } = this.props;

    return (
      <div className='fadeInLeft  animated learning-areas'>
        <div className='m-portlet m-portlet--head-solid-bg'>
          <div className='m-portlet__head border-b-red'>
            <div className="m-portlet__head-tools">
              <Tabs value={this.state.activeTab} onChange={this.handleChange}>
                <Tab value="1" label={t('courses')} />
                <Tab value="2" label={t('invitations')} />
              </Tabs>
            </div>
            <div className="m-portlet__head-tools">
              <SearchInput
              className="portlet-header-input"
              id="search"
              type='search'
              placeholder={t('search')}
              onChange={(e) => { this._handleSearch(e) }}/>
            </div>
          </div>
          {activeTab === '1' && <DemoCoursesTab keyword={this.state.demoCoursesSearch}/>}
          {activeTab === '2' && <InvitationsTab keyword={this.state.invitationSearch}/>}
        </div>
      </div>
    );
  }
}

export default translate('translations')(Courses);
