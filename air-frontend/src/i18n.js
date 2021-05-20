import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

import { Server } from 'components/Properties';
import { SessionUtil } from 'utils';

const backendOptions = {
  allowMultiLoading: true,
  crossDomain: true,
  withCredentials: true,
  loadPath: Server.getRemoteHost() + '/static/locale/{{lng}}.json',
};

i18n
  .use(XHR)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: false,
    react: {
      useSuspense: false,
    },
    // resources,
    backend: backendOptions,
    lng: SessionUtil.getLang(),
    fallbackLng: 'ko',
    preload: ['ko', 'en'],
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
