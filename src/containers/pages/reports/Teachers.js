import React, {Component} from 'react';

import CardsSection from "../../../components/pages/reports/teachers/CardsSection";
import TabSection from "../../../components/pages/reports/teachers/TabSection";
import {translate} from "react-i18next";
import {connect} from "react-redux";

class Teachers extends Component {



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
)(Teachers));