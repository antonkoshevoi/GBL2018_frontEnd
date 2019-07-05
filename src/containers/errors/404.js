import React, {Component} from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="row d-flex justify-content-center align-items-center" id="notFoundPage" style={{ height: '85vh' }}>
                <div className="display-3">
                    <h1 className="display-1 m-0" style={{ lineHeight: 0.8 }}>404.</h1>
                    <h2 className="g-metal pr-2 m-0 text-right">error</h2>
                </div>
            </div>
        );
    }
}

export default NotFoundPage;
