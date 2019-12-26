import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/Table';
import { SelectPerPage } from "../../components/ui/SelectPerPage";
import { selectGetRecordsRequest } from '../../redux/scap/selectors';
import { getAssignedRecords } from '../../redux/scap/actions';
import { Date } from "../../components/ui/DateTime";
import Pagination from '../../components/ui/Pagination';
import TeacherResultsModal from './modals/TeacherResultsModal';

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

class TeacherScap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage'),
            showResultsModal: false,
            selectedItem: null
        }
    }

    componentDidMount() {
        const {getRecords} = this.props;
        getRecords();
    }
   
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage
        });
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
    
    _recordNumber(key) {
        const { page, perPage } = this.state;
        return (key + 1 + ((page - 1) * perPage));
    }    
    
    _renderRecords() {
        const {t, goTo} = this.props;
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
                <Td>
                    {record.get('completed')}
                    {(record.get('completed') > 0) && <ResultsButton onClick={() => { this._showResultsModal(record) }} t={t} />}
                </Td>
                <Td><Date time={record.get('createdAt')} /></Td>
                <Td>
                    <button className='btn btn-accent m-btn--icon-only' onClick={() => { goTo('scap/fill/' + record.get('id')) }}>
                        <i className='la la-plus'></i>
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
                                <h3 className='m-portlet__head-text'>{t('sCap')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className='mt-3 mb-4'>
                            <SelectPerPage value={perPage} onChange={(value) => { this._selectPerPage(value) }} />
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th>#</Th>
                                <Th>{t('title')}</Th>
                                <Th>{t('questions')}</Th>                                
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
                <TeacherResultsModal 
                    isOpen={showResultsModal} 
                    onClose={() => { this._closeResultsModal() }}                    
                    item={selectedItem} />                
            </div>
        );
    }
}

export default withTranslation('translations')(connect(
    (state) => ({
        getRecordsRequest: selectGetRecordsRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getAssignedRecords(params));
        },
        goTo: (url) => {dispatch(push(url))}
    })
)(TeacherScap));