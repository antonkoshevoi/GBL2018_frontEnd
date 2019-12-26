import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
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
        const { t } = this.props;
        
        if (!alers.size) {
            return '';
        }
        
        return (<div className="row mt-3">
            {alers.map((message, i) => {
                return <div key={i} className="col-sm-12">
                    <div className={`alert alert-warning mb-0 ${i ? 'mt-3' : ''}`} key={i}>
                        <button onClick={() => { this._markAsRead(message.get('id')) } } type="button" className="close pull-right no-padding" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="alert-heading">{t(message.get('type'))}</h4>
                        <p className='mb-0 mt-2 pre-line'>{message.get('body')}</p>
                    </div>
                </div>;
            })}
        </div>);
    }
}

export default withTranslation('translations')(connect(
  (state) => ({    
    userData: selectUserData(state),
    userRequest: selectGetUserRequest(state)
  }),
  (dispatch) => ({
        viewMessage: (id) => { dispatch(viewMessage(id)) }      
  })
)(Alerts));