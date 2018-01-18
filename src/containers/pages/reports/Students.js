import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import InfoSection from "../../../components/pages/reports/students/InfoSection";
import TabSection from "../../../components/pages/reports/students/TabSection";


const data = {
    firstname:'Maria',
    lastname:'Lopez',
    birthday:new Date('1982 10 31').toDateString(),
    courses:[
        {
            id:1,
            name:"Private_BZabc_Oct2",
            progress:25,
            performance:75,
            lessons:[
                {
                    id:'1',
                    unit:'Private_BZabc_Oct2 Unit 1 / TL1',
                    title:'TL1 Private_BZabc_Oct2 Unit 1 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                },
                {
                    id:'2',
                    unit:'Private_BZabc_Oct2 Unit 2 / TL1',
                    title:'TL1 Private_BZabc_Oct2 Unit 1 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                },
                {
                    id:'1',
                    unit:'Private_BZabc_Oct2 Unit 3 / TL1',
                    title:'TL1 Private_BZabc_Oct2 Unit 3 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                }
            ]
        },
        {
            id:2,
            name:"Course 132",
            progress:40,
            performance:60,
            lessons:[
                {
                    id:'1',
                    unit:'Private_BZabc_Oct2 Unit 1 / TL1',
                    title:'TL1 Private_Course Unit 1 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                },
                {
                    id:'2',
                    unit:'Private_BZabc_Oct2 Unit 2 / TL1',
                    title:'TL1 Course Unit 1 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                },
                {
                    id:'1',
                    unit:'Private_BZabc_Oct2 Unit 3 / TL1',
                    title:'TL1 Course Unit 3 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                }
            ]
        },
        {
            id:3,
            name:"Course 842",
            progress:10,
            performance:90,
            lessons:[
                {
                    id:'1',
                    unit:'CourseUnit 1 / TL1',
                    title:'TL1 Course Unit 1 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                },
                {
                    id:'2',
                    unit:'Course Unit 2 / TL1',
                    title:'TL1 Course Unit 1 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                },
                {
                    id:'1',
                    unit:'CourseUnit 3 / TL1',
                    title:'TL1 PCourseUnit 3 this is a sample unit only for testing APP',
                    status:'in progress',
                    passes:'2/3',
                    comments:''
                }
            ]
        }
    ]
}

class Students extends Component {
    render() {
        return (
            <div className="animate fadeInLeftBig">
                <InfoSection data={data}/>
                <TabSection data={data}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("Students")(connect(
    mapStateToProps,
)(Students));

