import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography} from "material-ui";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../../ui/table";


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}


class TabSection extends Component {

    state = {
        value: this.props.data.courses[0].id,
    };


    handleChange = (event, value) => {
        this.setState({value});
    };


    _renderTabs(courses) {
        return courses.map(function (item, i) {
            return <Tab key={i} className="tab-header-item" value={item.id} label={item.name}/>
        })
    }


    _renderTabContent(courses) {
        const {value} = this.state;
        const _self = this;
        return courses.map(function (item, i) {
            return (
                value === item.id && <TabContainer key={i}>
                    {_self._renderLessonsTables(item.lessons)}
                </TabContainer>
            )
        })
    }

    _renderLessonsTables(lessons) {
        return (<Table>
                <Thead>
                <HeadRow>
                    <Th first={true} width='20px'>#</Th>
                    <Th name='username' width='132px'>Unit/lesson</Th>
                    <Th name='firstName' width='172px'>Title / Description</Th>
                    <Th name='lastName' width='100px'>Status</Th>
                    <Th name='email' width='120px'>Passes/Required Passes</Th>
                    <Th width='132px'>Comments</Th>

                </HeadRow>
                </Thead>

                <Tbody>
                { lessons.map(function (item, i) {
                    return (
                        <Row index={i} key={i}>
                            <Td first={true} width='20px'>{i + 1}</Td>
                            <Td width='132px'>{item.unit}</Td>
                            <Td width='172px'>{item.title}</Td>
                            <Td width='100px'><span
                                className='m-badge m-badge--brand m-badge--wide'>{item.status}</span></Td>
                            <Td width='120px'>{item.passes}</Td>
                            <Td width='132px'>{item.comments}</Td>
                        </Row>
                    )
                })}
                </Tbody>
            </Table>
        )
    }


    render() {

        const {value} = this.state;
        const {courses} = this.props.data;

        return (
            <div className="row ">
                <div className="col-md-12">
                    <div className="m--margin-top-40">

                        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                            <div className="m-portlet__head d-flex justify-content-between align-items-center">
                                <div class="m-portlet__head-caption col-sm-4">
                                    <div class="m-portlet__head-title"><span class="m-portlet__head-icon"><i
                                        class="flaticon-analytics"></i></span><h3 class="m-portlet__head-text">Reports</h3></div>
                                </div>
                                <div className="m-portlet__head-tools col-sm-8">

                                    <Tabs
                                        className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs pull-right"
                                        value={this.state.value}
                                        onChange={this.handleChange}
                                        scrollable
                                        scrollButtons={false}
                                    >
                                        {this._renderTabs(courses)}
                                        <Tab className="tab-header-item" value='details' label="Detailed Data"/>

                                    </Tabs>
                                </div>

                            </div>
                            <div className="m-portlet__body" style={{height: "100%"}}>
                                {/*<h1>No Info...</h1>*/}
                                {this._renderTabContent(courses)}

                                { value === 'details' && <TabContainer>
                                    <h1>Detailed Data</h1>
                                </TabContainer>}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

TabSection.propTypes = {};

export default TabSection;
