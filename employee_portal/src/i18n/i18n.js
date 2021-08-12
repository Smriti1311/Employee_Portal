import i18n from 'i18next';
import LanguaueDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import {initReactI18next} from 'react-i18next';

i18n
.use(Backend)
.use(LanguaueDetector)
.use(initReactI18next)
.init({
    lng : 'en',
    debug : false,
    fallbackLng : 'en',
    bindstore : false,
    react : {
        wait : false,
        withRef : false,
        bindstore : false,
        useSuspense : false
    },
},
    (err, t) => {
        if(err) {
            console.log(err)
        }
    }
)

export default i18n;