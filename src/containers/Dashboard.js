import React, {Component} from 'react';
import {Line, Doughnut, Pie} from 'react-chartjs';

import Card from "../components/ui/Card";
import PortletWidgets from "../components/ui/PortletWidgets";
import Widget from "../data/Widgets";
import ChartData from "../data/Charts";

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
                <div key={i} className="m-stack__item m-stack__item--center m-stack__item--middle">
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
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">{item.title}</h3>
                        </div>
                        <div class="col m--align-right">
                            <span class="m-widget1__number m--font-brand">{item.value}</span>
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
                            <div class="m-widget1 m-widget1--paddingless">
                                {this._renderRosterStats(Widget.rosterStats)}
                            </div>
                        </Card>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <Card title="Real Time Chart" icon="flaticon-diagram" >
                            <Line data={this.state.data} ref="chartCanvas" options={this.state.options} width="500" height="350" />
                        </Card>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <Card title="School Average" icon="flaticon-list-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <Pie data={this.state.pieDataProgress} options={this.state.options} width="150" height="150"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-stack  d-flex flex-column justify-content-center   m-stack--ver m-stack--table">
                                        {this._renderPieChartLabels(this.state.pieDataProgress)}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Pie data={this.state.pieDataPerformance} options={this.state.options} width="150" height="150"/>
                                </div>
                                <div className="col-md-6">
                                    <div className="m-stack d-flex flex-column justify-content-center  m-stack--ver m-stack--table">
                                        {this._renderPieChartLabels(this.state.pieDataPerformance)}
                                    </div>
                                </div>
                            </div>

                        </Card>
                    </div>


                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <Card title="" header={false} icon="flaticon-list-2" transparent={true}>
                            <PortletWidgets fullWidth={true}  data={Widget.dashboard}/>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
