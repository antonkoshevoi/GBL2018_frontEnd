import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'cropperjs/dist/cropper.css';
import Cropper from "react-cropper";

class ImageCropper extends Component {

  state = {
    file: '',
    croppedFile: ''
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

    reader.onload = () => {
      this.setState({
        file: reader.result
      });
    };

    reader.readAsDataURL(files[0]);
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
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    const {saveButton} = this.props;

    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    if (!saveButton){
      this.props.onCrop(this.cropper.getCroppedCanvas().toDataURL());
      this.props.setFile(this.state.file);
    }

    this.setState({
      croppedFile: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  _rotateImage(angle = 0) {
    this.cropper.rotate(++angle)
  }


  _zoomIn() {
    this.cropper.zoom(0.1)
  }

  _zoomOut() {
    this.cropper.zoom(-0.1)
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
  }


  _handleImageCrop() {
    const {saveButton} = this.props;
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.setState({
      croppedFile: this.cropper.getCroppedCanvas().toDataURL()
    });

    if (!saveButton){
      this.props.onCrop(this.cropper.getCroppedCanvas().toDataURL());
      this.props.setFile(this.state.file);
    }
  }

  _saveImages(){
    this.props.onSubmit(this.state.croppedFile,this.state.file)
    this.props.onCrop(this.state.croppedFile);
    this.props.setFile(this.state.file);
  }

  render() {

    const {croppedFile, file} = this.state;
    const {saveButton} = this.props;

    return (
      <div className="CropperBlock">
        <div className='upload-btn-wrapper '>
          <a className='btn m-btn--air btn-outline-info'>Upload a file</a>
          <input type='file' name='myfile' onChange={(e) => {
            this._handleFileChange(e)
          }}/>
        </div>

        <Cropper
          ref={cropper => {
            this.cropper = cropper;
          }}
          src={file}
          className='signup-cropper'
          style={{height: 250, width: 250}}
          aspectRatio={1 / 1}

          guides={false}/>
        {file &&
        <div className="text-center m--margin-10">
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._reverseImage('vertical')
            }}>
            <i className="fa 	fa-arrows-v"></i>
          </a>
          <a
            className="btn btn-outline-info m--margin-5 m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill m-btn--air"
            onMouseDown={() => {
              this._reverseImage('horizontal')
            }}>
            <i className="fa 	fa-arrows-h"></i>
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
          <a
            type='button'
            className='btn m-btn m--margin-5 m-btn--pill m-btn--air btn-success'
            onClick={() => {
              this._handleImageCrop()
            }}
          >
            Crop <span className='la la-crop'></span>
          </a>
        </div>
        }
        <div className='croppedBlock'>
          {croppedFile &&
          <img className='img-thumbnail' style={{width: '150px'}} src={croppedFile} alt='cropped image'/>
          }

          {(saveButton && croppedFile) && (
            <div className="textCenter m--margin-20">
                <a className="btn m-btn btn-info m-btn--air" onClick={()=>{this._saveImages()}}>Save</a>
            </div>
          )}
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

export default ImageCropper;
