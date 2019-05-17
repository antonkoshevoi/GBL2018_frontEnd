import { withTranslation } from 'react-i18next';
    
const PageTitle = props => {    

    let title = props.t('mainTitle');
        
    if (props.title) {
        title = title + ' - ' + props.t(props.title);
    }
        
    document.title = title;
        
    return props.children ? props.children : null;
}

export default withTranslation('pageTitles')(PageTitle);