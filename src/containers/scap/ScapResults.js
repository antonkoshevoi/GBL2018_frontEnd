import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { push } from 'react-router-redux';
import { Button, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/Table';
import { selectGetResultRecordsRequest } from '../../redux/scap/selectors';
import { getResultsRecords } from '../../redux/scap/actions';
import { Date } from "../../components/ui/DateTime";
import Pagination from '../../components/ui/Pagination';
import ResultsModal from "./modals/ResultsModal"

class ScapResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyId: this.props.match.params.id,
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage'),
            showResultsModal: false,
            selectedItem: null
        }
    }

    componentDidMount() {
        const {getRecords} = this.props;
        getRecords(this.state.surveyId);
    }

    componentWillReceiveProps(nextProps) {

    }
    
    _showResultsModal(record) {
        this.setState({
            showResultsModal: true,
            selectedItem: record
        });
    }
    
    _closeResultsModal() {
        this.setState({
            showResultsModal: false,
            selectedItem: null
        });
    }    
    
    _goBack() {
        this.props.goTo(`/scap`);
    }   
    
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords(this.state.surveyId, {
            page, perPage
        });
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
                <MessageRow>{t('scapResultsNotFound')}</MessageRow>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td>{this._recordNumber(key)}</Td>                
                <Td>{record.get('teacher')}</Td>                                
                <Td>{record.get('homeroom')}</Td>
                <Td>{record.get('student')}</Td>
                <Td><Date time={record.get('createdAt')} /></Td>
                <Td>
                    <button title={t('showDetails')} className='btn btn-accent m-btn--icon-only' onClick={() => { this._showResultsModal(record) }} id={record.get('id')} >
                        <i className='la la-search'></i>
                    </button>                                
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
        const {page, perPage, showResultsModal, selectedItem} = this.state;
        const loading = getRecordsRequest.get('loading');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('sCapResults')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className='mt-3 mb-4'>
                            <div className='row'>               
                                <div className='col-sm-12 text-right'>
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
                                    <Button onClick={() => { this._goBack() }} variant="contained" color='primary' className='mt-btn mt-btn-success mr-2'>
                                        <i className='la la-mail-reply mr-3'></i>
                                        {t('back')}                                        
                                    </Button>                                    
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th>#</Th>
                                <Th>{t('teacher')}</Th>
                                <Th>{t('homeroom')}</Th>                                
                                <Th>{t('student')}</Th>
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
                <ResultsModal 
                    isOpen={showResultsModal} 
                    onClose={() => { this._closeResultsModal() }}                    
                    item={selectedItem} />
            </div>
        );
    }
}

ScapResults = connect(
    (state) => ({
        getRecordsRequest: selectGetResultRecordsRequest(state)
    }),
    (dispatch) => ({
        getRecords: (id, params = {}) => {
            dispatch(getResultsRecords(id, params));
        },
        goTo: (url) => {dispatch(push(url))}
    })
)(ScapResults);

export default withTranslation('translations')(ScapResults);