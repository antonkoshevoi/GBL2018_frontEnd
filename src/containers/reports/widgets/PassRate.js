import React, {Component} from 'react';
import Card from "../../../components/ui/Card";
import {CircularProgress} from '@material-ui/core';
import {translate} from 'react-i18next';

class PassRate extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {loading, data, t} = this.props;

    return (
      <Card title={t('passRate')} icon="fa fa-file-text-o display-5" className='passRateCard'>
        <h1  className="d-flex justify-content-center align-items-center absolute-center">
          {loading ? <CircularProgress color="primary"/> : ((data.passRate || 0) + '%')}          
        </h1>
      </Card>
    );
  }
}

export default translate('translations')(PassRate);
