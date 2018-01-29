import React, {Component} from 'react';
import background from "../../media/images/404.jpg"

class NotFoundPage extends Component {
  render() {
    return (
      <div className="row d-flex justify-content-center align-items-center" id="notFoundPage" style={{
        backgroundImage: 'url('+ background +')',
        backgroundSize: '100%',
        height: '100vh',
      }}>
        <div className="display-3 m--hide">
            <h1 style={{color:'#fff'}}>PAGE NOT FOUND</h1>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
