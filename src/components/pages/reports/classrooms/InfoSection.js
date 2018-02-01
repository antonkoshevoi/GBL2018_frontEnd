import React, {Component} from 'react';
import * as AUTH from '../../../../services/AuthService'
import WD from  '../../../../data/Widgets';

class InfoSection extends Component {

  _renderRosterStats(stats) {
    return stats.map(function (item, i) {
      return (
        <div key={i} className="m-widget1__item">
          <div className="row m-row--no-padding align-items-center">
            <div className="col">
              <h3 className="m-widget1__title">{item.title}</h3>
            </div>
            <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                    {item.value}
                  </span>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (


      <div className="m-widget1 m-widget1--paddingless">
        <div className="m-widget1 m-widget1--paddingless">
          <div className="m-widget1 m-widget1--paddingless">
            {this._renderRosterStats(WD.rosterStats)}
          </div>
        </div>
      </div>

    );
  }
}

InfoSection.propTypes = {};

export default InfoSection;
