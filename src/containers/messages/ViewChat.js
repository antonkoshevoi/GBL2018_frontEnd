import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Chat from "./sections/Chat";

class ViewChat extends Component {

    constructor(props) {
        super(props);
                
        this.state = {            
            chatId: this.props.match.params.id
        }        
    }
    
    render() {
        const { t } = this.props;
        
        return (
            <div className='fadeInLeft  animated'>               
                <div className='m-portlet m-portlet--head-solid-bg'>
                    <div className='m-portlet__head border-b-violet'>
                        <div className='m-portlet__head-caption'>
                            <div className='m-portlet__head-title'>
                                <span className='m-portlet__head-icon violet'><i className='fa fa-weixin'></i></span>
                                <h3 className='m-portlet__head-text'>{t('messages')}</h3>
                            </div>
                        </div>         
                    </div>
                    <div className='m-portlet__body'>
                        <Chat chatId={this.state.chatId} />
                    </div>
                </div>          
            </div>
        );
    }
}

export default translate('translations')(ViewChat);