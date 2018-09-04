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
//import DraggableList from 'react-draggable-list';
import QuestionModal from './modals/QuestionModal'
import { selectUpdateRequest, selectGetRecordRequest } from '../../redux/scap/selectors';
import { getRecord, update, resetUpdateRequest } from '../../redux/scap/actions';

class EditTemplate extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            id: this.props.match.params.id,
            showQuestionModal: false,
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
        
        const success = this.props.updateRequest.get('success');
        const nextSuccess = nextProps.updateRequest.get('success');

        if (!success && nextSuccess) {            
            this.props.goTo('/scap');
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
            <div className="row">
                <div className="col-sm-10 col-md-10 col-lg-8">
                    <FormControl aria-describedby='new-question-error-error-text' className='full-width form-inputs'>                      
                        <TextField
                          id={`question-${record}`}
                          label={`${t('question')} #${(key + 1)}`}
                          multiline
                          rowsMax="100"                          
                          value={questions[record]}                                 
                          onChange={(e) => {
                            this._handleQuestionChange(e, record)
                          }}                      
                        />                               
                    </FormControl>
                </div>  
                <div className="col-sm-2 text-left">
                    <a href="#" onClick={(e) => {e.preventDefault(); this._deleteQuestion(record) }}>
                        <i className='la la-remove text-danger' style={{fontWeight: 'bold'}}></i>
                    </a>
                </div>
            </div>
        ));        
    }    

    render() {
        const {t, updateRequest, recordRequest} = this.props;
        const {form, questions, showQuestionModal} = this.state;
        
        const errors = updateRequest.get('errors');
        
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
                              <h5 className="text-left">{t('templateDetails')}</h5>
                              <FormControl aria-describedby='title-error-text' className='full-width form-inputs'>
                                <InputLabel htmlFor='title-error'>{t('title')}</InputLabel>
                                <Input
                                  name='title'
                                  margin='dense'
                                  fullWidth
                                  value={form.title || ''}
                                  onChange={(e) => {
                                    this._handleInputChange(e)
                                  }}/>
                                {errors && errors.get('title') && <FormHelperText error>{errors.get('title').get(0)}</FormHelperText>}
                              </FormControl>                    
                              <FormControl aria-describedby='description-error-text' className='full-width form-inputs'>
                                    <TextField
                                      id='description'                
                                      name='description'
                                      label={t('description')}
                                      multiline
                                      rowsMax="100"
                                      value={form.description || ''}                                 
                                      onChange={(e) => {
                                        this._handleInputChange(e)
                                      }}/>
                                    {errors && errors.get('description') && <FormHelperText error>{errors.get('description').get(0)}</FormHelperText>}
                                </FormControl>                              
                              </div>                              
                        </div>
                        <div className="row">
                            <div className="col-sm-12 m--margin-top-30 text-right">
                                <h5 className="text-left">{t('questions')}</h5>
                                <div>{this._renderQuestions()}</div>
                                {!Object.keys(questions).length && errors && errors.get('questions') && <p className="text-center m--margin-top-40 text-danger">{t('pleaseAddAnyQuestions')}</p>}
                            </div>
                            <div className="col-sm-12 m--margin-top-40 text-left">
                                <Button onClick={() => { this._showQuestionModal() }} variant="raised" color='primary' className='mt-btn mt-btn-success'>
                                    <Icon className="m--margin-right-10">add</Icon>
                                    {t('addNewQuestion')}
                                </Button>                              
                            </div>
                            <div className="col-sm-12 m--margin-top-40 text-center">
                                <Button disabled={updateRequest.get('loading')} onClick={() => { this._saveTemplate() }} variant="raised" color='primary' className='mt-btn mt-btn-success m--margin-right-15'>
                                    {t('saveTemplate')}
                                    <Icon className="m--margin-left-5">check</Icon>
                                </Button>
                                <NavLink to="/scap" className="link-btn">
                                    <Button disabled={updateRequest.get('loading')} variant="raised" color='default' className='mt-btn mt-btn-cancel'>
                                        {t('cancel')}                                    
                                    </Button>
                                </NavLink>
                            </div>                              
                        </div>                        
                    </div>
                </div>)}                     
                <QuestionModal isOpen={showQuestionModal} onClose={() => { this._closeQuestionModal() }} onSuccess={(e) => { this._addQuestion(e) }}  />
            </div>
        );
    }
}

EditTemplate = connect(
    (state) => ({
        updateRequest: selectUpdateRequest(state),
        recordRequest: selectGetRecordRequest(state)
    }),
    (dispatch) => ({
        getRecord: (id) => {
            dispatch(getRecord(id));
        },
        update: (id, params = {}) => {            
            dispatch(update(id, params));
        },
        goTo: (url) => {dispatch(push(url))},
        reset: () => {dispatch(resetUpdateRequest())}
    })
)(EditTemplate);

export default translate('translations')(EditTemplate);