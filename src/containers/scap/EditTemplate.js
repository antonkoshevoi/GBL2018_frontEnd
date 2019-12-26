import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
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
import {Loader} from "../../components/ui/Loader";
import ReactSortable  from 'react-sortablejs';
import QuestionModal from './modals/QuestionModal'
import NotFoundPage from '../errors/404';
import { selectUpdateRequest, selectGetRecordRequest } from '../../redux/scap/selectors';
import { getRecord, resetGetRecordRequest, update, resetUpdateRequest } from '../../redux/scap/actions';

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
    
    componentDidUpdate(prevProps) {        
        const record = this.props.recordRequest.get('record');        

        if (record && !prevProps.recordRequest.get('record')) {
            this.setState({
                form: record.toJS(),
                questions: record.get('questions').toJS()
            });
        }
        
        const success = this.props.updateRequest.get('success');        

        if (success && !prevProps.updateRequest.get('success')) {
            this.props.resetGetRecordRequest();
            this.props.goTo('/scap');
        }
    }    
    
    componentWillUnmount() {
        this.props.resetGetRecordRequest();
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
        
        questions.push({
            id: Math.random().toString(36).substr(2, 9),
            question: question
        });
        
        this.setState({
            showQuestionModal: false,
            questions: questions
        });
    }
    
    _deleteQuestion(key) {
        let { questions } = this.state;
        
        questions.splice(key, 1);
        
        this.setState({            
            questions: questions
        });        
    }
    
    _saveTemplate() {        
        this.props.update(this.state.id, {
            ...this.state.form,
            questions: this.state.questions
        });
    }
    
    _goBack() {
        this.props.resetGetRecordRequest();
        this.props.goTo('/scap');
    }
    
    _handleQuestionChange(event, key) {
        let questions = this.state.questions;               
        
        questions[key] = {
            ...questions[key],        
            question: event.target.value
        }; 
        
        this.setState({questions: questions});
    }
    
    _sortQuestions(order)
    {
        let questions = this.state.questions;
                        
        questions.sort( function (a, b) {
            if (order.indexOf(a.id.toString()) > order.indexOf(b.id.toString())) {
                return 1;
            } else {
                return -1;
            }
        });
        
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
        
        return questions.map((question, key) => (
            <div key={key} className="row" data-id={question.id}>
                <div className="col-sm-10 col-md-10 col-lg-8">
                    <FormControl className='full-width form-inputs'>                      
                        <TextField                          
                          label={`${t('question')} #${(key + 1)}`}
                          multiline
                          rowsMax="100"                          
                          value={question.question || ''}                                 
                          onChange={(e) => {
                            this._handleQuestionChange(e, key)
                          }}                      
                        />                               
                    </FormControl>
                </div>  
                <div className="col-sm-2 text-left">
                    <button className="btn m-btn--icon-only bg-transparent" onClick={(e) => {e.preventDefault(); this._deleteQuestion(key) }}>
                        <strong className='fa fa-times-circle text-danger display-6'></strong>
                    </button>
                </div>
            </div>
        ));        
    }    

    render() {
        const {t, updateRequest, recordRequest} = this.props;
        const {form, questions, showQuestionModal} = this.state;
        
        const errors = updateRequest.get('errors');        
        
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
                                <h3 className='m-portlet__head-text'>{t('updateScapTemplate')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-4">
                              <h5 className="text-left">{t('templateDetails')}</h5>
                              <FormControl className='full-width form-inputs'>
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
                              <FormControl className='full-width form-inputs'>
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
                            <div className="col-sm-12 mt-4 text-right">
                                <h5 className="text-left">{t('questions')}</h5>
                                <div className="sortable-questions">
                                    <ReactSortable                                        
                                        options={{
                                            handle: "label"                
                                        }}
                                        onChange={(order) => {    
                                            this._sortQuestions(order);
                                        }}>
                                        {this._renderQuestions()}
                                    </ReactSortable> 
                                </div>
                                {!questions.length && errors && errors.get('questions') && <p className="text-center mt-5 text-danger">{t('pleaseAddAnyQuestions')}</p>}
                            </div>
                            <div className="col-sm-12 mt-5 text-left">
                                <Button onClick={() => { this._showQuestionModal() }} variant="contained" color='primary' className='mt-btn mt-btn-success'>
                                    <Icon className="mr-3">add</Icon>
                                    {t('addNewQuestion')}
                                </Button>                              
                            </div>
                            <div className="col-sm-12 mt-5 text-center">
                                <Button disabled={updateRequest.get('loading')} onClick={() => { this._saveTemplate() }} variant="contained" color='primary' className='mt-btn mt-btn-success mr-3'>
                                    {t('saveTemplate')}
                                    <Icon className="ml-2">check</Icon>
                                </Button>                                
                                <Button disabled={updateRequest.get('loading')} onClick={() => { this._goBack() }} variant="contained">
                                    {t('cancel')}                                    
                                </Button>                                
                            </div>                              
                        </div>                        
                    </div>
                </div>)}                     
                <QuestionModal isOpen={showQuestionModal} onClose={() => { this._closeQuestionModal() }} onSuccess={(e) => { this._addQuestion(e) }}  />
            </div>
        );
    }
}

export default withTranslation('translations')(connect(
    (state) => ({
        updateRequest: selectUpdateRequest(state),
        recordRequest: selectGetRecordRequest(state)
    }),
    (dispatch) => ({
        getRecord: (id) => {
            dispatch(getRecord(id));
        },
        resetGetRecordRequest: () => {
            dispatch(resetGetRecordRequest());
        },
        update: (id, params = {}) => {            
            dispatch(update(id, params));
        },
        goTo: (url) => {dispatch(push(url))},
        reset: () => {dispatch(resetUpdateRequest())}
    })
)(EditTemplate));