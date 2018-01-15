import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead} from "../../../components/ui/table";
import {Button, Icon, IconButton, Input, InputAdornment, MenuItem, Select, Tab, Tabs, Typography} from "material-ui";

import Pagination from "../../../components/ui/Pagination";
import AddStudentDialog from "../../../components/pages/students/AddStudentDialog";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {getRecords} from "../../../redux/students/actions";
import {selectGetRecordsRequest, selectPagination, selectRecords} from "../../../redux/students/selectors";
import {buildSortersQuery} from "../../../helpers/utils";
import {Search} from "material-ui-icons";


function TabContainer(props) {
    return (
        <Typography component="div">
            {props.children}
        </Typography>
    );
}

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogIsOpen: false,
            activeTab: '1',
            sorters: {},
            page: props.pagination.get('page'),
            perPage: props.pagination.get('perPage')
        }
    }

    componentDidMount () {
        const { getRecords } = this.props;

        getRecords();
    }


    handleChange = (event, value) => {
        this.setState({ activeTab:value });
    };


    _openAddDialog = () => {
        this.setState({ dialogIsOpen: true });
    };

    _closeAddDialog = () => {
        this.setState({ dialogIsOpen: false });
    };

    /**
     *
     * @private
     */
    _renderRecords () {
        const { records } = this.props;

        if (records.length === 0) {
            return (
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>Student Not Found...</h2>
                        </div>
                    </td>
                </tr>
            )
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='100px'>{key + 1}</Td>
                <Td width='132px'>{record.get('username')}</Td>
                <Td width='132px'>{record.get('firstName')}</Td>
                <Td width='132px'>{record.get('lastName')}</Td>
                <Td width='132px'>{record.get('email')}</Td>
                <Td width='132px'><span className='m-badge m-badge--brand m-badge--wide'>Student</span></Td>
                <Td width='132px'>{record.get('school')}</Td>
                <Td width='100px'>
                    <button  className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill'>
                        <i className='la la-edit'></i>
                    </button>
                </Td>
            </Row>
        ));
    }

    /**
     *
     * @private
     */
    _getRecords () {
        const { sorters, page, perPage } = this.state;

        this.props.getRecords({
            orderBy: buildSortersQuery(sorters),
            page, perPage
        });
    }

    /**
     *
     * @param name
     * @private
     */
    _sort (name) {
        let sorters = {};

        if(this.state.sorters[name]) {
            sorters[name] = this.state.sorters[name] === 'asc' ? 'desc' : 'asc';
        } else {
            sorters[name] = 'asc';
        }

        this.setState({ sorters }, this._getRecords);
    }

    /**
     *
     * @param perPage
     * @private
     */
    _selectPerPage (perPage) {
        this.setState({ perPage }, this._getRecords)
    }

    /**
     *
     * @param page
     * @private
     */
    _goToPage (page) {
        this.setState({ page }, this._getRecords)
    }

    render() {
        const { getRecordsRequest, pagination } = this.props;
        const { sorters, page, perPage } = this.state;
        const loading = getRecordsRequest.get('loading');
        const totalPages = pagination.get('totalPages');
        const { activeTab } = this.state;

        return (
            <div className='fadeInLeft  animated'>

                <div className='m-portlet m-portlet--head-solid-bg m-portlet--brand'>
                    <div className='m-portlet__head'>
                        <div className="m-portlet__head-tools">
                            <Tabs
                                className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs "
                                value={this.state.activeTab}
                                onChange={this.handleChange}

                            >
                                <Tab className="tab-header-item" value="1" label="Courses" />
                                <Tab className="tab-header-item" value="2" label="Inovation" />
                            </Tabs>
                        </div>
                        <div className="m-portlet__head-tools">

                            <Input
                                className="portlet-header-input"
                                id="search"
                                type='search'
                                placeholder="Search"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickSearchCourses}
                                        >
                                            <Search/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>

                    </div>

                    {activeTab === '1' && <TabContainer>
                        <div className='m-portlet__body'>
                            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                                <div className='row align-items-center'>

                                    <div className='col-xl-12 order-1 order-xl-2 m--align-right'>
                                        <Select
                                            className="pull-left table-select"
                                            value={perPage}
                                            onChange={(e) => { this._selectPerPage(e.target.value) }}>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                        </Select>
                                        <Button raised color='accent' onClick={this._openAddDialog} className='mt-btn mt-btn-success' style={{marginRight:'7px'}}>
                                            Add New
                                            <Icon style={{marginLeft:'5px'}}>add</Icon>
                                        </Button>
                                    </div>

                                </div>
                            </div>
                            <Table>
                                <Thead>
                                <HeadRow>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['id']} name='id' first={true} width='100px'>#</Th>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['username']} name='username' width='132px'>Name</Th>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['school']} name='firstName' width='132px'>School</Th>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['lastName']} name='lastName' width='132px'>Course</Th>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['email']} name='email' width='132px'>Teacher</Th>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['firstName']} name='school' width='132px'>Student Count</Th>
                                    <Th onSort={ (name) => { this._sort(name) }} dir={sorters['actions']} name='actions' width='100px'>Actions</Th>
                                </HeadRow>
                                </Thead>

                                <Tbody>
                                {loading &&
                                <TablePreloader text="Loading..." color="accent"/>
                                }
                                { this._renderRecords() }
                                </Tbody>
                            </Table>

                            <div className="row">
                                <div className="col-sm-12 text-right">
                                    <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                                </div>
                            </div>
                        </div>
                    </TabContainer>}


                </div>

                <AddStudentDialog dialogIsOpen={this.state.dialogIsOpen} handlerClose = {this._closeAddDialog} />
            </div>
        );
    }
}

Courses = connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        pagination: selectPagination(state),
        records: selectRecords(state),
    }),
    (dispatch) => ({
        getRecords: (params = {}) => { dispatch(getRecords(params)) }
    })
)(Courses);


export default translate('students')(Courses);
