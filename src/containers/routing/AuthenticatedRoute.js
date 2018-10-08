import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectIsLoggedIn, SelectRestoreLoginFail} from '../../redux/auth/selectors';
import { Redirect, withRouter } from 'react-router-dom';
import Route from './Route';
import HasRole from "../middlewares/HasRole";
import NotFoundPage from "../errors/404";

class AuthenticatedRoute extends Component {

    redirect() {
        const {restoreLoginFail, location} = this.props;
        const redirectTo = {
            pathname:   (restoreLoginFail ? '/restore-login' : '/login'),
            state:      {from: location}
        };
        return <Redirect to={redirectTo}/>;
    }

    render() {
        const {isLoggedIn, auth, roles, component, exact, path, name, layout} = this.props;       

        if (!isLoggedIn) {
            return this.redirect();
        }

        if (roles) {
            return <HasRole roles={roles} onFail={( <Route layout={layout} component={NotFoundPage} /> )} >
                <Route layout={layout} path={path} exact={exact} component={component} name={name} />
            </HasRole>;
        }

        return <Route layout={layout} path={path} exact={exact} component={component} name={name} />;
    }
}

AuthenticatedRoute = connect(
    (state) => ({
        isLoggedIn: selectIsLoggedIn(state),
        restoreLoginFail: SelectRestoreLoginFail(state)
    })
)(AuthenticatedRoute);

export default withRouter(AuthenticatedRoute);