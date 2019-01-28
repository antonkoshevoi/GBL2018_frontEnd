import React, { Component } from 'react';
import Messages from './sections/Messages';

class Assignments extends Component {
    render() {        
        return (
            <div className='fadeInLeft  animated'>
                <Messages type='assignment' icon='la la-pencil' color='green' />      
            </div>
        );
    }
}

export default Assignments;