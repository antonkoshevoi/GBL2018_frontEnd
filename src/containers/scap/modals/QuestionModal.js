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
import { withTranslation } from 'react-i18next';
import Modal from '../../../components/ui/Modal';

class QuestionModal extends Component {
 
  constructor (props) {
    super(props);
    this.state = {
        question: '',
        error: ''
    };
  }  

  _close () {     
    this.setState({         
        question: '',
        error: ''      
    });
    this.props.onClose();     
  }

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
  }

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
  }

  render() {
    const { isOpen, t } = this.props;
    const { question, error } = this.state;      
    
    return (
      <Modal minWidth="250" isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <Icon className="mr-3">add_circle</Icon>                          
            <Typography variant="h6" color='inherit'>
                {t('addNewQuestion')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='mt-4'>
          <form id='create-question-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className='row'>
              <div className='col-sm-12 m-auto'>
                <FormControl className='full-width form-inputs'>                      
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
            form='create-question-form'
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('add')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
  
export default withTranslation('translations')(QuestionModal);