import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../../ui/Card";
import InfoSection from "./InfoSection";
import SchoolAverageChart from "../../../../containers/pages/reports/widgets/SchoolAverageChart";
import PassRate from "../../../../containers/pages/reports/widgets/PassRate";
import LineChart from "../../../../containers/pages/reports/widgets/LineChart";

class ChartsSection extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    const school = this.props.school;
    const loading = this.props.loading;

    const data = [
      {
        title: 'Students',
        value: this.props.studentCount,
        colorName: 'info'
      },
      {
        title: 'Classrooms',
        value: this.props.classroomsCount,
        colorName: 'info'
      },
      {
        title: 'Homerooms',
        value: this.props.homeroomsCount,
        colorName: 'info'
      },
      {
        title: 'Teachers',
        value: this.props.teachersCount,
        colorName: 'info'
      },
      {
        title: 'Admins',
        value: this.props.adminsCount,
        colorName: 'info'
      }

    ];

    return (
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3">
          <Card title={'Roster'}
                className="profile-card"
                avatar={school.get('schAvatar') ? school.get('schAvatar') : ''}
                icon={'fa fa-institution'}>
            <InfoSection
              loading={loading}
              data={data}
            />
          </Card>
        </div>
        <LineChart/>
        <PassRate/>
        <SchoolAverageChart/>
      </div>
    );
  }
}

export default ChartsSection;
