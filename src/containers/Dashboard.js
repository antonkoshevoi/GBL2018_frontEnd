import React, {Component} from 'react';
import {Line, Doughnut, Pie} from 'react-chartjs';

import Card from "../components/ui/Card";
import PortletWidgets from "../components/ui/PortletWidgets";
import Widget from "../data/Widgets";
import ChartData from "../data/Charts";
import classRoomSvg from '../media/images/classroom.svg';

class Dashboard extends Component {


    constructor(props){
        super(props);
        this.state = {
            ...ChartData
        }
    }


    _renderPieChartLabels(labels) {
        return labels.map(function (item,i) {
            return (
                <div key={i} className="m-stack__item m--margin-bottom-5 m-stack__item--center m-stack__item--middle">
                    <span className="m-badge m-badge--success" style={{marginRight:'8px', backgroundColor:item.color}}></span>
                    <span>{item.value+'%  '}</span>
                    <span style={{whiteSpace:'pre'}}>{item.label}</span>
                </div>
            )
        })
    }


    _renderRosterStats(stats) {
        return stats.map(function (item,i) {
            return (
                <div key={i} className="m-widget1__item">
                    <div className="row m-row--no-padding align-items-center">
                        <div className="col">
                            <h3 className="m-widget1__title">{item.title}</h3>
                        </div>
                        <div className="col m--align-right">
                            <span className="m-widget1__number m--font-brand">{item.value}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }


    componentDidMount(){
        console.log(this.refs.chartCanvas);
    }

    render() {
        return (
            <div className="fadeInLeft  animated">

                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <Card title="Roster Statistics" icon="flaticon-list-3" >
                            <div className="m-widget1 m-widget1--paddingless">
                                {this._renderRosterStats(Widget.rosterStats)}
                            </div>
                        </Card>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <Card title="Real Time Chart" icon="flaticon-diagram" >
                            <Line data={this.state.data} ref="chartCanvas" options={this.state.options} width="400" height="280" />
                        </Card>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="small-card-content">
                            <div className="small-card">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-3 pie-block">
                                        <Pie data={this.state.pieDataProgress} options={this.state.options} width="70" height="70"/>
                                    </div>
                                    <div className="col-xl-8 col-lg-9">
                                        <div className="m-stack m--padding-left-20  d-flex flex-column justify-content-center   m-stack--ver m-stack--table">
                                           <h5> School Average</h5>
                                            <legend>Progress</legend>
                                            {this._renderPieChartLabels(this.state.pieDataProgress)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="small-card">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-3 pie-block">
                                        <Pie data={this.state.pieDataPerformance} options={this.state.options} width="70" height="70"/>
                                    </div>
                                    <div className="col-xl-8 col-lg-9">
                                        <div className="m-stack m--padding-left-20 d-flex flex-column justify-content-center  m-stack--ver m-stack--table">
                                            <h5> School Average</h5>
                                            <legend>Performance</legend>
                                            {this._renderPieChartLabels(this.state.pieDataPerformance)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-12 col-md-6 col-lg-3">

                            <div className="small-card-content">
                                <div className="small-card">
                                    <div className="row m--full-height  m--padding-right-10 m--padding-left-10 align-items-center">
                                        <div className="col ">
                                            <span className="m-widget1__number m--font-brand">
                                                 <i className="fa fa-film widget-icon"></i>
                                            </span>
                                        </div>
                                        <div className="col m--align-right">
                                            <h5 className="m-widget1__title">How-To</h5>
                                            <span  className="widget-desc">Movies</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-card">
                                    <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                                        <div className="col ">
                                            <span className="m-widget1__number m--font-brand">
                                                <img width={70} src={classRoomSvg} alt="svg"/>
                                            </span>
                                        </div>
                                        <div className="col m--align-right">
                                            <span  className="widget-desc">Professional</span>
                                            <h5 className="m-widget1__title">Training</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-card">
                                    <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                                        <div className="col ">
                                            <span className="m-widget1__number m--font-brand">
                                                <i className="fa fa-share-alt widget-icon"></i>
                                            </span>
                                        </div>
                                        <div className="col m--align-right ">
                                            <h5 className="m-widget1__title">Sharing</h5>
                                            <span className="widget-desc">Messages, Chats, +</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-card">
                                    <div className="row m--full-height m--padding-right-10 m--padding-left-10 align-items-center">
                                        <div className="col ">
                                            <span className="m-widget1__number m--font-brand">
                                                <i className="fa fa-id-card widget-icon"></i>
                                            </span>
                                        </div>
                                        <div className="col m--align-right">
                                            <span  className="widget-desc">Student Centered <br/>
                                                    Planning and assessment</span>
                                            <h5 className="m-widget1__title">S-CAP</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>


                    </div>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
