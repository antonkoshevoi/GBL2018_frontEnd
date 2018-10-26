import React, {Component} from 'react';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { getResultsDetailsRecord, resetGetRecordRequest } from "../../../redux/scap/actions";
import { selectGetRecordRequest } from "../../../redux/scap/selectors";

class ResultsModal extends Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.props.getRecords(nextProps.item.get('id'));            
        }               
    }

    _close () {
        this.setState({});
        this.props.resetGetRecordRequest();
        this.props.onClose();
    }; 

    _renderRecords(answers) {
        
        const { t } = this.props;
                        
        if (answers.length === 0) {
            return <div>
                <Typography type="display1" gutterBottom>{t('scapResultsNotFound')}</Typography>
            </div>;
        }
    
        return answers.map((answer, key) => (
            <div key={key} className="row">
                <div className="col-sm-12"><h6>{(key + 1)}. {answer.question}</h6></div>
                <div className="col-sm-12"><label>{t('score')}: </label> <strong>{answer.score}</strong></div>
                {answer.notes ?  <div className="col-sm-12"><label>{t('notes')}: </label> <span>{answer.notes}</span></div> : ''}
            </div>
        ));
    }
  
    render() {
        const { isOpen, recordRequest, t } = this.props;
            
        const loading   = recordRequest.get('loading');
        const success   = recordRequest.get('success');        
        const data      = success ? recordRequest.get('record').toJS() : {};

        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>
                      <Icon className="m--margin-right-15">poll</Icon>
                      <Typography variant="h6" color="inherit" >
                            {t('sCapResults')}
                      </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">                    
                    <div className="scap-answers">                        
                        { loading && <CircularProgress color="inherit"/> }
                        { success && <div>
                            <h5 className="m--margin-bottom-10">{t('summary')}</h5>
                            <div className="row">        
                                <div className="col-sm-12"><label>{t('sCap')}:</label> {data.survey}</div>
                                <div className="col-sm-12"><label>{t('teacher')}:</label> {data.teacher}</div>
                                <div className="col-sm-12"><label>{t('student')}:</label> {data.student}</div>
                                <div className="col-sm-12"><label>{t('homeroom')}:</label> {data.homeroom}</div>
                            </div>
                            <Divider className='full-width'/>
                            <h5 className="m--margin-top-10 m--margin-bottom-10">{t('results')}</h5>
                            {this._renderRecords(data.answers)}
                        </div>}
                    </div>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button
                      type='submit'
                      form='assign-students-form'
                      disabled={loading}                      
                      className='mt-btn-success pull-right btn btn-success mt-btn'
                      onClick={ (e) => {this._close(e) }}
                      color='primary'>
                      {t('close')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

ResultsModal = connect(
    (state) => ({
        recordRequest: selectGetRecordRequest(state)
    }),
    (dispatch) => ({    
        getRecords: (id) => { dispatch(getResultsDetailsRecord(id)) },
        resetGetRecordRequest: () => { dispatch(resetGetRecordRequest()) }
    })
)(ResultsModal);

export default translate('translations')(ResultsModal);
