import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetGroupsRequest, selectDeleteGroupRequest } from '../../redux/messages/selectors';
import { getGroups, deleteGroup, resetDeleteGroupRequest } from '../../redux/messages/actions';
import { Button, Icon } from '@material-ui/core';
import { HeadRow, Row, Table, TablePreloader, Tbody, Td, Th, Thead, MessageRow } from '../../components/ui/Table';
import { SelectPerPage } from "../../components/ui/SelectPerPage";
import { NavLink } from "react-router-dom";
import { DateTime } from "../../components/ui/DateTime";
import Pagination from '../../components/ui/Pagination';
import DeleteButton from '../../components/ui/DeleteButton';

class MessageGroups extends Component {

    constructor(props) {
        super(props);        
        this.state = {
            page: props.getRecordsRequest.get('pagination').get('page'),
            perPage: props.getRecordsRequest.get('pagination').get('perPage')
        }
    }

    componentDidMount() {
        this.props.getRecords();
    }
   
    componentDidUpdate(prevProps) {
        const {deleteRecordRequest, resetDeleteGroupRequest} = this.props;

        if (deleteRecordRequest.get('success') && !prevProps.deleteRecordRequest.get('success')) {
            resetDeleteGroupRequest();
            this._getRecords();
        }        
    }   
    
    _getRecords() {
        const { page, perPage} = this.state;

        this.props.getRecords({
            page, perPage
        });
    }
    
    _deleteRecord(id) {        
        this.props.deleteGroup(id);        
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
                <MessageRow>{t('messageGroupsNotFound')}</MessageRow>
            );
        }

        return records.map((record, key) => (
            <Row index={key} key={key}>
                <Td>{this._recordNumber(key)}</Td>
                <Td>
                    <NavLink className="ml-2 g-blue" to={`/messages/groups/${record.get('id')}`}>{record.get('name')}</NavLink>
                </Td>                
                <Td><DateTime time={record.get('created')} /></Td>
                <Td className="actions">
                    <NavLink className='btn btn-accent m-btn--icon-only' to={`/messages/groups/${record.get('id')}`}>
                        <i className='la la-edit'></i>
                    </NavLink>                    
                    <DeleteButton btnName={t('delete')} title={t('areYouSure')} onClick={() => { this._deleteRecord(record.get('id')) }}/>                    
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
        const {page, perPage} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');
        const totalPages = getRecordsRequest.get('pagination').get('totalPages');

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='fa fa-group'></i></span>
                                <h3 className='m-portlet__head-text'>{t('groups')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className='mt-3 mb-4'>
                            <div className='row'>               
                                <div className='col-sm-12 text-right'>
                                    <SelectPerPage value={perPage} onChange={(value) => { this._selectPerPage(value) }} className="pull-left" />                                   
                                    <NavLink to="/messages/groups/new">
                                        <Button color='primary' className='mt-btn mt-btn-success'>
                                          {t('newGroup')}
                                          <Icon className="ml-2">add</Icon>
                                        </Button>
                                    </NavLink>                                    
                                </div>
                            </div>
                        </div>
                        <Table>
                            <Thead>
                            <HeadRow>
                                <Th>#</Th>
                                <Th>{t('name')}</Th>                                                         
                                <Th>{t('created')}</Th>                                
                                <Th>{t('actions')}</Th>
                            </HeadRow>
                            </Thead>

                            <Tbody>
                                {loading && <TablePreloader text={t('loading')} /> }
                                {success && this._renderRecords() }
                            </Tbody>
                        </Table>

                        <div className="row">
                            <div className="col-sm-12 mt-5 text-right">
                                <Pagination page={page} totalPages={totalPages} onPageSelect={(page) => this._goToPage(page)}/>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
        );
    }
}

export default withTranslation('translations')(connect(
    (state) => ({
        getRecordsRequest: selectGetGroupsRequest(state),
        deleteRecordRequest: selectDeleteGroupRequest(state)
    }),
    (dispatch) => ({
        getRecords: (params = {}) => {
            dispatch(getGroups(params));
        },
        deleteGroup: (id) => {
            dispatch(deleteGroup(id));
        },
        resetDeleteGroupRequest: () => {
            dispatch(resetDeleteGroupRequest());
        }
    })
)(MessageGroups));