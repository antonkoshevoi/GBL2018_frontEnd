import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Icon,
  FormControl,
  FormHelperText,
  Input,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button
} from '@material-ui/core';
//import DraggableList from 'react-draggable-list';
import QuestionModal from './modals/QuestionModal'

class BuildTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showQuestionModal: false,
            form: {},
            questions: []
        }
    }

    componentDidMount() {

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
            <div className="col-sm-12 col-md-8">
                <FormControl aria-describedby='new-question-error-error-text' className='full-width form-inputs'>                      
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
        const {t} = this.props;
        const {form, showQuestionModal} = this.state;
        const errors = null;

        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-orange'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon'><i className='la la-comment-o' style={{fontSize: '55px'}}></i></span>
                                <h3 className='m-portlet__head-text'>{t('buildTemplate')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <div className="row">
                            <div className="col-sm-12 col-md-4">
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
                              </div>
                              <div className="col-sm-12 col-md-8">
                              <FormControl aria-describedby='description-error-text' className='full-width form-inputs'>
                                <InputLabel htmlFor='descriptiondescription-error'>{t('description')}</InputLabel>
                                <Input 
                                  name='description'
                                  margin='dense'
                                  fullWidth
                                  value={form.description || ''}                                 
                                  onChange={(e) => {
                                    this._handleInputChange(e)
                                  }}/>
                                {errors && errors.get('description') && <FormHelperText error>{errors.get('description').get(0)}</FormHelperText>}
                              </FormControl>
                              </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 m--margin-top-40 text-right">
                                <h4 className="text-left">{t('questions')}</h4>
                                <div>{this._renderQuestions()}</div>
                            </div>
                          <div className="col-sm-12 m--margin-top-40 text-right">
                                <Button onClick={() => { this._showQuestionModal() }} variant="raised" color='primary' className='mt-btn mt-btn-success m--margin-right-5'>
                                    {t('addNewQuestion')}
                                    <Icon className="m--margin-left-5">add</Icon>
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

BuildTemplate = connect(
    (state) => ({
             
    }),
    (dispatch) => ({

    })
)(BuildTemplate);

export default translate('translations')(BuildTemplate);