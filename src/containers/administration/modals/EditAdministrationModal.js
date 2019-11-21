import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar, CircularProgress,    
    Icon,
    Toolbar, Typography, Divider,
    Button, DialogActions, DialogContent
} from '@material-ui/core';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selectGetSingleRecordRequest, selectUpdateRequest} from '../../../redux/administration/selectors';
import {update, resetGetSingleRecordRequest, resetUpdateRequest} from '../../../redux/administration/actions';
import Modal from "../../../components/ui/Modal";
import AdministrationForm from "../forms/AdministrationForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class EditAdministrationModal extends Component {
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
            adminUser: {}
        };
    }

    componentDidUpdate(prevProps) {
        const record = this.props.getSingleRecordRequest.get('record');
        const prevRecord = prevProps.getSingleRecordRequest.get('record');

        if (record && !prevRecord) {                    
            this.setState({
                id: record.get('id'),
                adminUser: record.toJS(),
                avatar: record.toJS().avatar
            });
        }

        const success = this.props.updateRequest.get('success');        

        if (success && !prevProps.updateRequest.get('success')) {
            this._onClose();
            this.props.onSuccess();
        }
    }

    _onClose() {
        this.setState({
            id: undefined,
            adminUser: {}
        });
        this.props.resetUpdateRequest();
        this.props.resetGetSingleRecordRequest();
        this.props.onClose();
    };

    _onChange(adminUser) {
        this.setState({adminUser});
    };

    _onSubmit(e) {
        e.preventDefault();
        this.props.update(
            this.state.id,
            this.state.adminUser
        );
    };

    _setCroppedImage(img) {
        this.setState(
            {
                adminUser: {
                    ...this.state.adminUser,
                    avatarCropped: img
                }
            }
        );
    }

    _setImage(img) {
        this.setState({avatar: img});
    }

    render() {
        const {isOpen, updateRequest, getSingleRecordRequest, t} = this.props;
        const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');        
        const errors = updateRequest.get('errors');

        return (
            <Modal isOpen={isOpen} middle={true} onClose={() => this._onClose()}>
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                        
                        {loading ? (
                            <CircularProgress className="mr-3" color="inherit"/>
                        ) : (
                            <Icon className="mr-3">person</Icon>
                        )}                        
                        <Typography variant="h6" color="inherit">
                            {t('editUser')}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className="mt-4">
                    <form id='update-administrator-form' onSubmit={(e) => {
                        this._onSubmit(e)
                    }}>
                        <div className="row">
                            <div className="col-md-6">
                                <AdministrationForm
                                    onChange={(adminUser) => {
                                        this._onChange(adminUser)
                                    }}
                                    adminUser={this.state.adminUser}
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
                        form='update-administrator-form'
                        disabled={loading}                        
                        className='mt-btn-success mt-btn'
                        color='primary'>
                        {t('updateUser')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

EditAdministrationModal = connect(
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
)(EditAdministrationModal);

export default withTranslation('translations')(EditAdministrationModal);
