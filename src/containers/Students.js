import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import {getAllStudents} from '../services/Students';
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