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
import { translate } from 'react-i18next';
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
                student: nextRecord.toJS()
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
        this.props.update(
            this.state.id,
            this.state.student
        );
    };


    _setCroppedImage(img) {
        this.setState(
            {
                student: {
                    ...this.state.student,
                    croppedAvatar: img
                }
            }
        );
    }

    _setImage(img) {
        this.setState(
            {
                student: {
                    ...this.state.student,
                    avatar: img
                }
            }
        );
    }

    render() {
        const {isOpen, updateRequest, getSingleRecordRequest, t} = this.props;
        const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');       
        const errors = updateRequest.get('errors');

        return (
            <Modal isOpen={isOpen} bigger onClose={() => this._close()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                        
                        {loading ? (
                            <CircularProgress className="m--margin-right-15" color="inherit"/>
                        ) : (
                            <Icon className="m--margin-right-15">person</Icon>
                        )}                       
                        <Typography type="title" color="inherit">
                            {t('editStudent')}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className="m--margin-top-25">
                    <form id='update-student-form' onSubmit={(e) => {
                        this._onSubmit(e)
                    }}>
                        <div className="row">
                            <div className="col-md-6">
                                <ImageCropper
                                    circularButton
                                    image={this.state.student.avatar}
                                    onCrop={(cropImg) => this._setCroppedImage(cropImg)}
                                    setFile={(img) => this._setImage(img)}/>
                            </div>
                            <div className="col-md-6">
                                <StudentForm
                                    onChange={(student) => {
                                        this._onChange(student)
                                    }}
                                    student={this.state.student}
                                    errors={errors}/>
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
                        variant="raised"
                        className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
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

export default translate('translations')(EditStudentModal);
