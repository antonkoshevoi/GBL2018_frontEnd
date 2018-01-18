import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChartData from '../../../../data/Charts';
import {Doughnut, Line} from "react-chartjs";
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
            <div className="row">
                <div className="col-sm-6 col-md-3">
                    <Card title="Classroom N1" className="profile-card" avatar='https://www.responsiveclassroom.org/wp-content/uploads/2016/04/DSC_2388-1024x682.jpg'>
                        <InfoSection/>
                    </Card>
                </div>
                <div className="col-sm-6 col-md-3">
                    <Card title="Real Time Chart" icon="flaticon-diagram">
                        <Line data={this.state.data} options={this.state.options} width="500" height="350"/>
                    </Card>
                </div>

                <div className="col-sm-6 col-md-3">
                    <Card title="School Average Performance" icon="flaticon-list-2">
                        <Doughnut data={this.state.pieDataPerformance} options={this.state.options} width="350" height="180"/>
                        <div className="m-stack m-stack--ver m-stack--general" style={{height:'80px'}}>
                            {this._renderPieChartLabels(this.state.pieDataPerformance)}
                        </div>
                    </Card>
                </div>
                <div className="col-sm-6 col-md-3">
                    <Card title="School Average Progress" icon="flaticon-list-2">
                        <Doughnut data={this.state.pieDataProgress} options={this.state.options} width="350" height="180"/>
                        <div className="m-stack m-stack--ver m-stack--general" style={{height:'80px'}}>
                            {this._renderPieChartLabels(this.state.pieDataProgress)}
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

ChartsSection.propTypes = {};

export default ChartsSection;
