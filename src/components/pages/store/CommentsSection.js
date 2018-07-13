import React, {Component} from 'react';
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

export default translate('translations')(CommentsSection);
