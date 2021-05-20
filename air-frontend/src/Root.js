import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Error: Invariant failed: You should not use <Redirect> outside a <Router>
// import { Redirect } from 'react-router-dom';

import App from './App';

import { Provider as MobxProvider } from 'mobx-react'; // mobx에서 사용하는 Provider로써
import * as stores from './stores'; // ./store 폴더내의 모든 인스턴스를 import 해서 Provider에 props 로 넘겨준다

import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import axios from 'axios';
import loading from 'images/pig_loading.gif';

import { SessionUtil } from 'utils';
import { Const, Server } from 'components/Properties';

// Antd Locale 설정
import { ConfigProvider } from 'antd';
import ko_KR from 'antd/es/locale-provider/ko_KR';
import en_US from 'antd/es/locale-provider/en_US';
import vi_VN from 'antd/es/locale-provider/vi_VN';

import { message, Button } from 'antd';
import './Root.css';

import i18n from 'i18next';

const Root = () => {
  const [show, setShow] = useState(true);
  message.config({
    top: 10,
    duration: 2,
    maxCount: 3,
  });
  // Antd의 경우 Locale 설정이 별도 필요합니다.
  const fnAntdLocale = () => {
    const lang = SessionUtil.getLang();
    let loc = ko_KR;
    if (lang == 'en') loc = en_US;
    if (lang == 'vi') loc = vi_VN;
    return loc;
  };

  // ----------------------------------------------
  // 50/44/52 오류는 개발시 발생하는 오류입니다.
  // ----------------------------------------------
  const fnDevError = (error) => {
    console.error(error);
    return (
      error.indexOf('50') > -1 ||
      error.indexOf('44') > -1 ||
      error.indexOf('52') > -1
    );
  };

  const fnNotify = (error) => {
    console.log('Axios : ' + error);
    // axios 통신 도중, 페이지 이동(메뉴이동)시에도 오류가 발생하므로,
    // 노티 팝업을 할 수 없습니다. 오류를 판단하기 힘든 상황입니다.
    // if (fnDevError(error)) {
    message.error(i18n.t('Error Occured') + ' : ' + error);
    // }
  };

  const gotoLogout = (isMobile) => {
    // const location = {
    //   pathname:
    //     isMobile === 'Y'
    //       ? Const.AUTO_MOBILE_LOGOUT_PAGE
    //       : Const.AUTO_LOGOUT_PAGE,
    // };
    // 1. Root컴포넌트에서는 props.histoty 를 사용할 수 없습니다.
    // 2. isMobile은 세션만료전의 값을 가지고 와야 합니다.
    // props.history.push(location);
    const location =
      isMobile === 'Y' ? Const.AUTO_MOBILE_LOGOUT_PAGE : Const.AUTO_LOGOUT_PAGE;
    const pathname = window.location.pathname;
    if (pathname !== location) window.location.replace(location);
    // console.log('call gotoLogout()', isMobile, location);
  };

  const onCloseExpire = (errorCode) => {
    setShow(false);

    // 이미 백엔드 서버측에서는 session.invalidate()되었습니다.
    let isMobile = SessionUtil.isMobile();
    switch (errorCode) {
      case '401':
        SessionUtil.setExpire();
        gotoLogout(isMobile);
        break;
    }
  };

  const showError = (error) => {
    // isMobile의 값은 세션만료(expire)전에 저장되어야 한다.
    console.log('showError::error:', error);
    const isMobile = SessionUtil.isMobile();
    let title = '',
      text = '',
      errorCode = String(error.response.status);
    console.log('errorCode:', errorCode);
    switch (errorCode) {
      case '401':
        SessionUtil.setExpire();
        title = i18n.t('Session Expired');
        text = i18n.t('Your session has expired');
        break;
      case '500':
        title = i18n.t('Internal Server Error');
        text = i18n.t('Internal Server Error Occured');
        return;
      default:
        title = i18n.t('Server no reponse');
        text = i18n.t('Please reconnect in a moment');
    }
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      onAfterClose: onCloseExpire(errorCode),
      // type: 'warning', // SweetAlert2: Unknown parameter "type"
      // show: show, // SweetAlert2: Unknown parameter "show"
    }).then(() => {
      if (!SessionUtil.isLogined()) gotoLogout(isMobile);
    });
  };

  // console.log(SessionUtil.isLogined());
  // if (!SessionUtil.isLogined()) gotoLogout();

  // ---------------------------------------------
  // axios를 통한 Fetch시에만, Loading 을 표시한다
  // ---------------------------------------------
  useEffect(() => {
    const spinner = 'loading-indicator';
    const that = this;

    // 호출 시점이 늦습니다. 이부분을 index.tsx로 이동합니다.
    // (중요) 백엔드 세션정보를 처리하기 위해서 사용합니다.
    // (sessionId를 고정시켜줍니다.)
    // axios.defaults.withCredentials = true;
    // axios.defaults.credentials = 'same-origin';

    // (중요) 백엔드 세션정보를 처리하기 위해서 사용합니다.
    // (sessionId를 고정시켜줍니다.)
    // 리액트 시동시 로그인전에 미리 셋팅이 되어야 하므로,
    // ==> 로그인 전에는 credential 이 의미 없음.
    // withCredentials 를 셋팅합니다.
    // axios.defaults.withCredentials = true;
    // axios.defaults.credentials = 'same-origin';
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // axios.defaults.headers.get['Content-Type'] = 'application/json';

    axios.interceptors.request.use(
      async (config) => {
        document.body.classList.add(spinner);
        // BM서비스 로직이 동작을 하지 않습니다.
        // document.body.appendChild(pigLoading);
        return config;
      },
      (error) => {
        document.body.classList.remove(spinner);
        // console.log(error);
        showError(error);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      async (response) => {
        document.body.classList.remove(spinner);
        // BM서비스 로직이 동작을 하지 않습니다.
        // document.body.removeChild(pigLoading);
        return response;
      },
      (error) => {
        document.body.classList.remove(spinner);
        // console.log('error.response:', error);
        showError(error);
        return Promise.reject(error);
      }
    );
  });

  const alertOptions = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_RIGHT,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE,
    containerStyle: {
      zIndex: 1001,
    },
  };

  return (
    // Antd Locale을 최상단에 설정
    <ConfigProvider locale={fnAntdLocale()}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <MobxProvider {...stores}>
          <App />
        </MobxProvider>
      </AlertProvider>
    </ConfigProvider>
  );
};

export default Root;
