import React, {Component} from 'react';
import {translate} from "react-i18next";
import StudentsList from "../components/tables/StudentsList";



class Students extends Component {
    render() {

        return (
            <div className="fadeInLeft  animated">
                <StudentsList/>
            </div>
        );
    }
}



export default translate('students')(Students);