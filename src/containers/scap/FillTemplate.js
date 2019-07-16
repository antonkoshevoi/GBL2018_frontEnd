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
import { selectGetRecordRequest, selectAddAnswersRequest } from '../../redux/scap/selectors';
import { getAssignedRecord, resetGetRecordRequest, addAnswers, resetAddAnswersRequest } from '../../redux/scap/actions';
import { getSchoolStudents } from "../../redux/schools/actions";
import { selectGetSchoolStudentsRequest } from "../../redux/schools/selectors";
import { selectGetSchoolHomeroomsRequest } from '../../redux/schools/selectors';
import { getSchoolHomerooms } from '../../redux/schools/actions';

class FillTemplate extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            surveyId: this.props.match.params.id,
            studentId: null,
            homeroomId: null,
            answers: {},
            students: [],
            homerooms: []
        }
    }

    componentDidMount() {
        this.props.getSchoolStudents(this.props.match.params.id);
        this.props.getRecord(this.props.match.params.id);
        this.props.getSchoolHomerooms();        
    }
    
    componentWillUnmount() {
        this.props.resetGetRecordRequest();
    }
    
    componentWillReceiveProps(nextProps) {        
        const record = this.props.recordRequest.get('record');
        const nextRecord = nextProps.recordRequest.get('record');

        if (!record && nextRecord) {
            this.setState({
                scap: nextRecord.toJS()       
            });            
        }
        
        const students      = this.props.schoolStudentsRequest.get('records');
        const nextStudents  = nextProps.schoolStudentsRequest.get('records');

        if (!students && nextStudents) {
            this.setState({            
                students: nextStudents.toJS()
            });
        }
        
        const homerooms      = this.props.homeroomsRequest.get('records');
        const nextHomerooms  = nextProps.homeroomsRequest.get('records');

        if (!homerooms && nextHomerooms) {
            this.setState({            
                homerooms: nextHomerooms.toJS()
            });
        }        
        
        const success      = this.props.addAnswersRequest.get('success');
        const nextSuccess  = nextProps.addAnswersRequest.get('success');

        if (!success && nextSuccess) {
            this._goBack();
        }         
    }
    
    _saveAnswers(isDraft = 0) {        
        this.props.addAnswers({
            surveyId: this.state.surveyId,
            studentId: this.state.studentId,
            homeroomId: this.state.homeroomId,
            answers: this.state.answers,
            isDraft: isDraft
        });
    }
        
    _goBack() {
        this.props.resetGetRecordRequest();
        this.props.resetAddAnswersRequest();
        this.props.goTo('/scap');
    }    
    
    _handleAnswerChange(event, key) {
        const { name, value } = event.target;
                
        let answers = this.state.answers;
        
        answers[key] = {
            ...(this.state.answers[key]),
            [name]: value,
            questionId: key
        };
        
        this.setState({answers: answers});            
    }
    
    _handleStudentChange(event) {
        const { value } = event.target;
        const { students } = this.state;
        
        this.setState({studentId: value});
        
        students.map((student, key) => {
            if (student.id === value) {
                this.setState({homeroomId: student.homeroomId});                
            }
            return true;
        });        
    }    
    
    _renderStudents() {
        const { students } = this.state;

        return students.map((student, key) => (
            <MenuItem key={key} value={ student.id }>
                { student.name }
            </MenuItem>
        ));
    }
    
    _renderHomerooms() {
        const { homerooms } = this.state;

        return homerooms.map((homeroom, key) => (
            <MenuItem key={key} value={ homeroom.id }>
                { homeroom.name }
            </MenuItem>
        ));
    }    
  
    _renderQuestions() {
        const {t, recordRequest} = this.props;
        const {scap, answers} = this.state;               
         
        if (!recordRequest.get('success') || scap.questions.length === 0) {            
            return (
                <div className="text-center">{t('noAnyQuestions')}</div>
            ); 
        }        
        
        return scap.questions.map((question, key) => {
            let answer = answers[question.id] || {};
            return (<div key={key}>                
                <h6 className="text-left pre-line">{question.question}</h6>
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3 text-left">                    
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='name-error'>{t('score')}</InputLabel>
                            <Select                              
                                name='score'
                                style={{minWidth: 200}}
                                onChange={(e) => {
                                    this._handleAnswerChange(e, question.id)                              
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
                                  this._handleAnswerChange(e, question.id)
                              }}                      
                            />
                        </FormControl>
                    </div>
                </div>  
            </div>);
        });        
    }    

    render() {
        const {t, recordRequest, addAnswersRequest} = this.props;
        const {scap} = this.state;        
        const errors = addAnswersRequest.get('errors');
        
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
                                <p>{scap.title}</p>
                                <h6>{t('description')}</h6> 
                                <p className="pre-line">{scap.description}</p>
                                <h6>{t('student')}</h6>
                                <div>                    
                                    <FormControl className='full-width form-inputs'>                                        
                                        <Select                              
                                            name='studentId'
                                            style={{maxWidth: 250}}
                                            onChange={(e) => { this._handleStudentChange(e) }}
                                            value={this.state.studentId || ''}>
                                            { this._renderStudents() }
                                        </Select>   
                                        {errors && errors.get('studentId') && <FormHelperText error>{ errors.get('studentId').get(0) }</FormHelperText>}
                                    </FormControl>
                                </div>
                                <h6>{t('homeroom')}</h6>
                                <div>                    
                                    <FormControl className='full-width form-inputs'>                                        
                                        <Select                              
                                            name='homeroomId'
                                            style={{maxWidth: 250}}
                                            onChange={(e) => { this.setState({homeroomId: e.target.value}) }}
                                            value={this.state.homeroomId || ''}>
                                            { this._renderHomerooms() }
                                        </Select>   
                                        {errors && errors.get('homeroomId') && <FormHelperText error>{ errors.get('homeroomId').get(0) }</FormHelperText>}
                                    </FormControl>
                                </div>                                 
                            </div>                              
                            <div className="col-sm-12">
                                <h5 className="text-left mb-4">{t('questions')}</h5>
                                {errors && errors.get('answers') && <FormHelperText error className="mb-3">{ errors.get('answers').get(0) }</FormHelperText>}
                                <div>{this._renderQuestions()}</div>                                
                            </div>
                            <div className="col-sm-12 mt-5 text-center">
                                <Button disabled={addAnswersRequest.get('loading')} onClick={() => { this._saveAnswers(0) }} variant="contained" color='primary' className='mt-btn mt-btn-success mr-3'>
                                    {t('saveAndPublish')}
                                    <Icon className="ml-2">check</Icon>
                                </Button>
                                <Button disabled={addAnswersRequest.get('loading')} onClick={() => { this._saveAnswers(1) }} variant="contained" color='primary' className='mt-btn mt-btn-success mr-3'>
                                    {t('saveAsDraft')}
                                    <Icon className="ml-2">check</Icon>
                                </Button>                                 
                                <Button disabled={addAnswersRequest.get('loading')} onClick={() => { this._goBack() }} variant="contained" color='default' className='mt-btn mt-btn-cancel'>
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

FillTemplate = connect(
    (state) => ({        
        recordRequest: selectGetRecordRequest(state),
        addAnswersRequest: selectAddAnswersRequest(state),
        schoolStudentsRequest: selectGetSchoolStudentsRequest(state),
        homeroomsRequest: selectGetSchoolHomeroomsRequest(state)
    }),
    (dispatch) => ({
        getRecord: (id) => {
            dispatch(getAssignedRecord(id));
        },
        getSchoolStudents: () => {
            dispatch(getSchoolStudents());
        },
        getSchoolHomerooms: () => {
            dispatch(getSchoolHomerooms());
        },        
        resetGetRecordRequest: () => {
            dispatch(resetGetRecordRequest());
        },
        addAnswers: (data) => {
            dispatch(addAnswers(data));
        },
        resetAddAnswersRequest: () => {
            dispatch(resetAddAnswersRequest());
        },        
        goTo: (url) => {dispatch(push(url))}
    })
)(FillTemplate);

export default withTranslation('translations')(FillTemplate);