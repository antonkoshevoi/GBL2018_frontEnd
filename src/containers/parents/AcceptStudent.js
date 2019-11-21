import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from 'react-router-redux';
import { selectStudentStatusRequest } from "../../redux/student-parents/selectors";
import { acceptStudentRequestPublic, acceptStudentRequest, resetStudentRequest } from "../../redux/student-parents/actions"; 
import { load } from '../../redux/app/actions';
import {Loader} from '../../components/ui/Loader';

class AcceptStudent extends Component {

    componentDidMount () {
        const { acceptStudentRequest, acceptStudentRequestPublic, match, auth } = this.props;
        const id = match.params.id;
        const hash = match.params.hash;
        
        if (auth.get('isLoggedIn')) {
            acceptStudentRequest(id);
        } else {
            acceptStudentRequestPublic(id, hash);            
        }
    }    
  
    componentDidUpdate(prevProps) {        
        const {studentStatusRequest, resetStudentRequest, appLoad, goTo, auth} = this.props;                
                
        if ((studentStatusRequest.get('success') && !prevProps.studentStatusRequest.get('success')) 
                || (studentStatusRequest.get('fail') && !prevProps.studentStatusRequest.get('fail'))) {
            
            resetStudentRequest();
            
            if (auth.get('isLoggedIn')) {
                goTo('/dashboard');
            } else {
                appLoad();
                goTo('/login');
            }
        }     
    }
   
    render() {
        return <Loader />;
    }
}

AcceptStudent = connect(
    (state) => ({
        studentStatusRequest: selectStudentStatusRequest(state),
        auth: state.auth
    }),
    (dispatch) => ({        
        goTo: (url) => { dispatch(push(url)) },
        acceptStudentRequest: (id) => {dispatch(acceptStudentRequest(id))},
        acceptStudentRequestPublic: (id, hash) => {dispatch(acceptStudentRequestPublic(id, hash))},
        resetStudentRequest: () => {dispatch(resetStudentRequest())},
        appLoad: () => { dispatch(load()) }
    })
)(AcceptStudent);

export default withRouter(AcceptStudent);   