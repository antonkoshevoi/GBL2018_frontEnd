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
import ReactSortable  from 'react-sortablejs';
import QuestionModal from './modals/QuestionModal'
import { selectCreateRequest } from '../../redux/scap/selectors';
import { create, resetCreateRequest } from '../../redux/scap/actions';

class BuildTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQuestionModal: false,
            form: {},
            questions: []
        }
    }
    
    componentDidUpdate(prevProps) {                
        const success = this.props.createRequest.get('success');        

        if (success && !prevProps.createRequest.get('success')) {            
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
        
        questions.push(question);
        
        this.setState({
            showQuestionModal: false,
            questions: questions
        });
    }
    
    _saveTemplate() {
        this.props.create({
            ...this.state.form,
            questions: this.state.questions
        });
    }
    
    _handleQuestionChange(event, key) {
        let questions = this.state.questions.slice();
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
        
        return questions.map((record, key) => (          
            <div key={key} className="col-sm-12 col-md-8" data-id={record}>
                <FormControl className='full-width form-inputs'>                      
                    <TextField
                      id={`question-${key}`}
                      label={`${t('question')} #${(key + 1)}`}
                      multiline
                      rowsMax="100"                          
                      value={record}                                 
                      onChange={(e) => {
                        this._handleQuestionChange(e, key)
                      }}                      
                    />                               
                </FormControl>
            </div>
        ));        
    }    

    render() {
        const {t, createRequest, goTo} = this.props;
        const {form, questions, showQuestionModal} = this.state;
        const errors = createRequest.get('errors');       
        
        return (
            <div className='fadeInLeft  animated'> 
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-blue'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o'></i></span>
                                <h3 className='m-portlet__head-text'>{t('buildTemplate')}</h3>
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
                                            this.setState({questions: order });
                                        }}>
                                        {this._renderQuestions()}
                                    </ReactSortable>
                                    {!questions.length && errors && errors.get('questions') && <p className="text-center mt-5 text-danger">{t('pleaseAddAnyQuestions')}</p>}
                                </div>
                            </div>
                            <div className="col-sm-12 mt-5 text-left">
                                <Button onClick={() => { this._showQuestionModal() }} variant="contained" color='primary' className='mt-btn mt-btn-success'>
                                    <Icon className="mr-3">add</Icon>
                                    {t('addNewQuestion')}
                                </Button>                              
                            </div>
                            <div className="col-sm-12 mt-5 text-center">
                                <Button disabled={createRequest.get('loading')} onClick={() => { this._saveTemplate() }} variant="contained" className='mt-btn mt-btn-success mr-3'>
                                    {t('saveTemplate')}
                                    <Icon className="ml-2">check</Icon>
                                </Button>
                                <Button disabled={createRequest.get('loading')} onClick={() => { goTo("/scap") }} variant="contained">
                                    {t('cancel')}                                    
                                </Button>                               
                            </div>                              
                        </div>                        
                    </div>
                </div>                              
                <QuestionModal isOpen={showQuestionModal} onClose={() => { this._closeQuestionModal() }} onSuccess={(e) => { this._addQuestion(e) }}  />
            </div>
        );
    }
}

export default withTranslation('translations')(connect(
    (state) => ({
        createRequest: selectCreateRequest(state)
    }),
    (dispatch) => ({
        create: (params = {}) => {
            dispatch(create(params))
        },
        goTo: (url) => {dispatch(push(url))},
        reset: () => {dispatch(resetCreateRequest())}
    })
)(BuildTemplate));