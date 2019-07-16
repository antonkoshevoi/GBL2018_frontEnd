import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, CircularProgress,
    DialogContent,    
    Icon,
    Toolbar, Typography,
    Divider, Button,
    DialogActions
} from '@material-ui/core';
import {connect} from 'react-redux';
import { withTranslation } from 'react-i18next';
import {selectGetSingleRecordRequest, selectUpdateRequest} from '../../../redux/students/selectors';
import {update, resetGetSingleRecordRequest, resetUpdateRequest} from '../../../redux/students/actions';
import Modal from "../../../components/ui/Modal";
import StudentForm from "../forms/StudentForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class EditStudentModal extends Component {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onSuccess: PropTypes.any.isRequired,
        update: PropTypes.func.isRequired,
        resetUpdateRequest: PropTypes.func.isRequired,
        updateRequest: PropTypes.any.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            student: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const record = this.props.getSingleRecordRequest.get('record');
        const nextRecord = nextProps.getSingleRecordRequest.get('record');

        if (!record && nextRecord) {
            this.setState({
                id: nextRecord.get('id'),
                student: nextRecord.toJS(),
                avatar: nextRecord.toJS().avatar
            });
        }

        const success = this.props.updateRequest.get('success');
        const nextSuccess = nextProps.updateRequest.get('success');

        if (!success && nextSuccess) {
            this._close();
            this.props.onSuccess();
        }
    }

    _close() {
        this.setState({
            id: undefined,
            student: {}
        });
        this.props.onClose();
        this.props.resetUpdateRequest();
        this.props.resetGetSingleRecordRequest();
    };

    _onChange(student) {
        this.setState({student});
    };

    _onSubmit(e) {
        e.preventDefault();
        let {id, student} = this.state;        
        this.props.update( id, student );
    };


    _setCroppedImage(img) {      
        this.setState({
            student: {
                ...this.state.student,
                avatarCropped: img                
            }
        });
    }

    _setImage(img) {
        this.setState({avatar: img});
    }

    render() {
        const {isOpen, updateRequest, getSingleRecordRequest, t} = this.props;
        const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');       
        const errors = updateRequest.get('errors');

        return (
            <Modal isOpen={isOpen} middle={true} onClose={() => this._close()}>

                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                        
                        {loading ? (
                            <CircularProgress className="mr-3" color="inherit"/>
                        ) : (
                            <Icon className="mr-3">person</Icon>
                        )}                       
                        <Typography variant="h6" color="inherit">
                            {t('editStudent')}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className="mt-4">
                    <form id='update-student-form' onSubmit={(e) => {
                        this._onSubmit(e)
                    }}>
                        <div className="row">
                            <div className="col-md-6">
                                <StudentForm
                                    onChange={(student) => {
                                        this._onChange(student)
                                    }}
                                    student={this.state.student}
                                    errors={errors}/>
                            </div>
                            <div className="col-md-6">
                                <ImageCropper
                                    circularButton
                                    image={this.state.avatar || ''}
                                    onCrop={(cropImg) => this._setCroppedImage(cropImg)}
                                    setFile={(img) => this._setImage(img)}/>
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <Divider className='full-width'/>
                <DialogActions>
                    <Button
                        type='submit'
                        form='update-student-form'
                        disabled={loading}                        
                        className='mt-btn-success mt-btn'
                        color='primary'>
                        {t('updateStudent')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

EditStudentModal = connect(
    (state) => ({
        getSingleRecordRequest: selectGetSingleRecordRequest(state),
        updateRequest: selectUpdateRequest(state),
    }),
    (dispatch) => ({
        update: (id, form, params = {}) => {
            dispatch(update(id, form, params))
        },
        resetUpdateRequest: () => {
            dispatch(resetUpdateRequest())
        },
        resetGetSingleRecordRequest: () => {
            dispatch(resetGetSingleRecordRequest())
        },
    })
)(EditStudentModal);

export default withTranslation('translations')(EditStudentModal);
