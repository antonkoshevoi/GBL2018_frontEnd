import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper, Tab, Tabs, Typography} from "material-ui";
import ProductCard from "./ProductCard";
import {NavLink} from "react-router-dom";


function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class StoreTabs extends Component {

  state = {
    value: "courses",
    tabCentered: false,
    tabFullWidth: false,
    tabScrollButtons: false
  };

  componentDidMount() {
    window.addEventListener("resize", this._setTabsOptions.bind(this));
  }


  _setTabsOptions() {
    if (window.innerWidth <= 767) {
      this.setState({
        tabCentered: true,
        tabFullWidth: true,
        tabScrollButtons: true
      });
    }
  }

  _renderEmptyDataMsg(){
    return (
      <div className="display-1">
        <h1 className="text-center">Store is empty</h1>
      </div>
    )
  }

  _renderCards(data) {
    if (!data || data.size == 0) {
      return this._renderEmptyDataMsg();
    }
    return data.map(function (item,i) {
      return  (
        <div className="col-sm-3 col-lg-4 col-xl-3">
          <ProductCard key={i} data={item}/>
        </div>
      )
    })
  }

  _renderSeeAllButton(category) {
    return (
      <div className="col-md-12 text-right with-divider m--padding-top-20 m--margin-top-20">
        <NavLink to={`store/category/${category}`} className="btn m-btn  btn-outline-success m-btn--outline-2x">
          See All
        </NavLink>
      </div>
    )
  }

  handleChange = (event, value) => {
    this.setState({value});
  };


  render() {

    const {value,  tabCentered, tabFullWidth, tabScrollButtons} = this.state;
    const {data} = this.props;

    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="m--margin-top-50">
            <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
              <div className="m-portlet__head d-inline-block">
                <div className="row">
                  <div className="m-portlet__head-tools text-left col-sm-8">
                    <Tabs
                      className="main-tabs"
                      value={this.state.value}
                      onChange={this.handleChange}
                      scrollable={true}
                      centered={tabCentered}
                      fullWidth={tabFullWidth}
                      scrollButtons={tabScrollButtons}


                    >
                      <Tab className="tab-header-item" value="courses" label="Courses"/>
                      <Tab className="tab-header-item" value="teaching_aids" label="Teaching Aids"/>
                      <Tab className="tab-header-item" value="books" label="Books"/>
                      <Tab className="tab-header-item" value="student_rewards" label="Student Rewards"/>
                      <Tab className="tab-header-item" value="stationary" label="Stationary"/>
                      <Tab className="tab-header-item" value="bundles" label="Bundles"/>
                    </Tabs>
                  </div>

                </div>

              </div>
              <div className="m-portlet__body" style={{height: "100%"}}>


                  {value === 'courses' &&
                  <TabContainer>
                    {this._renderCards(data)}
                    {data.size > 0 &&  this._renderSeeAllButton('courses')}
                  </TabContainer>
                  }
                  {value === 'teaching_aids' &&
                  <TabContainer>
                    {this._renderEmptyDataMsg()}
                    {data.size > 0 &&  this._renderSeeAllButton('teaching_aids')}
                  </TabContainer>
                  }
                  {value === 'books' &&
                  <TabContainer>
                    {this._renderEmptyDataMsg()}
                    {data.size > 0 &&  this._renderSeeAllButton('books')}
                  </TabContainer>
                  }
                  {value === 'student_rewards' &&
                  <TabContainer>
                    {this._renderEmptyDataMsg()}
                    {data.size > 0 &&  this._renderSeeAllButton('student_rewards')}
                  </TabContainer>
                  }
                  {value === 'stationary' &&
                  <TabContainer>
                    {this._renderEmptyDataMsg()}
                    {data.size > 0 &&  this._renderSeeAllButton('stationary')}
                  </TabContainer>
                  }
                {value === 'bundles' &&
                <TabContainer>
                  {this._renderEmptyDataMsg()}
                  {data.size > 0 &&  this._renderSeeAllButton('bundles')}
                </TabContainer>
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

StoreTabs.propTypes = {};

export default StoreTabs;
