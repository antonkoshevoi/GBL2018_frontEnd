import React, {Component} from 'react';
import {
  AppBar, CircularProgress,
  DialogContent,
  FormControlLabel,
  Icon, Checkbox, Grid,
  Toolbar, Typography, FormGroup,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import { getRecords } from "../../../redux/teachers/actions";
import { assignTeachers, resetAssignTeachersRequest } from "../../../redux/scap/actions";
import { selectGetRecordsRequest, selectRecords } from "../../../redux/teachers/selectors";
import { selectAssignTeachersRequest } from "../../../redux/scap/selectors";

class AssignTeachersModal extends Component {

    constructor (props) {
        super(props);
        this.state = {
            templateId: null,
            teacherIds: []
            
        };
    }
    
    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.props.getTeachers();
            
            const teacherIds = nextProps.template.get('teacherIds').map((id) => {                
                return id.toString();
            });          
                        
            this.setState({
                templateId: nextProps.template.get('id'),
                teacherIds: teacherIds.toJS()
            });
        }
        
        this._handleSuccessAssigned(nextProps);
    }

    _handleSuccessAssigned(nextProps) {
        const success = this.props.assignTeachersRequest.get('success');
        const nextSuccess = nextProps.assignTeachersRequest.get('success');

        if (!success && nextSuccess) {
            this._close();
            this.props.onSuccess();
        }
    }

    _close () {
        this.setState({
            templateId: null,
            teacherIds: []
        });
        this.props.resetAssignTeachersRequest();
        this.props.onClose();
    };

    _onSubmit (e) {
        e.preventDefault();

        const { templateId, teacherIds } = this.state;

        this.props.assignTeachers(templateId, {
            teacherIds: teacherIds
        });
    };
  
    _handleCheckboxChange(event) {
        let {teacherIds} = this.state;
        const { value, checked } = event.target;
        const index = teacherIds.indexOf(value.toString());

        if (!checked && (index > -1)) {
            teacherIds.splice(index, 2);
        }         
        if (checked && (index < 0)) {
            teacherIds.push(value.toString());
        }
    
        this.setState({teacherIds: teacherIds});
    }  

    _renderTeachers() {
        const { teachers } = this.props;    

        if (!teachers.size) {
            return <div>
                <Typography variant="h4" gutterBottom>No Teachers...</Typography>
            </div>
        }
    
        return teachers.map((teacher, key) => (
          <Grid item xs={4} key={key}>
            <FormControlLabel
              control={<Checkbox
                checked={this.state.teacherIds.indexOf(teacher.get('id').toString()) > -1}
                onChange={ (e) => {this._handleCheckboxChange(e) }}
                value={teacher.get('id').toString()}
              />}
              label={teacher.get('name')}
            />
          </Grid>
        ));
    }
  
    render() {
        const { isOpen, getTeachersRequest, assignTeachersRequest, t } = this.props;
            
        const loading = getTeachersRequest.get('loading') || assignTeachersRequest.get('loading');
        const success = getTeachersRequest.get('success');        

        return (
            <Modal isOpen={isOpen} onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                      
                        {loading ? (
                          <CircularProgress className="m--margin-right-15" color="inherit"/>
                        ) : (
                          <Icon className="m--margin-right-15">person</Icon>
                        )}                      
                        <Typography variant="h6" color="inherit" >
                            {t('assignTeachers')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="m--margin-top-25">                    
                    <form id='assign-teachers-form' onSubmit={(e) => { this._onSubmit(e) }}>
                      <div className='row'>                                         
                          <FormGroup row style={{minWidth: '500px'}}>                            
                                {success ? this._renderTeachers() : <div className="text-center" style={{width: '100%'}}><CircularProgress color="primary"/></div>}
                          </FormGroup>                        
                      </div>
                    </form>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button
                      type='submit'
                      form='assign-students-form'
                      disabled={loading}                      
                      className='mt-btn-success pull-right btn btn-success mt-btn'
                      onClick={ (e) => {this._onSubmit(e) }}
                      color='primary'>
                      {t('assignTeachers')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

AssignTeachersModal = connect(
  (state) => ({
    getTeachersRequest: selectGetRecordsRequest(state),
    assignTeachersRequest: selectAssignTeachersRequest(state),
    teachers: selectRecords(state)
  }),
  (dispatch) => ({    
    getTeachers: () => { dispatch(getRecords()) },
    assignTeachers: (id, data) => { dispatch(assignTeachers(id, data)) },
    resetAssignTeachersRequest: () => { dispatch(resetAssignTeachersRequest()) }
  })
)(AssignTeachersModal);

export default translate('translations')(AssignTeachersModal);
