import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png'
// import 'cropperjs/dist/cropper.css';

import {NavLink} from "react-router-dom";
import Cropper from "react-cropper";
import {Divider} from "material-ui";


class SignUpPrincipal extends Component {


    constructor(props) {
        super(props);
        this.state = {
            src:null,
            cropResult: null,
        };
        this.cropImage = this.cropImage.bind(this);
        this.onChange = this.onChange.bind(this);
    }



    _crop(){
        // image in dataUrl
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
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
        return (

                <div className="">
                    <div className="m-grid__item animate fadeInLeftBig m-grid__item--fluid m-grid m-grid--hor  m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`,minHeight:'100vh'}}>
                        <div className="m-grid__item m-grid__item--fluid	m-login__wrapper">
                            <div className="m-login__container">
                                <div className="m-login__logo  text-center">
                                    <a href="#">
                                        <img src={logo}/>
                                    </a>
                                </div>
                                <div className="m-signup col-sm-6 m-auto">
                                    <div className="m-signup__head">
                                        <h3 className="m-login__title">Sign Up </h3>
                                    </div>
                                    <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height ">
                                        <div className="m-portlet__head">
                                            <div className="m-portlet__head-caption">
                                                <div className="m-portlet__head-title full-width">
                                                    <h3 className="m-portlet__head-text text-center full-width">
                                                        SETUP YOUR PRINCIPAL PROFILE
                                                    </h3>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="m-portlet__body">
                                            <div className="alert m-alert m-alert--default">
                                                <p className="text-center"> If you already have a account, <NavLink to="/login"><strong>Login</strong></NavLink> to start your session. Otherwise,</p>
                                            </div>

                                           <div className="row m--margin-top-40">
                                               <div className="col-md-6">
                                                   <legend>Personal Information</legend>
                                                    <div className="m-form__section m-form__section--first">
                                                        <div className="form-group m-form__group">
                                                            <div >
                                                                <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="First Name"/>
                                                            </div>
                                                            <div  className="form-control-feedback"></div>
                                                        </div>
                                                    </div>
                                                   <div className="m-form__section m-form__section--first">
                                                       <div className="form-group m-form__group">
                                                           <div >
                                                               <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="Last Name "/>
                                                           </div>
                                                           <div className="form-control-feedback"></div>
                                                       </div>
                                                   </div>
                                                   <div className="m-form__section m-form__section--first">
                                                       <div className="form-group m-form__group">
                                                           <div>
                                                               <input type="email" className="form-control m-input  m-input--air m-input--pill" placeholder="Email "/>
                                                           </div>
                                                           <div className="form-control-feedback"></div>
                                                       </div>
                                                   </div>
                                                   <div className="m-form__section m-form__section--first">
                                                       <div className="form-group m-form__group">
                                                           <div className="">
                                                               <input type="email" className="form-control m-input   m-input--air m-input--pill" placeholder="Username "/>
                                                           </div>
                                                           <div className="form-control-feedback"></div>
                                                       </div>
                                                   </div>
                                                   <div className="m-form__section m-form__section--first">
                                                       <div className="form-group m-form__group">
                                                           <div className="">
                                                               <input type="password" className="form-control m-input  m-input--air m-input--pill" placeholder="Password "/>
                                                           </div>
                                                           <div className="form-control-feedback"></div>
                                                       </div>
                                                   </div>
                                                   <div className="m-form__section m-form__section--first">
                                                       <div className="form-group m-form__group">
                                                           <div className="">
                                                               <input type="password" className="form-control m-input m-input--air m-input--pill" placeholder="Confirm Password "/>
                                                           </div>
                                                           <div className="form-control-feedback"></div>
                                                       </div>
                                                   </div>

                                               </div>
                                               <div className="col-md-6">
                                                   <legend>School Information</legend>
                                                   <div className="m-form__section m-form__section--first">
                                                       <div className="form-group m-form__group">
                                                           <div >
                                                               <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="School Name"/>
                                                           </div>
                                                           <div  className="form-control-feedback"></div>
                                                       </div>
                                                       <div className="form-group m-form__group">
                                                           <div >
                                                               <input type="text" className="form-control m-input  m-input--air m-input--pill" placeholder="School Code"/>
                                                           </div>
                                                           <div  className="form-control-feedback"></div>
                                                       </div>
                                                   </div>

                                                   <div className="CropperBlock">
                                                       {this.state.src!== null &&
                                                       <button className="btn m-btn--air btn-success"
                                                               onClick={this.cropImage} style={{float: 'right'}}>
                                                           Crop Image <span className="la la-crop"></span>
                                                       </button>
                                                       }
                                                       <div class="upload-btn-wrapper ">
                                                           <button class="btn  m-btn--air btn-outline-info">Upload a file </button>
                                                           <input type="file" name="myfile" onChange={this.onChange}/>
                                                       </div>

                                                       <Cropper
                                                           ref={cropper => { this.cropper = cropper; }}
                                                           src={this.state.src}
                                                           className="signup-cropper"
                                                           style={{height: 250, width: 250}}
                                                           aspectRatio={1 / 1}
                                                           guides={false}
                                                       />

                                                       {this.state.cropResult !== null &&
                                                           <div className="croppedBlock">
                                                               <img className="img-thumbnail" style={{ width: '150px' }} src={this.state.cropResult} alt="cropped image" />
                                                           </div>}
                                                   </div>

                                                 </div>
                                           </div>

                                            <Divider className="m--margin-top-25"/>

                                            <div className="row">
                                                <div className="col-sm-12 text-right m--padding-top-20">
                                                    <button className="m-btn m-btn--air btn btn-success"> NEXT </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("SignUpPrincipal")
(connect(
    mapStateToProps,
)(SignUpPrincipal));

