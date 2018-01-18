import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import 'cropperjs/dist/cropper.css';
import Cropper from "react-cropper";


class FirstStepForm extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      form: {}
    };
    this.cropImage = this.cropImage.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  render() {
    const { form, errors } = this.props;

    return (
      <div className="row m--margin-top-40">
        <div className="col-md-6">
          <div className="col-xs-12">
            <legend className="m--margin-bottom-10">Required</legend>
            <div className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div>
                  <input
                    // value={form.firstName}
                    onChange={(e) => { this._handleInputChange(e) }}
                    type="text"
                    className="form-control m-input m-input--air m-input--pill"
                    placeholder="First Name *"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </div>
            <div className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Last Name *"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </div>
            <div className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div>
                  <input type="email" className="form-control m-input  m-input--air m-input--pill" placeholder="Email *"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </div>
            <div className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div className="">
                  <input type="email" className="form-control m-input   m-input--air m-input--pill" placeholder="Username *"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </div>
            <div className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div className="">
                  <input type="password" className="form-control m-input  m-input--air m-input--pill" placeholder="Password *"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </div>
            <div className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div className="">
                  <input type="password" className="form-control m-input m-input--air m-input--pill" placeholder="Confirm Password *"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="col-xs-12">
            <legend className="m--margin-bottom-10">Optional</legend>
            <address className="m-form__section m-form__section--first">
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Address Line 1"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Address Line 2"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="City"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Region"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Country"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
              <div className="form-group m-form__group">
                <div >
                  <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Telephone"/>
                </div>
                <div className="form-control-feedback"></div>
              </div>
            </address>
          </div>
        </div>

        <div className="m-separator m-separator--dashed m-separator--lg"></div>

          <div className="col-sm-12">
            <div className="row">
              <legend className="m--margin-bottom-10"> Profile Pic Upload</legend>

              <div className="col-md-6">
                <div className="CropperBlock">
                  {this.state.src!== null &&
                  <button className="btn m-btn--air btn-success"
                      onClick={this.cropImage} style={{float: 'right'}}>
                    Crop Image <span className="la la-crop"></span>
                  </button>
                  }
                  <div className="upload-btn-wrapper ">
                    <button className="btn  m-btn--air btn-outline-info">Upload a file </button>
                    <input type="file" name="myfile" onChange={this.onFileChange}/>
                  </div>

                  <Cropper
                    ref={cropper => { this.cropper = cropper; }}
                    src={this.state.src}
                    className="signup-cropper"
                    style={{height: 250, width: 250}}
                    aspectRatio={1 / 1}
                    guides={false}
                  />
                </div>
              </div>

              <div className="col-md-6">

                {this.state.cropResult !== null &&
                  <div className="croppedBlock">
                    <img className="img-thumbnail" style={{ width: '150px' }} src={this.state.cropResult} alt="cropped image" />
                  </div>
                }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default translate("FirstStepForm")(FirstStepForm);
