import React, {Component} from 'react';
import {Line, Doughnut} from 'react-chartjs';

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



    render() {
        return (
            <div className="fadeInLeft  animated">
                <h3>DASHBOARD PAGE</h3>

                <PortletWidgets data={Widget.dashboard}/>
                <PortletWidgets data={Widget.rosterStats} title="Roster Statistics" icon="flaticon-list-3"/>


                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <Card title="Real Time Chart" icon="flaticon-diagram">
                            <Line data={this.state.data} options={this.state.options} width="500" height="350"/>
                        </Card>
                    </div>

                    <div className="col-sm-6 col-md-4">
                        <Card title="School Average" icon="flaticon-list-2">
                            <Doughnut data={this.state.pieDataPerformance} options={this.state.options} width="350" height="180"/>
                            <div className="m-stack m-stack--ver m-stack--general" style={{height:'80px'}}>
                                {this._renderPieChartLabels(this.state.pieDataPerformance)}
                            </div>
                        </Card>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <Card title="School Average" icon="flaticon-list-2">
                            <Doughnut data={this.state.pieDataProgress} options={this.state.options} width="350" height="180"/>
                            <div className="m-stack m-stack--ver m-stack--general" style={{height:'80px'}}>
                                {this._renderPieChartLabels(this.state.pieDataProgress)}
                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
