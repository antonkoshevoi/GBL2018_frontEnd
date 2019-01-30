import React, {Component} from 'react';
import {AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider, Button, DialogActions} from '@material-ui/core';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {selectGetSingleRecordRequest, selectUpdateRequest} from '../../../redux/parents/selectors';
import {update, resetGetSingleRecordRequest, resetUpdateRequest} from '../../../redux/parents/actions';
import Modal from "../../../components/ui/Modal";
import ParentForm from "../forms/ParentForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class EditParentModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            parent: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.recordRequest.get('success') && nextProps.recordRequest.get('success')) {            
            const parent = nextProps.recordRequest.get('record').toJS();            
            this.setState({
                id: parent.id,
                parent: parent,
                avatar: parent.avatar
            });
        }

        if (!this.props.updateRequest.get('success') && nextProps.updateRequest.get('success')) {
            this._close();
            this.props.onSuccess();
        }
    }

    _close() {
        this.setState({
            id: null,
            parent: {}
        });
        this.props.onClose();
        this.props.resetUpdateRequest();
        this.props.resetGetSingleRecordRequest();
    };

    _onChange(parent) {
        this.setState({parent});
    };

    _onSubmit(e) {
        e.preventDefault();
        let {id, parent} = this.state;        
        this.props.update( id, parent );
    };


    _setCroppedImage(img) {      
        this.setState({
            parent: {
                ...this.state.parent,
                avatarCropped: img                
            }
        });
    }

    _setImage(img) {
        this.setState({avatar: img});
    }

    render() {
        const {isOpen, updateRequest, recordRequest, t} = this.props;
        const loading = updateRequest.get('loading') || recordRequest.get('loading');       
        const errors = updateRequest.get('errors');

        return (
            <Modal isOpen={isOpen} middle={true} onClose={() => this._close()}>

                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>                        
                        {loading ? (
                            <CircularProgress className="m--margin-right-15" color="inherit"/>
                        ) : (
                            <Icon className="m--margin-right-15">person</Icon>
                        )}                       
                        <Typography variant="h6" color="inherit">
                            {t('editParent')}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className="m--margin-top-25">
                    <form id='update-parent-form' onSubmit={(e) => { this._onSubmit(e) }}>
                        <div className="row">
                            <div className="col-md-6">
                                <ParentForm
                                    onChange={(parent) => {
                                        this._onChange(parent)
                                    }}
                                    parent={this.state.parent}
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
                        form='update-parent-form'
                        disabled={loading}                        
                        className='mt-btn-success pull-right btn btn-success mt-btn'
                        color='primary'>
                        {t('updateParent')}
                    </Button>
                </DialogActions>
            </Modal>
        );
    }
}

EditParentModal = connect(
    (state) => ({
        recordRequest: selectGetSingleRecordRequest(state),
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
        }
    })
)(EditParentModal);

export default translate('translations')(EditParentModal);
