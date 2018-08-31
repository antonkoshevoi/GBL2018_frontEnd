import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Button, Icon, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton } from '../../components/ui/table';
import { selectGetRecordsRequest, selectDeleteRequest, selectPagination } from '../../redux/scap/selectors';
import { getRecords, getRecord, deleteRecord } from '../../redux/scap/actions';
import Pagination from '../../components/ui/Pagination';
import DeleteButton from "../../components/ui/DeleteButton";

class Templates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.pagination.get('page'),
            perPage: props.pagination.get('perPage')
        }
    }

    componentDidMount() {
        const {getRecords} = this.props;
        getRecords();
    }

    componentWillReceiveProps(nextProps) {
        const deleteSuccess = this.props.deleteRecordRequest.get('success');
        const nextDeleteSuccess = nextProps.deleteRecordRequest.get('success');

        if (!deleteSuccess && nextDeleteSuccess) {
            this._getRecords();
        }
    }
  
    /**
     * Records
     */
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage
        });
    }
    
    _editRecord(id) {
        this.props.goTo(`scap/update/${id}`);
    }   
    
    _deleteRecord(id) {
        this.props.deleteRecord(id);
    }
    
    _renderRecords() {
        const {t} = this.props;
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');
        
        if (!loading && records.size === 0) {
            return (
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>{t('templatesNotFound')}</h2>
                        </div>
                    </td>
                </tr>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='100px'>{key + 1}</Td>
                <Td width='132px'>{record.get('title')}</Td>
                <Td width='132px'>{record.get('questions')}</Td>                                
                <Td width='132px'>{record.get('teacher') || '-'}</Td>
                <Td width='132px'><span className='m-badge m-badge--brand m-badge--wide'>{t(record.get('status'))}</span></Td>
                <Td width='132px'>{record.get('createdAt')}</Td>
                <Td width='100px'>
                    <EditButton onClick={(id) => { this._editRecord(id) }} id={record.get('id')} />
                    <DeleteButton title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }} />                        
                </Td>
            </Row>
        ));
    }

    _selectPerPage(perPage) {
        const total      = this.props.pagination.get('total');
        const totalPages = Math.ceil(total / perPage);
        const page       = Math.min(this.state.page, totalPages);

        this.setState({perPage, page}, this._getRecords);
    }
    
    _goToPage(page) {
        this.setState({page}, this._getRecords);
    }

    render() {
        const {getRecordsRequest, pagination, t} = this.props;
        const {page, perPage}   = this.state;
        const loading           = getRecordsRequest.get('loading');
        const totalPages        = pagination.get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>{t('sCap')}</h3>
                            </div>
                        </div>         
                    </div>
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
                                    <NavLink to="/scap/build" className="link-btn">
                                        <Button variant="raised" color='primary' className='mt-btn mt-btn-success m--margin-right-5'>
                                            {t('addNew')}
                                            <Icon className="m--margin-left-5">add</Icon>
                                        </Button>
                                    </NavLink>                                    
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th first={true} width='100px'>#</Th>
                                <Th width='132px'>{t('title')}</Th>
                                <Th width='132px'>{t('questions')}</Th>
                                <Th width='132px'>{t('teacher')}</Th>
                                <Th width='132px'>{t('status')}</Th>
                                <Th width='132px'>{t('created')}</Th>
                                <Th width='100px'>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>

                            <Tbody>
                                {loading && <TablePreloader text="Loading..." color="primary"/> }
                                { this._renderRecords() }
                            </Tbody>
                        </Table>

                        <div className="row">
                            <div className="col-sm-12 m--margin-top-40 text-right">
                                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                            </div>
                        </div>
                    </div>
                </div>                              
            </div>
        );
    }
}

Templates = connect(
        (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        deleteRecordRequest: selectDeleteRequest(state),
        pagination: selectPagination(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getRecords(params));
        },
        deleteRecord: (id) => {
            dispatch(deleteRecord(id));
        },
        goTo: (url) => {dispatch(push(url))}
    })
)(Templates);

export default translate('translations')(Templates);