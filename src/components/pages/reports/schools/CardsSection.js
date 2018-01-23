import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChartData from '../../../../data/Charts';
import {Doughnut, Line, Pie} from "react-chartjs";
import Card from "../../../ui/Card";
import InfoSection from "./InfoSection";


class ChartsSection extends Component {

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

    render() {

        return (
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <Card title="School N184" className="profile-card" avatar='http://admissions.berkeley.edu/sites/default/files/UCB_landingpage_images_600x300_212.jpg'>
                        <InfoSection data={this.props.data}/>
                    </Card>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <Card title="Real Time Chart" icon="flaticon-diagram">
                        <Line data={this.state.data} options={this.state.options} width="500" height="350"/>
                    </Card>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <Card title="Pass Rate" icon="flaticon-list-2" className='passRateCard'>
                        <h1  className="d-flex justify-content-center align-items-center absolute-center" style={{fontSize:'7rem',color:'rgb(0, 128, 0)'}}>28%</h1>
                    </Card>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="small-card-content">
                        <div className="small-card">
                            <div className="row">
                                <div className="col-md-5 pie-block">
                                    <Pie data={this.state.pieDataProgress} options={this.state.options} width="100" height="100"/>
                                </div>
                                <div className="col-md-7 pie-block">
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
                                <div className="col-md-5 pie-block">
                                    <Pie data={this.state.pieDataPerformance} options={this.state.options} width="100" height="100"/>
                                </div>
                                <div className="col-md-7  pie-block">
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
            </div>
        );
    }
}

ChartsSection.propTypes = {};

export default ChartsSection;
