import React, {Component} from 'react';
import {Line,Pie, Doughnut} from 'react-chartjs';
import PropTypes from 'prop-types';

import Card from "../components/ui/Card";
import PortletWidgets from "../components/ui/PortletWidgets";
import Widget from "../data/Widgets";

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
            pieConfig:{
                //String - The colour of each segment stroke
                segmentStrokeColor: "#FFF",

                //Number - The width of each segment stroke
                segmentStrokeWidth: 1,

                //Number - Amount of animation steps
                animationSteps: 10,

                //String - Animation easing effect
                animationEasing: "easeOutBounce",

                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,

                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: true,

                fullWidth: true,

                responsive: true,

                showInLegend: true,

                maintainAspectRatio: true,

                legendTemplate: "<ul style=\" display: inline;\" className=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li style=\"float: left; clear: both; list-style: none;\"><div className=\"indicator_box\" style=\"background-color:<%=segments[i].fillColor%>; padding: 5px ; margin: 8px 10px 5px 10px; display: block; float: left; \"></div><span style=\"font-size: 1.250em; word-wrap: break-word;\"><%if(segments[i].label){%><%=segments[i].label%><%}%></span></li><%}%></ul>",

                legend: {
                        display: true,
                    },
            },
            pieDataProgress:[
                {color: "#34bfa3", label: "complete", value: 20},
                {color: "#ffb822", label: "in progress", value: 25},
                {color: "#b4beea", label: "not started", value: 55}
            ],
            pieDataPerformance:[
                {color: "#34bfa3", label: "correct", value: 80},
                {color: "#c06", label: "incorrect", value: 20},
            ]
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


    _randomScalingFactor = function(){ return Math.round(Math.random()*40)};

    render() {
        return (
            <div>
                <h2>DASHBOARD PAGE</h2>

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
