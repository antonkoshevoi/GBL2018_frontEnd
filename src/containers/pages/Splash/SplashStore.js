import React, {Component} from 'react';
import spacer from '../../../media/images/svg/bl-spacer.svg';


class SplashStore extends Component {
  render() {
    const {t} = this.props;
    return (
      <div className="splash-store">
        <div className="container">
          <div className="row clearfix">
            <header className="header-break container text-center">
              <h2>{t('store')}</h2>
              <img src={spacer} alt="---=== ===---" width="200"/>
            </header>


          </div>
        </div>

      </div>
    )
  }
}

export default SplashStore


