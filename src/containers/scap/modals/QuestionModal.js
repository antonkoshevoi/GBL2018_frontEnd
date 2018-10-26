import React, {Component} from 'react';
import {
  AppBar,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  TextField,    
  FormControl,
  FormHelperText,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { translate } from 'react-i18next';
import Modal from '../../../components/ui/Modal';

class QuestionModal extends Component {
 
  constructor (props) {
    super(props);
    this.state = {
        question: '',
        error: ''
    };
  };  

  _close () {     
    this.setState({         
        question: '',
        error: ''      
    });
    this.props.onClose();     
  };

  _handleQuestionChange (event) {  
      const { value } = event.target;
      if (value) {
        this.setState({ 
            error: ''
        });          
      }      
      this.setState({ 
          question: value
      });
  };

  _onSubmit (e) {  
    const { t } = this.props;
    const { question } = this.state;
    
    e.preventDefault();
    
    if (!question) {        
        this.setState({ 
            error: t('enterQuestionText')
        }); 
        return false;
    }
    
    this.props.onSuccess(question);
    
    this.setState({ 
        question: ''
    });    
  };

  render() {
    const { isOpen, t } = this.props;
    const { question, error } = this.state;      
    
    return (
      <Modal minWidth="250" isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <Icon className="m--margin-right-15">add_circle</Icon>                          
            <Typography variant="h6" color='inherit'>
                {t('addNewQuestion')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>
          <form id='create-student-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className='row'>
              <div className='col-sm-12 m-auto'>
                <FormControl aria-describedby='new-question-error-error-text' className='full-width form-inputs'>                      
                    <TextField
                      id="newQuestion"
                      label={t('question')}
                      multiline
                      rows="4"                                  
                      style={{minWidth: '300px'}}
                      value={question || ''}                                 
                      onChange={(e) => {
                        this._handleQuestionChange(e)
                      }}                      
                    />       
                    {error && <FormHelperText error>{error}</FormHelperText>}
                </FormControl>
              </div>        
            </div>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-student-form'            
            className='mt-btn-success pull-right btn btn-success mt-btn'
            color='primary'>
            {t('add')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
  
export default translate('translations')(QuestionModal);