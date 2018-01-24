import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from "../../ui/Card";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../ui/table";

class UnassignedCourses extends Component {


    _renderCourses(courses) {
        return courses.map(function (item, i) {
            return (
                <Row index={i} key={i}>
                    <Td first={true} width='100px'>{i + 1}</Td>
                    <Td width='190px'>Course Name {i}</Td>
                    <Td width='100px'><span
                        className='m-badge m-badge--brand m-badge--wide'>status</span></Td>
                </Row>
            )
        })
    }

    render() {
        return (
            <Card title="Unassigned Courses" icon="fa fa-list-alt">
                <Table>
                    <Thead>
                    <HeadRow>
                        <Th first={true} width='100px'>Order #</Th>
                        <Th name='username' width='190px'>Course Name</Th>
                        <Th name='firstName' width='100px'>Status</Th>

                    </HeadRow>
                    </Thead>
                    <Tbody>
                        {this._renderCourses([0,1,2,3])}
                    </Tbody>
                </Table>
            </Card>
        );
    }
}

UnassignedCourses.propTypes = {};

export default UnassignedCourses;
