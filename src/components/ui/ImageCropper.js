import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import 'cropperjs/dist/cropper.css';
import Cropper from "react-cropper";

class ImageCropper extends Component {

  state = {
    file: '',
    croppedFile: ''
  }
  
  size = {
        width: 250,
        height: 250      
  }

  _handleFileChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();

    if (files.length) {
      reader.onload = () => {
        this.setState({
          file: reader.result
        });
        this._triggerCrop();
      };
      reader.readAsDataURL(files[0]);      
    }
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    if (files.length) {
      reader.onload = () => {
        this.setState({src: reader.result});        
        this._triggerCrop();        
      };
      reader.readAsDataURL(files[0]);
    }
  }

  _rotateImage(angle = 0) {
    this.cropper.rotate(++angle);
    this._handleImageCrop();
  }

  _zoomIn() {
    this.cropper.zoom(0.1);
    this._handleImageCrop();
  }

  _zoomOut() {
    this.cropper.zoom(-0.1);
    this._handleImageCrop();
  }

  _reverseImage(scale) {
    if (scale === 'vertical') {
      if (this.cropper.cropper.imageData.scaleY == 1) {
        this.cropper.scaleY(-1)
      } else {
        this.cropper.scaleY(1)
      }
    } else {
      if (this.cropper.cropper.imageData.scaleX == 1) {
        this.cropper.scaleX(-1)
      } else {
        this.cropper.scaleX(1)
      }
    }
    this._handleImageCrop();
  }

  _handleImageCrop() {
    const {saveButton} = this.props;
    if (typeof this.cropper.getCroppedCanvas() === undefined) {
      return;
    }

    this.setState({
      croppedFile: this.cropper.getCroppedCanvas(this.size).toDataURL()
    });

    if (!saveButton) {
      this.props.setFile(this.state.file);
      setTimeout(() => {
        this.props.onCrop(this.cropper.getCroppedCanvas(this.size).toDataURL());
      }, 200);
    }
  }


  _saveImages() {
    const {croppedFile, file} = this.state;
    this.props.onSubmit(croppedFile, file);
    this.props.setFile(file);
    setTimeout(() => {
      this.props.onCrop(croppedFile);
    }, 200)
  }

  _triggerFileInput() {
    this.fileInput.click();
  }

  _triggerCrop() {    
    setTimeout(() => {
      this.cropButton.click();
    }, 200);
  }
  
  render() {

    const {croppedFile, file} = this.state;
    const {saveButton, circularButton, image, t} = this.props;

    return (
      <div className="CropperBlock">
        {!circularButton &&
        <div className='upload-btn-wrapper '>
          <span className='btn pointer m-btn--air btn-outline-info'>{t('uploadFile')}</span>
          <input type='file' ref={fileInput => this.fileInput = fileInput} name='myfile' onChange={(e) => { this._handleFileChange(e) }}/>
        </div>
        }
        {circularButton &&
        <div className={'upload-btn-wrapper ' + ((croppedFile || image) && 'withImage')}>
          <span className="uploadImgBtn circular pointer" onClick={() => this._triggerFileInput()}>
               {(croppedFile || image) &&
               <img className='croppedThumbnail' src={(croppedFile || image)} alt='Cropped'/>
               }
            <i className="uploadBtnText fa fa-upload"></i>
              <span className="uploadBtnText">{t('uploadPhoto')}</span>
          </span>
          <input type='file' className="m--hide" ref={fileInput => this.fileInput = fileInput} name='myfile' onChange={(e) => { this._handleFileChange(e) }}/>
        </div>
        }
        <Cropper
          autoCrop={true}          
          ref={cropper => {
            this.cropper = cropper;
          }}
          cropBoxResizable={false}
          src={file}
          className='signup-cropper'
          style={{height: 170, width: 250}}
          aspectRatio={1 / 1}
          ready={() => { this._handleImageCrop(); }}
          guides={false}/>
        {file &&
        <div className="text-center m--margin-10">
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._reverseImage('vertical')
            }}>
            <i className="fa fa-arrows-v"></i>
          </a>
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._reverseImage('horizontal')
            }}>
            <i className="fa fa-arrows-h"></i>
          </a>
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._zoomIn()
            }}>
            <i className="fa fa-search-plus"></i>
          </a>
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._zoomOut()
            }}>
            <i className="fa fa-search-minus"></i>
          </a>
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._rotateImage(-5)
            }}>
            <i className="fa fa-rotate-left"></i>
          </a>
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._rotateImage(5)
            }}>
            <i className="fa fa-rotate-right"></i>
          </a>
          <br/>
          <span
            className='btn pointer m-btn m--margin-5 m-btn--pill m-btn--air btn-success'
            ref={cropButton => this.cropButton = cropButton}
            onClick={() => {
              this._handleImageCrop()
            }}
          >
            {t('crop')} <span className='la la-crop'></span>
          </span>
          {(saveButton && croppedFile) && (
          <span className='btn pointer m-btn m--margin-5 m-btn--pill m-btn--air btn-primary' onClick={() => { this._saveImages() }} >
            {t('save')} <span className='la la-save'></span>
          </span>              
          )}          
        </div>
        }
        <div className='croppedBlock'>
          {(croppedFile && !circularButton) &&
          <img className='img-thumbnail' style={{width: '150px'}} src={croppedFile} alt='Cropped'/>
          }
        </div>
      </div>
    );
  }
}

ImageCropper.propTypes = {
  onCrop: PropTypes.func.isRequired,
  setFile: PropTypes.func.isRequired,
  saveButton: PropTypes.bool,
  onSubmit: PropTypes.func
};

ImageCropper.defaultProps = {
  saveButton: false
};

export default translate('translations')(ImageCropper);
