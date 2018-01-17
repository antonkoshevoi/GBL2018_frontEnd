import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InfoSection from "../../../components/pages/profile/InfoSection";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import TabSection from "../../../components/pages/profile/TabSection";
import SummerySection from "../../../components/pages/profile/SummerySection";


const userData = {
    username:'gravity_brain_user',
    firstName:'Kobe',
    lastName:'Bryant',
    email:'bryant@ggmail.am',
    phone:'+654 684 9849 894',
    gender:1,
    birthday:new Date(1988, 2, 1),
    schools:[
        {
            id:1,
            name:'School #465'
        },
        {
            id:2,
            name:'School #132'
        }
    ],
    homerooms:[
        {
            id:1,
            name:'Homeroom #465'
        },
        {
            id:2,
            name:'Homeroom #132'
        },
        {
            id:3,
            name:'Homeroom #1888'
        }
    ],
    classrooms:[
        {
            id:1,
            name:'Classroom #465'
        },
        {
            id:2,
            name:'Classroom #132'
        },
        {
            id:3,
            name:'Classroom #1888'
        }
    ]
}

class Profile extends Component {
    render() {
        return (
            <div className="row">
               <div className="col-lg-3">
                   <InfoSection/>
               </div>
                <div className="col-lg-6">
                    <TabSection data={userData}/>
                </div>
                <div className="col-lg-3">
                    <SummerySection data={userData}/>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {};

function mapStateToProps(state) {
    return {};
}

export default translate("Profile")(connect(
    mapStateToProps,
)(Profile));

