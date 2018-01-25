import React, {Component} from 'react';
import CardsSection from "../../../components/pages/reports/schools/CardsSection";
import TabSection from "../../../components/pages/reports/schools/TabSection";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {
    getUserSchool, getUserSchoolStudents,
    getUserSchoolHomerooms, getUserSchoolTeachers, getUserSchoolAdmins
} from "../../../redux/reports/actions";
import {
    selectSchool, selectGetUserSchoolStudentsRequest,
    selectGetUserSchoolHomeroomsRequest, selectGetUserSchoolTeachersRequest,
    selectGetUserSchoolAdminsRequestRequest
} from "../../../redux/reports/selectors.js";

class Schools extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // page: props.pagination.get('page'),
    //         // perPage: props.pagination.get('perPage')
    //     }
    // }

    componentDidMount () {
        this.props.getUserSchool();
        this.props.getUserSchoolStudents();
        this.props.getUserSchoolHomerooms();
        this.props.getUserSchoolTeachers();
        this.props.getUserSchoolAdmins()
    }

    render() {

        const { school, schoolStudents, schoolHomerooms, schoolTeachers, schoolAdmins } = this.props;
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
        schoolStudents: selectGetUserSchoolStudentsRequest(state),
        schoolHomerooms: selectGetUserSchoolHomeroomsRequest(state),
        schoolTeachers: selectGetUserSchoolTeachersRequest(state),
        schoolAdmins: selectGetUserSchoolAdminsRequestRequest(state)
    }),
    (dispatch) => ({
        getUserSchoolAdmins: () => { dispatch(getUserSchoolAdmins(1)) },
        getUserSchoolTeachers: () => { dispatch(getUserSchoolTeachers(1)) },
        getUserSchoolStudents: () => { dispatch(getUserSchoolStudents(1)) },
        getUserSchoolHomerooms: () => { dispatch(getUserSchoolHomerooms(1)) },
        getUserSchool: () => { dispatch(getUserSchool(1)) }
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