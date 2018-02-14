import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectSchool } from "../../redux/schools/selectors";
import { getSchool } from "../../redux/schools/actions";
import SchoolInfo from "./sections/SchoolInfo";
import SchoolDetails from "./sections/SchoolDetails";

class SchoolProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount () {
    const { getSchool } = this.props;

    getSchool();
  }

  render() {
    const school = this.props.schoolRequest.get('record').toJS();
    const success = this.props.schoolRequest.get('success');

    return (
      <div className="row">
        <div className="col-lg-3">
          <SchoolInfo school={school}/>
        </div>
        <div className="col-lg-9">
          {success && <SchoolDetails school={school}/>}
        </div>
      </div>
    );
  }
}

SchoolProfile = connect(
  (state) => ({
    schoolRequest: selectSchool(state),
  }),
  (dispatch) => ({
    getSchool: () => { dispatch(getSchool()) },
  })
)(SchoolProfile);

export default translate('profile')(SchoolProfile);