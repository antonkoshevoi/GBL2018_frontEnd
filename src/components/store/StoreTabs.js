import React, {Component} from 'react';
import {Paper, Tab, Tabs, Typography, Grid, CircularProgress } from '@material-ui/core';
import ProductCard from "./ProductCard";
import {NavLink} from "react-router-dom";
import {translate} from "react-i18next";

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
    tabScrollButtons: 'off'
  };

  componentDidMount() {
    window.addEventListener("resize", this._setTabsOptions.bind(this));
  }

  _setTabsOptions() {
    if (window.innerWidth <= 1400) {
      this.setState({
        tabCentered: true,
        tabFullWidth: true,
        tabScrollButtons: 'on'
      });
    }
  }

  _renderEmptyDataMsg(){
    const {t} = this.props;
    return (
      <div className="display-1">
        <h1 className="text-center">{t('storeIsEmpty')}</h1>
      </div>
    )
  }

  _renderCards(data) {
    if (!data || data.size == 0) {
      return this._renderEmptyDataMsg();
    }
    return data.map(function (item,i) {
      return  (
        <div key={i} className="d-inline-block">
          <ProductCard data={item}/>
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
    this.props.getProducts(value);
  };

  render() {

    const {value,  tabCentered, tabFullWidth, tabScrollButtons} = this.state;
    const {data, isLoading, isSuccess, t} = this.props;

    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="m--margin-top-50">
            <div className="m-portlet  m-portlet--info">
              <div className="m-portlet__head d-inline-block">
                <div className="row">
                  <div className="m-portlet__head-tools text-left col-sm-8 border-b-blue">
                    <Tabs
                      className="main-tabs"
                      value={this.state.value}
                      onChange={this.handleChange}
                      scrollable={true}
                      centered={tabCentered}
                      fullWidth={true}
                      scrollButtons={'on'}
                    >
                      <Tab className="tab-header-item" value="courses" label={t('courses')}/>
                      <Tab className="tab-header-item" value="teaching_aids" label={t('teachingAids')}/>
                      <Tab className="tab-header-item" value="books" label={t('books')}/>
                      <Tab className="tab-header-item" value="student_rewards" label={t('studentRewards')}/>
                      <Tab className="tab-header-item" value="stationary" label={t('stationary')}/>
                      <Tab className="tab-header-item" value="bundles" label={t('bundles')}/>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className="m-portlet__body" style={{height: "100%"}}>

                {isLoading &&
                  <TabContainer>
                    <div className="full-width text-center m--margin-35">
                      <CircularProgress  size={70} />
                    </div>
                  </TabContainer>
                }

                  {(isSuccess && value === 'courses') &&
                  <TabContainer>
                    <Grid container spacing={24}>
                      {this._renderCards(data)}
                      {data.size > 0 &&  this._renderSeeAllButton('courses')}
                    </Grid>
                  </TabContainer>
                  }
                  {(isSuccess && value === 'teaching_aids') &&
                  <TabContainer>
                    {this._renderCards(data)}
                    {data.size > 0 &&  this._renderSeeAllButton('teaching_aids')}
                  </TabContainer>
                  }
                  {(isSuccess && value === 'books') &&
                  <TabContainer>
                    {this._renderCards(data)}
                    {data.size > 0 &&  this._renderSeeAllButton('books')}
                  </TabContainer>
                  }
                  {(isSuccess && value === 'student_rewards') &&
                  <TabContainer>
                    {this._renderCards(data)}
                    {data.size > 0 &&  this._renderSeeAllButton('student_rewards')}
                  </TabContainer>
                  }
                  {(isSuccess && value === 'stationary') &&
                  <TabContainer>
                    {this._renderCards(data)}
                    {data.size > 0 &&  this._renderSeeAllButton('stationary')}
                  </TabContainer>
                  }
                {(isSuccess && value === 'bundles') &&
                <TabContainer>
                  {this._renderCards(data)}
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

export default translate('translations')(StoreTabs);
