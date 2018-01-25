import React, {Component} from 'react';
import * as AUTH from '../../../services/AuthService'
import InfoSection from "../../../components/pages/reports/schools/InfoSection";
import CardsSection from "../../../components/pages/reports/schools/CardsSection";
import TabSection from "../../../components/pages/reports/schools/TabSection";
import SubHeader from "../../ui/SubHeader";
import {connect} from "react-redux";
import {translate} from "react-i18next";

class Schools extends Component {



    render() {

        console.log(AUTH.isLodegIn());
        return (
            <div className="fadeInLeft  animated">
                    <CardsSection />
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
)(Schools));