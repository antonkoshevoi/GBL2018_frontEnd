import React, { Component } from 'react';
import Messages from './sections/Messages';

class Alerts extends Component {
    render() {                
        return (
            <div className='fadeInLeft  animated'>               
                <Messages type='alert' icon='la la-warning' color='red' />                                                   
            </div>
        );
    }
}

export default Alerts;