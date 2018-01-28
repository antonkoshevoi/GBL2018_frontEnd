import React, {Component} from 'react';
import CardsSection from "../../../components/pages/reports/schools/CardsSection";
import TabSection from "../../../components/pages/reports/schools/TabSection";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {
    getUserSchool, getUserSchoolStudents, getUserSchoolClassrooms,
    getUserSchoolHomerooms, getUserSchoolTeachers, getUserSchoolAdmins
} from "../../../redux/reports/actions";
import {
    selectSchoolRequest, selectGetUserSchoolStudentsRequest,
    selectGetUserSchoolHomeroomsRequest, selectGetUserSchoolTeachersRequest,
    selectGetUserSchoolAdminsRequestRequest, selectGetUserSchoolClassroomsRequest
} from "../../../redux/reports/selectors.js";

class Schools extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // page: props.pagination.get('page'),
    //         // perPage: props.pagination.get('perPage')
    //     }
    // }

    // componentDidMount () {
    //     this.props.getUserSchool();
    //     this.props.getUserSchoolStudents();
    //     this.props.getUserSchoolHomerooms();
    //     this.props.getUserSchoolTeachers();
    //     this.props.getUserSchoolAdmins()
    // }

    componentDidMount () {

        const { getUserSchool } = this.props;
        getUserSchool();

        this.props.getUserSchool();

    }

    componentWillReceiveProps(nextProps) {

        const success = this.props.school.get('success');
        const nextSuccess = nextProps.school.get('success');
        const school = nextProps.school;

        if(!success && nextSuccess) {

            const schoolId = school.get('records').toJS().schId;

            this.props.getUserSchoolStudents(schoolId);
            this.props.getUserSchoolHomerooms(schoolId);
            this.props.getUserSchoolTeachers(schoolId);
            this.props.getUserSchoolAdmins(schoolId);
            this.props.getUserSchoolClassrooms(schoolId);

        }

    }

    render() {

        const { school, schoolStudents, schoolHomerooms, schoolTeachers, schoolAdmins, schoolClassrooms } = this.props;
        const loading = schoolHomerooms.get('loading');

        return (
            <div className="fadeInLeft  animated">
                    <CardsSection
                        loading = { loading }
                        school = { school }
                        studentCount = { schoolStudents.get('records').size}
                        homeroomsCount = { schoolHomerooms.get('records').size }
                        teachersCount = { schoolTeachers.get('records').size }
                        adminsCount = { schoolAdmins.get('records').size }
                        classroomsCount = { schoolClassrooms.get('records').size }
                    />
                    <TabSection
                        school = { school }
                        schoolStudents = { schoolStudents }
                        schoolHomerooms = { schoolHomerooms }
                        schoolClassrooms = { schoolClassrooms }
                    />

            </div>
        );
    }
}


Schools = connect(
    (state) => ({
        school: selectSchoolRequest(state),
        schoolStudents: selectGetUserSchoolStudentsRequest(state),
        schoolHomerooms: selectGetUserSchoolHomeroomsRequest(state),
        schoolTeachers: selectGetUserSchoolTeachersRequest(state),
        schoolAdmins: selectGetUserSchoolAdminsRequestRequest(state),
        schoolClassrooms: selectGetUserSchoolClassroomsRequest(state)
    }),
    (dispatch) => ({
        getUserSchoolClassrooms: () => { dispatch(getUserSchoolClassrooms()) },
        getUserSchoolAdmins: () => { dispatch(getUserSchoolAdmins()) },
        getUserSchoolTeachers: () => { dispatch(getUserSchoolTeachers()) },
        getUserSchoolStudents: () => { dispatch(getUserSchoolStudents()) },
        getUserSchoolHomerooms: () => { dispatch(getUserSchoolHomerooms()) },
        getUserSchool: () => { dispatch(getUserSchool()) }
    })
)(Schools);


export default translate('reports')(Schools);

// function mapStateToProps(state) {
//     return {};
// }
//
// export default translate("ClassRooms")(connect(
//     mapStateToProps,
// )(Schools));