import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { push } from 'react-router-redux';
import { selectChangeStatusRequest } from "../../redux/connections/selectors";
import { accept, acceptPublic, resetChangeStatusRequest } from "../../redux/connections/actions"; 
import { load } from '../../redux/app/actions';
import {Loader} from '../../components/ui/Loader';

class AcceptConnection extends Component {

    componentDidMount () {
        const { accept, acceptPublic, match, auth } = this.props;
        const id = match.params.id;
        const hash = match.params.hash;
        
        if (auth.get('isLoggedIn')) {
            accept(id);
        } else {
            acceptPublic(id, hash);            
        }
    }    
  
    componentDidUpdate(prevProps) {        
        const {changeStatusRequest, resetChangeStatusRequest, appLoad, goTo, auth} = this.props;                
                
        if ((changeStatusRequest.get('success') && !prevProps.changeStatusRequest.get('success')) 
                || (changeStatusRequest.get('fail') && !prevProps.changeStatusRequest.get('fail'))) {
            
            resetChangeStatusRequest();
            
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

export default withRouter(connect(
    (state) => ({
        changeStatusRequest: selectChangeStatusRequest(state),
        auth: state.auth
    }),
    (dispatch) => ({        
        goTo: (url) => { dispatch(push(url)) },
        accept: (id) => {dispatch(accept(id))},
        acceptPublic: (id, hash) => {dispatch(acceptPublic(id, hash))},
        resetChangeStatusRequest: () => {dispatch(resetChangeStatusRequest())},
        appLoad: () => { dispatch(load()) }
    })
)(AcceptConnection));   