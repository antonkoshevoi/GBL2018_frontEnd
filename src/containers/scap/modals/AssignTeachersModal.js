import React, {Component} from 'react';
import {
  AppBar, CircularProgress,
  DialogContent,
  FormControlLabel,
  Icon, Checkbox,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
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
    
    componentDidUpdate(prevProps) {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.props.getTeachers();
            
            const teacherIds = this.props.template.get('teacherIds').map((id) => {                
                return id.toString();
            });          
                        
            this.setState({
                templateId: this.props.template.get('id'),
                teacherIds: teacherIds.toJS()
            });
        }
        
        this._handleSuccessAssigned(prevProps);
    }

    _handleSuccessAssigned(prevProps) {
        const success = this.props.assignTeachersRequest.get('success');        

        if (success && !prevProps.assignTeachersRequest.get('success')) {
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
    }

    _onSubmit (e) {
        e.preventDefault();

        const { templateId, teacherIds } = this.state;

        this.props.assignTeachers(templateId, {
            teacherIds: teacherIds
        });
    }
  
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
            return <div className="col-12">
                <Typography variant="h4" gutterBottom>No Teachers...</Typography>
            </div>
        }
    
        return teachers.map((teacher, key) => (
          <div className="col-12 col-sm-6 col-md-4" key={key}>
            <FormControlLabel
              control={<Checkbox
                color="primary"
                checked={this.state.teacherIds.indexOf(teacher.get('id').toString()) > -1}
                onChange={ (e) => {this._handleCheckboxChange(e) }}
                value={teacher.get('id').toString()}
              />}
              label={teacher.get('name')}
            />
          </div>
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
                          <CircularProgress className="mr-3" color="inherit"/>
                        ) : (
                          <Icon className="mr-3">person</Icon>
                        )}                      
                        <Typography variant="h6" color="inherit" >
                            {t('assignTeachers')}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className="mt-4">                    
                    <form id='assign-teachers-form' onSubmit={(e) => { this._onSubmit(e) }}>
                      <div className='row'>                                                                                    
                        {success ? this._renderTeachers() : <div className="col-12 text-center"><CircularProgress color="primary"/></div>}                                          
                      </div>
                    </form>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button
                      type='button'                     
                      disabled={loading}                      
                      className='mt-btn-success mt-btn'
                      onClick={ (e) => {this._onSubmit(e) }}
                      color='primary'>
                      {t('assignTeachers')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

export default withTranslation('translations')(connect(
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
)(AssignTeachersModal));
