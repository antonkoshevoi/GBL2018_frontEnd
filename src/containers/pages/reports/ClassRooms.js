
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';

import CardsSection from "../../../components/pages/reports/classrooms/CardsSection";
import TabSection from "../../../components/pages/reports/classrooms/TabSection";

class ClassRooms extends Component {
    render() {
        return (
            <div className="fadeInLeft  animated">
                <CardsSection/>
                <TabSection/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("ClassRooms")(connect(
    mapStateToProps,
)(ClassRooms));

