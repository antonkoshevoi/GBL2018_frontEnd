import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import english from '../languages/english/index';
import chineseSimplified from '../languages/chineseSimplified/index';
import chineseTraditional from '../languages/chineseTraditional/index';
import korean from '../languages/korean/index';
import spanish from '../languages/spanish/index';
import french from '../languages/french/index';

i18n
  .use(reactI18nextModule) // if not using I18nextProvider
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    resources: {
        en: {
          ...english
        },
        ch_1: {
            ...chineseSimplified
        },
        ch_2: {
           ...chineseTraditional
        },
        kr: {
           ...korean
        },
        sp: {
            ...spanish
        },
        fr: {
            ...french
        }
    },
    // react i18next special options (optional)
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

export default i18n;