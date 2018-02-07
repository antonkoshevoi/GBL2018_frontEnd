import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChartData from '../../../../../data/Charts';
import Card from "../../../../../components/ui/Card";
import { Line } from "react-chartjs";

class LineChart extends Component {
  static propTypes = {
    classroomId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      ...ChartData
    }
  }

  render() {
    return (
      <Card title="Real Time Chart" icon="flaticon-diagram">
        <Line data={this.state.data} options={this.state.options} width="500" height="350"/>
      </Card>
    );
  }
}

export default LineChart;
