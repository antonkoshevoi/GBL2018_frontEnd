import React, {Component} from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="row d-flex justify-content-center align-items-center" id="notFoundPage" style={{ height: '85vh' }}>
                <div className="display-3">
                    <h1 className="display-1 m--padding-right-100 margin-0" style={{ lineHeight: 0.8 }}>404.</h1>
                    <h2 className="g-metal m--padding-left-90 margin-0 text-left">error</h2>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;
