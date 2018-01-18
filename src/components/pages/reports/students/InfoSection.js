import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../../ui/Card";
import {IconButton, LinearProgress} from "material-ui";
import {Delete, Edit} from "material-ui-icons";

class InfoSection extends Component {


    _renderCourseTable(courses) {
        return courses.map(function (item,i) {
            return (
                <tr key={i}>
                    <td>{item.name}</td>
                    <td><LinearProgress mode="determinate" color='accent' value={item.progress} /></td>
                    <td><LinearProgress mode="determinate" color='primary' value={item.performance} /></td>
                </tr>
            )
        })
    }

    render() {

        const {data} = this.props;

        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="imgBlock">
                        <div className="avatar">
                            <img src="https://akphoto1.ask.fm/052/240/170/-169996968-1tn0fp4-g4ddct7j47t9bsa/original/avatar.jpg" alt="" className=""/>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-6 m--margin-bottom-20">
                            <Card title="About" icon="la la-info">
                                <table className="table m-table m-table--head-separator-primary m-middle-table">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>First Name</th>
                                        <td>{data.firstname}</td>
                                        <td className="text-center">
                                            <div className="actions">
                                                <IconButton color='primary'
                                                >
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton color='accent'
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Last Name</th>
                                        <td>{data.lastname}</td>
                                        <td className="text-center">
                                            <div className="actions">
                                                <IconButton color='primary'
                                                >
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton color='accent'
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Birthday</th>
                                        <td>{data.birthday}</td>
                                        <td className="text-center">
                                            <div className="actions">
                                                <IconButton color='primary'
                                                >
                                                    <Edit/>
                                                </IconButton>
                                                <IconButton color='accent'
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                        <div className="col-md-6 m--margin-bottom-20">
                            <Card title="My Courses" icon="fa fa-sitemap">
                                <table className="table m-table m-table--head-separator-primary m-middle-table">
                                    <thead>
                                    <tr>
                                        <th>Courses</th>
                                        <th>Progress</th>
                                        <th>Performance</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this._renderCourseTable(data.courses)}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                        <div className="col-md-12 m--margin-bottom-10">
                            <Card title="Remarks" icon="flaticon-edit">

                            </Card>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

InfoSection.propTypes = {};

export default InfoSection;
