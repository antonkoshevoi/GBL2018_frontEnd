import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

class CommentsSection extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <h2 className="m--padding-20">{t('noInfo')}</h2>
            </div>
        );
    }
}

CommentsSection.propTypes = {};

export default translate('translations')(CommentsSection);
