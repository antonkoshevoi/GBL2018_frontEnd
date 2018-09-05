import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import {
  Icon,
  FormControl,
  FormHelperText,
  Input,
  TextField,
  InputLabel, 
  Button
} from '@material-ui/core';
import Loader from "../../components/layouts/Loader";
import { selectGetRecordRequest } from '../../redux/scap/selectors';
import { getAssignedRecord, addAnswers, resetUpdateRequest } from '../../redux/scap/actions';

class FillTemplate extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            id: this.props.match.params.id,            
            form: {},
            questions: []
        }
    }

    componentDidMount() {
        this.props.getRecord(this.props.match.params.id);
    }
    
    componentWillReceiveProps(nextProps) {        
        const record = this.props.recordRequest.get('record');
        const nextRecord = nextProps.recordRequest.get('record');

        if (!record && nextRecord) {
            this.setState({
                form: nextRecord.toJS(),
                questions: nextRecord.get('questions').toJS()
            });
        }        
    }    
    
    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
          form: {
            ...this.state.form,
            [name]: value
          }
        });
    }
    
    _showQuestionModal() {
        this.setState({
            showQuestionModal: true
        });
    }
    
    _closeQuestionModal() {
        this.setState({
            showQuestionModal: false
        });        
    }
    
    _addQuestion(question) {
        let { questions } = this.state;
        
        questions[Math.random()] = question;
        
        this.setState({
            showQuestionModal: false,
            questions: questions
        });
    }
    
    _deleteQuestion(key) {
        let { questions } = this.state;
        
        delete questions[key];
        
        this.setState({            
            questions: questions
        });        
    }
    
    _saveTemplate() {        
        this.props.update(this.state.id, {
            ... this.state.form,
            questions: this.state.questions
        });
    }
    
    _handleQuestionChange(event, key) {
        let questions = this.state.questions;               
        
        questions[key] = event.target.value; 
        
        this.setState({questions: questions});
    }
    
    _renderQuestions() {
        const {t} = this.props;
        const {questions} = this.state;
        
        
        if (questions.length === 0) {            
            return (
                <div className="text-center">{t('noAnyQuestions')}</div>
            ); 
        }        
        
        return Object.keys(questions).map((record, key) => (
            <div>
                
                    <h6 className="text-left">{questions[record]}</h6>
                    <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3 text-left">
                    
                        <TextField
                          id={`question-${record}`}
                          label={t('rate')}
                          multiline
                          rowsMax="100"                          
                          value={''}                                 
                          onChange={(e) => {
                            
                          }}                      
                        />    
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6  text-left">
                        <TextField
                          id={`question-${record}`}
                          label={t('notes')}
                          multiline
                          rowsMax="100"                          
                          value={''}                                 
                          onChange={(e) => {
                            
                          }}                      
                        />       
                        </div>                        
                   
                </div>  
            </div>
        ));        
    }    

    render() {
        const {t, recordRequest} = this.props;
        const {form, questions, showQuestionModal} = this.state;
        
        const errors = null;
        
        return (
            <div className='fadeInLeft  animated'>               
                {!recordRequest.get('success') ? <Loader/> : 
                (<div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>{t('UpdateScapTemplate')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">                              
                              <p><h6>{t('title')}</h6> {form.title}</p>
                              <p><h6>{t('description')}</h6> {form.description}</p>                              
                            </div>                              
                            <div className="col-sm-12 m--margin-top-20 text-right">
                                <h5 className="text-left m--margin-bottom-20">{t('questions')}</h5>
                                <div>{this._renderQuestions()}</div>                                
                            </div>
                            <div className="col-sm-12 m--margin-top-40 text-center">
                                <Button  onClick={() => { this._saveTemplate() }} variant="raised" color='primary' className='mt-btn mt-btn-success m--margin-right-15'>
                                    {t('save')}
                                    <Icon className="m--margin-left-5">check</Icon>
                                </Button>
                                <NavLink to="/scap" className="link-btn">
                                    <Button variant="raised" color='default' className='mt-btn mt-btn-cancel'>
                                        {t('cancel')}                                    
                                    </Button>
                                </NavLink>
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
        recordRequest: selectGetRecordRequest(state)
    }),
    (dispatch) => ({
        getRecord: (id) => {
            dispatch(getAssignedRecord(id));
        },
        goTo: (url) => {dispatch(push(url))}
    })
)(FillTemplate);

export default translate('translations')(FillTemplate);