import React, { Component } from 'react';
import HasRole from "../middlewares/HasRole";
import TeacherScap from "./TeacherScap";
import SchoolScap from "./SchoolScap";

class Scap extends Component {
    render() {
        return (
            <div className='fadeInLeft  animated'>               
                <HasRole roles={[              
                  'Principal',
                  'Administrator',
                  'Superadministrator'            
                ]}>
                    <SchoolScap />
                </HasRole>
                <HasRole roles={["Teacher"]}>
                    <TeacherScap />
                </HasRole>
            </div>
        );
    }
}

export default Scap;