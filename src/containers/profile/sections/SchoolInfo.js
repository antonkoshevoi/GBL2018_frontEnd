import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectUpdateRequest} from "../../../redux/schools/selectors";
import { update } from "../../../redux/schools/actions";
import { Dialog } from '@material-ui/core';
import ImageCropper from "../../../components/ui/ImageCropper";
import Card from "../../../components/ui/Card";

class SchoolInfo extends Component {

  static propTypes = {
    school: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadModal:false,
      croppedImage:null,
      image:null
    }
  }

  _openUploadModal(){
    this.setState({uploadModal:true})
  }

  _closeUploadModal(){
    this.setState({uploadModal:false})
  }

  _setCroppedImage(img){
    this.setState({croppedImage:img});
    this._closeUploadModal();
  }

  _setImage(img){
    this.setState({avatarCropped:img});
    this._closeUploadModal();
  }

  _onSubmit (croppedImg,img) {
    const { school } = this.props;

    this.props.update(
      {
        ...school,
        schoolLogo:img,
        schoolLogoCropped:croppedImg
      }
    );
  };

  render() {
    const { school, t } = this.props;

    return (
      <div className="m-portlet m--margin-bottom-15">
        <div className="m-portlet__body">
          <div className="m-card-profile">
            <div className="m-card-profile__details">
              <span className="m-card-profile__name">{school.schName}</span>
            </div>
            <div className="m-card-profile__pic">
              <div className="m-card-profile__pic-wrapper">
                <img src={school.logo} alt=""/>
              </div>
              <div className="text-center m--margin-bottom-20">
                <button className="m-btn btn btn-info" onClick={()=>{this._openUploadModal()}}>{t('uploadLogo')}</button>
              </div>
            </div>

          </div>
        </div>

        <Dialog
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.uploadModal}
          onClose={() => this._closeUploadModal()}
        >
         <Card title={t('uploadLogo')} icon="fa fa-upload" style={{minWidth:'280px'}}>
            <ImageCropper saveButton circularButton onSubmit={(cropImg,img) => this._onSubmit(cropImg,img)} onCrop={(cropImg) => this._setCroppedImage(cropImg)} setFile={(img) => this._setImage(img)}/>
         </Card>
        </Dialog>
      </div>
    );
  }
}

SchoolInfo = connect(
  (state) => ({
    getUpdateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    update: (form, params = {}) => { dispatch(update(form, params)) },
  })
)(SchoolInfo);

export default translate('translations')(SchoolInfo);
