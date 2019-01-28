import React, { Component } from 'react';
import Messages from './sections/Messages';

class Announcements extends Component {
    render() {        
        return (
            <div className='fadeInLeft  animated'>      
                <Messages type='announcement' icon='la la-bullhorn' color='blue' />
            </div>
        );
    }
}

export default Announcements;