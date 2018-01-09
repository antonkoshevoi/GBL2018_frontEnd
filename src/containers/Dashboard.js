import React, {Component} from 'react';
import {Line,Pie} from 'react-chartjs';
import PropTypes from 'prop-types';

import Card from "../components/ui/Card";

class Dashboard extends Component {


    constructor(props){
        super(props);
        this.state = {
            data:{
                labels: ["0", "1", "2", "3", "4", "5", "6","7"],
                datasets: [{
                    label: "My First dataset",
                    fillColor : "#ee2b2e78",
                    pointRadius: 0,
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#ff1312",
                    pointHighlightFill : "#35b3ff",
                    pointHighlightStroke : "rgba(220,220,220,1)",
                    data: [
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),
                        this._randomScalingFactor(),

                    ],
                    yAxisID: "y-axis-1",
                }]
            },
            options:{
                responsive: true,
                hoverMode: 'index',
                stacked: true,
                display: false,
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                        }
                    }
                },
                tooltips: {
                    enabled: false
                },
                title:{
                    display: false,
                    text:'Chart.js Line Chart - Multi Axis'
                },
                scales: {
                    yAxes: [{
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: false,
                        position: "left",
                        id: "y-axis-1",
                        gridLines: {
                            display:false
                        }
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: false,
                        position: "right",
                        id: "y-axis-2",
                        // grid line settings
                        gridLines: {
                            display: false, // only want the grid lines for one axis to show up
                        },
                    }],
                }
            },
            pieData:[
                {color: "#34bfa3", label: "test1", value: 1},
                {color: "red", label: "test2", value: 2},
                {color: "#ffb822", label: "test3", value: 2}
            ]
        }
    }




    _randomScalingFactor = function(){ return Math.round(Math.random()*40)};

    render() {
        return (
            <div>
                <h2>DASHBOARD PAGE</h2>
                <div className="row">
                    <div className="col-sm-6 col-md-3">
                        <Card title="Real Time Chart" icon="flaticon-diagram">
                            <Line data={this.state.data} options={this.state.options} width="500" height="350"/>
                        </Card>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Card title="Roster Statistics" icon="flaticon-list-3">

                        </Card>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Card title="School Average" icon="flaticon-list-2">
                            <Pie data={this.state.pieData} options={this.state.options} width="500" height="350"/>
                        </Card>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Card/>
                    </div>
                </div>

            </div>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
