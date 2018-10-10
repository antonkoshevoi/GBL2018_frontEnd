import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectSchool } from "../../redux/schools/selectors";
import { getSchool } from "../../redux/schools/actions";
import SchoolInfo from "./sections/SchoolInfo";
import SchoolDetails from "./sections/SchoolDetails";

class SchoolProfile extends Component {

    componentDidMount() {
        const {getSchool} = this.props;

        getSchool();
    }

    render() {
        const school = this.props.schoolRequest.get('record').toJS();
        const success = this.props.schoolRequest.get('success');

        return (
            <div className="row m--margin-top-20">
                <div className="col-md-12 col-lg-9 m-auto">
                    <div className="row">
                        <div className="col-lg-4">
                            <SchoolInfo school={school}/>
                        </div>
                        <div className="col-lg-8">
                            {success && <SchoolDetails school={school}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolProfile = connect(
    (state) => ({
        schoolRequest: selectSchool(state)
    }),
    (dispatch) => ({
        getSchool: () => {dispatch(getSchool())}
    })
)(SchoolProfile);

export default translate('translations')(SchoolProfile);