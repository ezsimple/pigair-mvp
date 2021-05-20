import * as React from 'react';
import { useEffect, useState } from 'react';
import { withTranslation, useTranslation } from 'react-i18next';
import AppRoute from './route/AppRoute';
import { SessionUtil } from 'utils';
import './i18n';

// =================================================================
// Dynamic Import 처리시 공통 CSS 처리 지연으로
// UI Loading시 CSS가 입혀지지 않은 상황이 잠시 노출 됩니다.
// 그래서 각각의 Routing Component로 App.css, mApp.css를 옮겼습니다.
// =================================================================
// import MenuUtil from 'layout/MenuUtil';
// if (MenuUtil.isMobile()) import('./mApp.css');
// else import('./App.css');
// =================================================================

const App = (props) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = SessionUtil.getLang();
    if (lang) {
      switch (lang) {
        case 'en':
        case 'ko':
          i18n.changeLanguage(lang);
          break;
      }
    }
  }, [i18n]);

  return <AppRoute {...props}></AppRoute>;
};

export default withTranslation(['en', 'ko'])(App);
