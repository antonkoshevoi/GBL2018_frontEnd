import React, {Component} from 'react';
import { GridList, GridListTile, GridListTileBar, IconButton} from '@material-ui/core';
import { NavLink } from "react-router-dom";
import {translate} from "react-i18next";

class StudentsGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {      
        cols: 4
    };
  }

  componentDidMount() {       
        this._setGridCols();
        window.addEventListener("resize", this._setGridCols.bind(this));
  }

  //TODO: need create UI component for Grids
  _setGridCols() {
    if (window.innerWidth <= 768) {      
      this.setState({cols: 2});
    } else if (window.innerWidth > 767 && window.innerWidth <= 1024) {
      this.setState({cols: 4});
    } else if (window.innerWidth > 1024 && window.innerWidth <= 1367) {
      this.setState({cols: 6});
    } else if (window.innerWidth > 1367) {
      this.setState({cols: 8});
    }
  }

  _renderStudents() {
    
    const defaultAvatar = '//s3.amazonaws.com/37assets/svn/765-default-avatar.png';
    const { t, students } = this.props;
   
    if (!students.length) {
      return <div className="display-1">
        <h1 className="text-center">{t('noStudents')}</h1>
      </div>;
    }

    return students.map(function (student, i) {
      return (
        <GridListTile key={i} className="grid-tile">
          <img src={(!student.avatar) ? defaultAvatar : student.avatar} alt={student.firstName}/>
          <GridListTileBar
            className="myGridTileBar"
            title={
              <NavLink to={`/reports/students/${student.id}`}>{student.firstName + " " + student.lastName}</NavLink>
            }
            subtitle={(
              <div>
                <span className="text-right d-block">{Math.round(student.passRate)} %</span>
                <div className="progress m-progress--sm">
                  <div title={t('completed')} className="progress-bar bg-success" role="progressbar" style={{width: student.completed + '%'}}></div>
                  <div title={t('inProgress')} className="progress-bar bg-warning" role="progressbar" style={{width: student.inProgress + '%'}}></div>
                </div>
                <br/>
                <div className="progress m-progress--sm">
                  <div title={t('averageGrade')} className="progress-bar bg-success" role="progressbar" style={{width: student.averageGrade + '%'}}></div>
                  <div title={t('averageGrade')} className="progress-bar bg-danger" role="progressbar" style={{width: (100 - Math.round(student.averageGrade)) + '%'}}></div>
                </div>
              </div>
            )}
            actionIcon={
              <IconButton color="default"></IconButton>
            }
          />
        </GridListTile>
      )
    })
  }

  render() {
    const { cols } = this.state;
    const { t, hideHeader } = this.props;
    
    const grid = <GridList cellHeight={250} cols={cols}>
        {this._renderStudents()}
    </GridList>;
    
    if (hideHeader) {
        return grid;
    }

    return (
      <div className="m--margin-top-25">
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
          <div className="m-portlet__head d-flex justify-content-between align-items-center">
            <div className="m-portlet__head-caption col-sm-4">
              <div className="m-portlet__head-title"><span className="m-portlet__head-icon"><i
                className="flaticon-analytics"></i></span><h3 className="m-portlet__head-text">{t('students')}</h3></div>
            </div>                
          </div>
          <div className="m-portlet__body" style={{height: '100%'}}>
              {grid}
          </div>
        </div>
      </div>  
    );
  }
}

export default translate('translations')(StudentsGrid);
