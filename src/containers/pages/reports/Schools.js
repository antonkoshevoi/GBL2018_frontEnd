import React, {Component} from 'react';
import * as AUTH from '../../../services/AuthService'
import InfoSection from "../../../components/pages/reports/schools/InfoSection";
import CardsSection from "../../../components/pages/reports/schools/CardsSection";
import TabSection from "../../../components/pages/reports/schools/TabSection";
import SubHeader from "../../../components/layouts/SubHeader";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {getUserSchool, getSchoolStudents, getSchoolHomerooms} from "../../../redux/schools/actions";
import {selectSchool, selectGetSchoolStudentsRequest, selectGetSchoolHomeroomsRequest} from "../../../redux/schools/selectors.js";

class Schools extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // page: props.pagination.get('page'),
            // perPage: props.pagination.get('perPage')
        }
    }

    componentDidMount () {
        this.props.getUserSchool();
        this.props.getSchoolStudents();
        this.props.getSchoolHomerooms();
        // this.props.resetBulkUploadRequest()
    }

    render() {

        const { school, schoolStudents, schoolHomerooms } = this.props;
        const loading = schoolHomerooms.get('loading');

        console.log(loading);
        return (
            <div className="fadeInLeft  animated">
                    <CardsSection
                        loading = { loading }
                        school = { school }
                        studentCount = { schoolStudents.get('records').size}
                        homeroomsCount = { schoolHomerooms.get('records').size }
                    />
                    <TabSection
                        school = { school }
                        schoolStudents = { schoolStudents }
                        schoolHomerooms = { schoolHomerooms }
                    />

            </div>
        );
    }
}


Schools = connect(
    (state) => ({
        school: selectSchool(state),
        schoolStudents: selectGetSchoolStudentsRequest(state),
        schoolHomerooms: selectGetSchoolHomeroomsRequest(state)
    }),
    (dispatch) => ({
        getSchoolStudents: () => { dispatch(getSchoolStudents(1)) },
        getSchoolHomerooms: () => { dispatch(getSchoolHomerooms(1)) },
        getUserSchool: () => { dispatch(getUserSchool(1)) }
    })
)(Schools);


export default translate('schools')(Schools);

// function mapStateToProps(state) {
//     return {};
// }
//
// export default translate("ClassRooms")(connect(
//     mapStateToProps,
// )(Schools));