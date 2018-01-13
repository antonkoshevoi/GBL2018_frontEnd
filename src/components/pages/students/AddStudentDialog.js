import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Icon, IconButton, Slide,
    TextField, Toolbar, Typography
} from "material-ui";
import AddForm from "./AddForm";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class AddStudentDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen:false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({isOpen:nextProps.dialogIsOpen});
    }

    handleClose = () => {
        this.setState({isOpen:false});
    };

    render() {
        return (
            <Dialog
                open={ this.state.isOpen}
                onClose={this.props.handlerClose}
                transition={Transition}
                aria-labelledby="form-dialog-title"
            >
                <AppBar position="static" color="primary" className="dialogAppBar">
                    <Toolbar>
                        <IconButton color="contrast"  aria-label="Close">
                            <Icon>person</Icon>
                        </IconButton>
                        <Typography type="title" color="inherit" >
                            Create user
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent className="m--margin-top-25">
                    <DialogContentText>
                    </DialogContentText>
                    <AddForm/>
                </DialogContent>

            </Dialog>
        );
    }
}

AddStudentDialog.propTypes = {
    dialogIsOpen:PropTypes.bool.isRequired,
    handlerClose:PropTypes.func.isRequired
};

export default AddStudentDialog;
