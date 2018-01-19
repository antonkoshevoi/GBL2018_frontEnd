import React, {Component} from 'react';
import * as AUTH from '../../../../services/AuthService'
import WD from  '../../../../data/Widgets';

class InfoSection extends Component {

    _renderRosterStats(stats) {
        return stats.map(function (item,i) {
            return (
                <div class="m-widget1__item">
                    <div class="row m-row--no-padding align-items-center">
                        <div class="col">
                            <h3 class="m-widget1__title">{item.title}</h3>
                        </div>
                        <div class="col m--align-right">
                            <span class="m-widget1__number m--font-brand">{item.value}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (

                    <div className="m-widget1 m-widget1--paddingless">
                        <div class="m-widget1 m-widget1--paddingless">
                             {this._renderRosterStats(WD.rosterStats)}
                        </div>
                    </div>

        );
    }
}

InfoSection.propTypes = {};

export default InfoSection;
