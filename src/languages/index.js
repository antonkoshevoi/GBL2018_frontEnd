import LocalizedStrings from 'react-localization';
import english from './english'
import german from './german'

let translate = new LocalizedStrings({

    en:{
        ...english
    },
    de: {
        ...german
    }
});


export const changeLanguage =  function (lang_code) {
    console.log(lang_code);
    translate.setLanguage(lang_code);
    console.log(translate);
}

export default translate;