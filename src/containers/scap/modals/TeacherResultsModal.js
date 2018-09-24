import React, {Component} from 'react';
import {
  AppBar,
  DialogContent,  
  Icon,
  Toolbar, Typography  
} from '@material-ui/core';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead } from '../../../components/ui/table';
import { getResultsRecords, resetGetResultsRecordsRequest } from "../../../redux/scap/actions";
import { selectGetResultRecordsRequest } from "../../../redux/scap/selectors";
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
                <tr>
                    <td>
                        <div className="table-message">
                            <h2>{t('scapResultsNotFound')}</h2>
                        </div>
                    </td>
                </tr>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td first={true} width='60px'>{this._recordNumber(key)}</Td>
                <Td width='132px'>{record.get('homeroom')}</Td>
                <Td width='132px'>{record.get('student')}</Td>
                <Td width='132px'><span className={`m-badge m-badge--brand m-badge--wide ${(record.get('status') === 'completed' ? 'm-badge--success' : '')}`}>{t(record.get('status'))}</span></Td>
                <Td width='132px'>{record.get('createdAt')}</Td>
                <Td width='100px'>
                    {record.get('status') !== 'completed' &&
                        <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { goTo(`scap/edit-answers/${record.get('id')}`) }}>
                            <i className='la la-pencil'></i>
                        </button>                               
                    }
                    {record.get('status') === 'completed' &&
                        <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => { this._showResultsModal(record) }}>
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
                      <Icon className="m--margin-right-15">poll</Icon>                                             
                      <Typography type="title" color="inherit" >
                            {t('sCapResults')}
                      </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">                    
                    <div className="scap-answers">                        
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th first={true} width='60px'>#</Th>
                                <Th width='132px'>{t('homeroom')}</Th>                                
                                <Th width='132px'>{t('student')}</Th>
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
                            <div className="col-sm-12 m--margin-top-15 text-right">
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

export default translate('translations')(TeacherResultsModal);
