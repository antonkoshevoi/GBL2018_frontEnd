import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  Icon,
  FormControl,
  FormHelperText,
  Input,  
  InputLabel, 
  Button,
  MenuItem, 
  Select  
} from '@material-ui/core';
import {Loader} from "../../components/ui/Loader";
import NotFoundPage from '../errors/404';
import { selectGetRecordRequest, selectUpdateAnswersRequest } from '../../redux/scap/selectors';
import { getResultsDetailsRecord, resetGetRecordRequest, updateAnswers, resetUpdateAnswersRequest } from '../../redux/scap/actions';

class EditAnswers extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            id: this.props.match.params.id,
            answers: {}
        }
    }

    componentDidMount() {        
        this.props.getRecord(this.props.match.params.id);        
    }
    
    componentWillUnmount() {
        this.props.resetGetRecordRequest();
    }
    
    componentDidUpdate(prevProps) {        
        const record = this.props.recordRequest.get('record');        

        if (record && !prevProps.recordRequest.get('record')) {
            this.setState({
                scap: record.toJS(),
                answers: record.get('answers').toJS()
            });            
        }
                    
        const success = this.props.updateAnswersRequest.get('success');        

        if (success && !prevProps.updateAnswersRequest.get('success')) {
            this._goBack();
        }         
    }
    
    _saveAnswers(isDraft = 0) {        
        this.props.updateAnswers({
            id:      this.state.id,
            answers: this.state.answers,
            isDraft: isDraft
        });
    }
        
    _goBack() {
        this.props.resetGetRecordRequest();
        this.props.resetUpdateAnswersRequest();
        this.props.goTo('/scap');
    }    
    
    _handleAnswerChange(event, key) {
        const { name, value } = event.target;
                
        let answers = this.state.answers;
        
        answers[key] = {
            ...(this.state.answers[key]),
            [name]: value
        };
        
        this.setState({answers: answers});            
    }

    _renderQuestions() {         
        const {t, recordRequest} = this.props;
        const {scap, answers} = this.state;               
        if (!recordRequest.get('success') || scap.answers.length === 0) {            
            return (
                <div className="text-center">{t('noAnyQuestions')}</div>
            ); 
        }        
        
        return answers.map((answer, key) => {            
            return (<div key={key}>                
                <h6 className="text-left pre-line">{answer.question}</h6>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3 text-left">                    
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='name-error'>{t('score')}</InputLabel>
                            <Select                              
                                name='score'
                                style={{minWidth: 200}}
                                onChange={(e) => {
                                    this._handleAnswerChange(e, key)                              
                                }}
                                value={answer.score || ''}>
                                <MenuItem value={null} primarytext=""/>
                                <MenuItem value="A" primarytext="A">A</MenuItem>
                                <MenuItem value="B" primarytext="B">B</MenuItem>
                                <MenuItem value="C" primarytext="C">C</MenuItem>
                                <MenuItem value="D" primarytext="D">D</MenuItem>
                                <MenuItem value="F" primarytext="F">F</MenuItem>
                            </Select>                          
                        </FormControl>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 text-left">
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='name-error'>{t('notes')}</InputLabel>
                            <Input
                              name='notes'
                              value={answer.notes || ''}                                 
                              onChange={(e) => {
                                  this._handleAnswerChange(e, key)
                              }}                      
                            />
                        </FormControl>
                    </div>
                </div>  
            </div>);
        });        
    }    

    render() {
        const {t, recordRequest, updateAnswersRequest} = this.props;
        const {scap} = this.state;        
        const errors = updateAnswersRequest.get('errors');
        
        if (recordRequest.get('fail'))  {
            return <NotFoundPage/>;
        }        
        
        return (
            <div className='fadeInLeft  animated'>               
                {!recordRequest.get('success') ? <Loader/> : 
                (<div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('fillScapTemplate')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">                              
                                <h6>{t('title')}</h6> 
                                <p>{scap.survey}</p>
                                <h6>{t('description')}</h6> 
                                <p className="pre-line">{scap.surveyDescription}</p>
                                <h6>{t('student')}</h6>
                                <p>{scap.student}</p>
                                <h6>{t('homeroom')}</h6>
                                <p>{scap.homeroom}</p>                                 
                            </div>                              
                            <div className="col-sm-12">
                                <h5 className="text-left mb-4">{t('questions')}</h5>
                                {errors && errors.get('answers') && <FormHelperText error className="mb-3">{ errors.get('answers').get(0) }</FormHelperText>}
                                <div>{this._renderQuestions()}</div>                                
                            </div>
                            <div className="col-sm-12 mt-5 text-center">
                                <Button disabled={updateAnswersRequest.get('loading')} onClick={() => { this._saveAnswers(0) }} variant="contained" color='primary' className='mt-btn mt-btn-success mr-3'>
                                    {t('saveAndPublish')}
                                    <Icon className="ml-2">check</Icon>
                                </Button>
                                <Button disabled={updateAnswersRequest.get('loading')} onClick={() => { this._saveAnswers(1) }} variant="contained" color='primary' className='mt-btn mt-btn-success mr-3'>
                                    {t('saveAsDraft')}
                                    <Icon className="ml-2">check</Icon>
                                </Button>                                 
                                <Button disabled={updateAnswersRequest.get('loading')} onClick={() => { this._goBack() }} variant="contained">
                                    {t('cancel')}                                    
                                </Button>                                
                            </div>                              
                        </div>                        
                    </div>
                </div>)}
            </div>
        );
    }
}

EditAnswers = connect(
    (state) => ({        
        recordRequest: selectGetRecordRequest(state),
        updateAnswersRequest: selectUpdateAnswersRequest(state)        
    }),
    (dispatch) => ({
        getRecord: (id) => {
            dispatch(getResultsDetailsRecord(id));
        },        
        resetGetRecordRequest: () => {
            dispatch(resetGetRecordRequest());
        },
        updateAnswers: (data) => {
            dispatch(updateAnswers(data));
        },
        resetUpdateAnswersRequest: () => {
            dispatch(resetUpdateAnswersRequest());
        },        
        goTo: (url) => {dispatch(push(url))}
    })
)(EditAnswers);

export default withTranslation('translations')(EditAnswers);