import React, {Component} from 'react';
import { randColorName } from "../../../helpers/colors";
import { withTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

class Summery extends Component {

  _renderData(name) {    
    const { t } = this.props;
    const { [name]: data } = this.props.user;
    
    if (!data || !data.length) {
      return <div className="m-timeline-2 my-timeline">
        <div className="m-timeline-2__items py-2">
          <div className="m-timeline-2__item mb-3">
            <div className="m-timeline-2__item-cricle pr-2">
              <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
            </div>
            <div className="m-timeline-2__item-text pl-4 py-1">              
              {t(name + 'NotFound')}
            </div>
          </div>
        </div>
      </div>
    }
    return (
      data.map((item, key) => {
        return <div className="m-timeline-2 my-timeline" key={key}>
          <div className="m-timeline-2__items py-2">
            <div className="m-timeline-2__item mb-3">
              <div className="m-timeline-2__item-cricle pr-2">
                <i className={`fa fa-genderless m--font-${randColorName()}`}></i>
              </div>
              <div className="m-timeline-2__item-text pl-4 py-1">
                {item.name}
              </div>
            </div>
          </div>
        </div>
      })
    )
  }

  render() {
    const { t } = this.props;
    
    return (
      <div className="m-portlet m-portlet--head-solid-bg m-portlet--brand">
        <div className="m-portlet__head">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
              <span className="m-portlet__head-icon">
                    <i className='fa fa-id-card-o'></i>
              </span>
              <h3 className="m-portlet__head-text">
                {t('summery')}
              </h3>
            </div>
          </div>
        </div>
        <div className="m-portlet__body">         
          <Typography variant="h6" color="inherit" >{t('homerooms')}</Typography>
          {this._renderData('homerooms')}
          <Typography variant="h6" color="inherit" >{t('classrooms')}</Typography>
          {this._renderData('classrooms')}
        </div>
      </div>
    );
  }
}

export default withTranslation('translations')(Summery);
