import React, {Component} from 'react';
import { AppBar, DialogContent, Icon, Toolbar, Typography } from '@material-ui/core';
import { Date } from "../../../components/ui/DateTime";
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../../components/ui/table';
import { getResultsRecords, resetGetResultsRecordsRequest } from "../../../redux/scap/actions";
import { selectGetResultRecordsRequest } from "../../../redux/scap/selectors";
import Modal from "../../../components/ui/Modal";
import Pagination from '../../../components/ui/Pagination';
import ResultsModal from "./ResultsModal"

class TeacherResultsModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage'),
            surveyId: null,
            showResultsModal: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.props.getRecords(nextProps.item.get('id'));
            this.setState({surveyId: nextProps.item.get('id')});
        }               
    }

    _close () {
        this.setState({});
        this.props.resetGetResultsRecordsRequest();
        this.props.onClose();
    }; 

    _goToPage(page) {
        this.setState({page}, this._getRecords);
    }
    
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords(this.state.surveyId, {
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
                <MessageRow>{t('scapResultsNotFound')}</MessageRow>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td>{this._recordNumber(key)}</Td>
                <Td>{record.get('homeroom')}</Td>
                <Td>{record.get('student')}</Td>
                <Td><span className={`badge ${(record.get('status') === 'completed' ? 'badge-success' : 'badge-info')}`}>{t(record.get('status'))}</span></Td>
                <Td><Date time={record.get('createdAt')} /></Td>
                <Td className="actions">
                    {record.get('status') !== 'completed' &&
                        <button title={t('edit')} className='btn btn-accent m-btn--icon-only' onClick={() => { goTo(`scap/edit-answers/${record.get('id')}`) }}>
                            <i className='la la-pencil'></i>
                        </button>                               
                    }
                    {record.get('status') === 'completed' &&
                        <button title={t('showDetails')} className='btn btn-accent m-btn--icon-only' onClick={() => { this._showResultsModal(record) }}>
                            <i className='la la-search'></i>
                        </button>                               
                    }                            
                </Td>
            </Row>
        ));
    }
  
    render() {
        const { isOpen, getRecordsRequest, t } = this.props;
        const { page, showResultsModal, selectedItem } = this.state;
            
        const loading       = getRecordsRequest.get('loading');        
        const totalPages    = getRecordsRequest.get('pagination').get('totalPages');    

        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>          
                      <Icon className="mr-3">poll</Icon>                                             
                      <Typography variant="h6" color="inherit" >
                            {t('sCapResults')}
                      </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">                    
                    <div className="scap-answers">                        
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th>#</Th>
                                <Th>{t('homeroom')}</Th>                                
                                <Th>{t('student')}</Th>
                                <Th>{t('status')}</Th>
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
                            <div className="col-sm-12 mt-3 text-right">
                                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                            </div>
                        </div>                        
                    </div>
                    <ResultsModal 
                        isOpen={showResultsModal} 
                        onClose={() => { this._closeResultsModal() }}                    
                        item={selectedItem} />                    
                </DialogContent>
            </Modal>
        );
    }
}

TeacherResultsModal = connect(
    (state) => ({
        getRecordsRequest: selectGetResultRecordsRequest(state)        
    }),
    (dispatch) => ({
        getRecords: (id, params = {}) => {
            dispatch(getResultsRecords(id, params));
        },
        resetGetResultsRecordsRequest: () => {
            dispatch(resetGetResultsRecordsRequest());
        },
        goTo: (url) => {dispatch(push(url))}
    })
)(TeacherResultsModal);

export default withTranslation('translations')(TeacherResultsModal);
