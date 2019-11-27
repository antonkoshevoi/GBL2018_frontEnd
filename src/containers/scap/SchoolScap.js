import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Button, Icon } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, EditButton, MessageRow } from '../../components/ui/Table';
import { SelectPerPage } from "../../components/ui/SelectPerPage";
import { selectGetRecordsRequest, selectDeleteRequest } from '../../redux/scap/selectors';
import { getRecords, deleteRecord } from '../../redux/scap/actions';
import { Date } from "../../components/ui/DateTime";
import Pagination from '../../components/ui/Pagination';
import DeleteButton from "../../components/ui/DeleteButton";
import AssignTeachersModal from "./modals/AssignTeachersModal"

const AssignButton = ({ onClick, t}) => {    
    return (
    <button
      className='btn btn-warning m-btn--icon-only ml-3'
      onClick={() => { onClick() }}
      title={t('shareScapToTeachers')}
    >
      <i className='la la-user-plus'></i>
    </button>
  );
};

const ResultsButton = ({ onClick, t}) => {    
  return (
    <button
      className='btn btn-accent m-btn--icon-only ml-3'
      onClick={() => { onClick() }} 
      title={t('viewScapResults')}
    >
      <i className='la la-bar-chart'></i>
    </button>
  );
};  
        
class SchoolScap extends Component {
    constructor(props) {
        super(props);
                
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage'),
            showAssignModal: false,
            selectedTemplate: null
        }
    }

    componentDidMount() {
        const {getRecords} = this.props;
        getRecords();
    }

    componentDidUpdate(prevProps) {
        const success = this.props.deleteRecordRequest.get('success');        

        if (success && !prevProps.deleteRecordRequest.get('success')) {
            this._getRecords();
        }
    }
    
    _showAssignModal(record) {
        this.setState({
            showAssignModal: true,
            selectedTemplate: record
        });
    }
    
    _showResults(record) {
        this.props.goTo(`scap/results/${record.get('id')}`);
    }
    
    _closeAssignModal() {
        this.setState({
            showAssignModal: false,
            selectedTemplate: null
        });        
    }
    
    _onAssign() {
        this._getRecords();
    }
    
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

    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }    
    
    _renderRecords() {
        const {t} = this.props;
        
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');             
        
        if (!loading && records.size === 0) {
            return (
                <MessageRow>{t('templatesNotFound')}</MessageRow>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td>{this._recordNumber(key)}</Td>
                <Td>{record.get('title')}</Td>
                <Td>{record.get('questions')}</Td>                                
                <Td>{record.get('teachers')} <AssignButton onClick={() => { this._showAssignModal(record) }} t={t} /></Td>
                <Td>
                    {record.get('completed')}
                    {(record.get('completed') > 0) && <ResultsButton onClick={() => { this._showResults(record) }} t={t} />}
                </Td>
                <Td><Date time={record.get('createdAt')} /></Td>
                <Td className="actions">                    
                    <EditButton btnName={t('edit')} onClick={(id) => { this._editRecord(id) }} id={record.get('id')} />
                    <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }} />                        
                </Td>
            </Row>
        ));
    }

    _selectPerPage(perPage) {
        const total      = this.props.getRecordsRequest.get('pagination').get('total');
        const totalPages = Math.ceil(total / perPage);
        const page       = Math.min(this.state.page, totalPages);

        this.setState({perPage, page}, this._getRecords);
    }
    
    _goToPage(page) {
        this.setState({page}, this._getRecords);
    }

    render() {
        const {getRecordsRequest, t} = this.props;
        const {page, perPage, showAssignModal, selectedTemplate} = this.state;
        const loading = getRecordsRequest.get('loading');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('sCap')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className='mt-3 mb-4 text-right'>    
                            <SelectPerPage value={perPage} onChange={(value) => { this._selectPerPage(value) }} className="pull-left" />
                            <NavLink to="/scap/build" className="link-btn">
                                <Button variant="contained" color='primary' className='mt-btn mt-btn-success mr-2'>
                                    {t('addNew')}
                                    <Icon className="ml-2">add</Icon>
                                </Button>
                            </NavLink>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th>#</Th>
                                <Th>{t('title')}</Th>
                                <Th>{t('questions')}</Th>
                                <Th>{t('teachers')}</Th>
                                <Th>{t('completed')}</Th>
                                <Th>{t('created')}</Th>
                                <Th>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>

                            <Tbody>
                                {loading && <TablePreloader text={t('loading')} /> }
                                { this._renderRecords() }
                            </Tbody>
                        </Table>

                        <div className="row">
                            <div className="col-sm-12 mt-5 text-right">
                                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <AssignTeachersModal 
                    isOpen={showAssignModal} 
                    onClose={() => { this._closeAssignModal() }}
                    onSuccess={() => { this._onAssign() }}
                    template={selectedTemplate} />
            </div>
        );
    }
}

SchoolScap = connect(
        (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state),
        deleteRecordRequest: selectDeleteRequest(state)        
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
)(SchoolScap);

export default withTranslation('translations')(SchoolScap);