import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography} from "material-ui";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../../ui/table";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class TabSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'details'
    }
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  _renderTabs(courses) {
    return [
      courses.map(function (item, i) {
        return <Tab key={i} className="tab-header-item" value={item.course.crsId} label={item.course.crsTitle}/>
      }),
      <Tab className="tab-header-item" value="details" label="Detailed Data"/>
    ];
  }


  _renderTabContent(courses) {
    const {value} = this.state;
    const _self = this;
    return courses.map(function (item, i) {
      console.log(item.course.crsId, value);
      return (
        value == item.course.crsId && <TabContainer key={i}>
          {_self._renderLessonsTables(item)}
        </TabContainer>
      )
    })
  }

  _renderLessonsTables(item) {
    return (
      <Table>
        <Thead>
        <HeadRow>
          <Th first={true} width='20px'>#</Th>
          <Th width='132px'>Unit/lesson</Th>
          <Th width='172px'>Title / Description</Th>
          <Th width='100px'>Status</Th>
          <Th width='120px'>Passes/Required Passes</Th>
          <Th width='132px'>Comments</Th>
        </HeadRow>
        </Thead>
        <Tbody>
        {item.attemptsCurrent.map(function (attemptCurrent, i) {
          return (
            <Row index={i} key={i}>
              <Td first={true} width='20px'>{i + 1}</Td>
              <Td width='132px'>{item.course.crsTitle}</Td>
              <Td width='172px'></Td>
              <Td width='100px'>
                <span className='m-badge m-badge--brand m-badge--wide'>
                  {attemptCurrent.attempts == 0 ? 'Not started' : (attemptCurrent.passes == attemptCurrent.Required_Passes ? 'Completed' : 'In Progress') }
                </span>
              </Td>
              <Td width='120px'>{attemptCurrent.passes / attemptCurrent.Required_Passes}</Td>
              <Td width='132px'>{attemptCurrent.metadata}</Td>
            </Row>
          )
        })}
        </Tbody>
      </Table>
    )
  }

  _renderDetailedData(courses) {

  }

  render() {

    const { value } = this.state;
    const { data } = this.props;

    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="m--margin-top-40">
            <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
              <div className="m-portlet__head d-flex justify-content-between align-items-center">
                <div class="m-portlet__head-caption col-sm-4">
                  <div class="m-portlet__head-title"><span class="m-portlet__head-icon"><i
                    class="flaticon-analytics"></i></span><h3 class="m-portlet__head-text">Reports</h3></div>
                </div>
                <div className="m-portlet__head-tools col-sm-8">
                  <Tabs
                    className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs pull-right"
                    value={value}
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons={false}
                  >
                  {this._renderTabs(data)}
                  </Tabs>
                </div>
              </div>
              <div className="m-portlet__body" style={{height: "100%"}}>
                {this._renderTabContent(data)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TabSection.propTypes = {};

export default TabSection;
