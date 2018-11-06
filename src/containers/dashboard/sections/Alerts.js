import React, {Component} from 'react';
import {translate} from "react-i18next";
import {connect} from 'react-redux';
import {selectGetUserRequest, selectUserData} from "../../../redux/user/selectors";
import {viewMessage} from "../../../redux/messages/actions";

class Alerts extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            alers: {}
        };
    }
          
    componentDidMount() {
        const {userData} = this.props;
        
        if (userData.get('alerts')) {
            this.setState({
                alers: userData.get('alerts')
            });
        }        
    }
    
    _markAsRead(id) {
        this.props.viewMessage(id);
        
        let { alers } = this.state;
                
        this.setState({
            alers: alers.delete(
                alers.findIndex(x => x.get('id') === id)
            )
        });
    }
    
    render() {
        const { alers } = this.state;
        
        if (!alers.size) {
            return '';
        }
        
        return (<div className="row m--margin-top-10">
            {alers.map((message, i) => {
                return <div className="col-sm-12">
                    <div className={`alert alert-warning m--margin-bottom-0 ${i ? 'm--margin-top-15' : ''}`} key={i}>
                        <button onClick={() => { this._markAsRead(message.get('id')) } } type="button" className="close pull-right no-padding" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="alert-heading">{message.get('subject')}</h4>
                        <p>{message.get('body')}</p>
                    </div>
                </div>;
            })}
        </div>);
    }
}

Alerts = connect(
  (state) => ({    
    userData: selectUserData(state),
    userRequest: selectGetUserRequest(state)
  }),
  (dispatch) => ({
        viewMessage: (id) => { dispatch(viewMessage(id)) }      
  })
)(Alerts);

export default translate('translations')(Alerts);