import React, {Component} from 'react';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="row" style={{
        backgroundImage: 'url(http://keenthemes.com/metronic/preview/assets/app/media/img//error/bg2.jpg)',
        backgroundSize: '100%',
        height: '100vh',
      }}>
        <div className="col-md-12">
          404
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
