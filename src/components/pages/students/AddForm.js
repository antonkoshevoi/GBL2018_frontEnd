import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, FormControl, FormHelperText, Input, InputLabel, MenuItem, TextField} from "material-ui";
import MaskText from "../../ui/MaskText";

import * as STUDENT   from '../../../services/Students';

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            group:'student',
            userName:'',
            password:'',
            email:'',
            firstName:'',
            lastName:'',
            gender:'male',
            phone:'',
            school:1,
            homeroom:1,
        }
    }


    _selectGender(event) {
        this.setState({gender:event.target.value})
    }

    _changeInputsValue(event,key){
        this.setState({
            [key]:event.target.value
        })
    }


    _addNewStudent() {
        console.log(this.state);
        STUDENT.save(this.state).then(function (res) {
            console.log(res);
        });
    }


    render() {


        return (
            <div className="row">
                <div className="col-sm-8 m-auto">
                    <FormControl   aria-describedby="name-error-text" className="full-width form-inputs">
                        <InputLabel htmlFor="name-error">Fullname</InputLabel>
                        <Input
                            autoFocus
                            margin="dense"
                            fullWidth
                            value={this.state.userName}
                            onChange={(e) => {this._changeInputsValue(e,'userName')}} />
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>
                    <FormControl   aria-describedby="name-error-text"  className="full-width form-inputs">
                        <InputLabel htmlFor="name-error">Password</InputLabel>
                        <Input
                            fullWidth
                            type="password"
                            margin="dense"
                            value={this.state.password}
                            onChange={(e) => {this._changeInputsValue(e,'password')}} />
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>
                    <FormControl   aria-describedby="name-error-text"  className="full-width form-inputs">
                        <InputLabel htmlFor="name-error">Email</InputLabel>
                        <Input
                            fullWidth
                            type="email"
                            margin="dense"
                            value={this.state.email}
                            onChange={(e) => {this._changeInputsValue(e,'email')}} />
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>
                    <FormControl   aria-describedby="name-error-text"  className="full-width form-inputs">
                        <InputLabel htmlFor="name-error">First Name</InputLabel>
                        <Input
                            fullWidth
                            type="text"
                            margin="dense"
                            value={this.state.firstName}
                            onChange={(e) => {this._changeInputsValue(e,'firstName')}} />
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>
                    <FormControl   aria-describedby="name-error-text"  className="full-width form-inputs">
                        <InputLabel htmlFor="name-error">Last Name</InputLabel>
                        <Input
                            fullWidth
                            type="text"
                            margin="dense"
                            value={this.state.lastName}
                            onChange={(e) => {this._changeInputsValue(e,'lastName')}} />
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>


                    <FormControl className="full-width form-inputs">
                        <TextField
                            id="select-currency"
                            select
                            label="Select gender"

                            value={this.state.gender}
                            onChange={(e) => {this._changeInputsValue(e,'gender')}}
                            margin="normal"
                        >
                            <MenuItem  value="male">
                                Male
                            </MenuItem>
                            <MenuItem  value="female">
                                Female
                            </MenuItem>

                        </TextField>
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>

                    <FormControl   aria-describedby="name-error-text"  className="full-width form-inputs">
                        <InputLabel htmlFor="name-error">Phone </InputLabel>
                        <Input
                            fullWidth
                            type="number"
                            margin="dense"
                            value={this.state.phone}
                            onChange={(e) => {this._changeInputsValue(e,'phone')}} />
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>

                    <FormControl className="full-width form-inputs">
                        <TextField
                            id="select-currency"
                            select
                            label="Select school"

                            value={this.state.school}
                            onChange={(e) => {this._changeInputsValue(e,'school')}}
                            margin="normal"
                        >
                            <MenuItem  value="male">
                                Male
                            </MenuItem>
                            <MenuItem  value="female">
                                Female
                            </MenuItem>

                        </TextField>
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>

                    <FormControl className="full-width form-inputs">
                        <TextField
                            id="select-currency"
                            select
                            label="Select homeroom"

                            value={this.state.homeroom}
                            onChange={(e) => {this._changeInputsValue(e,'homeroom')}}
                            margin="normal"
                        >
                            <MenuItem  value="male">
                                Male
                            </MenuItem>
                            <MenuItem  value="female">
                                Female
                            </MenuItem>

                        </TextField>
                        { false && <FormHelperText id="name-error-text">Error</FormHelperText>}
                    </FormControl>
                </div>
                <div className="col-sm-12">
                    <Divider/>
                    <Button raised className="mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn" color="primary" onClick={() => { this._addNewStudent()}} >
                        Add New User
                    </Button>
                </div>
            </div>

        );
    }
}

AddForm.propTypes = {};

export default AddForm;
