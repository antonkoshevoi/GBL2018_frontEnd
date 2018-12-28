import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';

class PageTitle extends PureComponent {  

    render () {
        let title = this.props.t('mainTitle');
        
        if (this.props.title) {
            title = title + ' - ' + this.props.t(this.props.title);
        }
        
        document.title = title;
        
        return this.props.children ? this.props.children : null;
    }
}

export default translate('pageTitles')(PageTitle);