import { SessionUtil, DateUtil } from 'utils';

export const Env = process.env.REACT_APP_ENV || 'dev';

// Local 개발 확인
const isLocal = () => {
  const { hostname } = window.location;
  switch (hostname) {
    case 'localhost':
    case '127.0.0.1':
      return true;
  }
  return false;
};

// TestBed 확인
const isTB = () => {
  const { hostname } = window.location;
  switch (hostname) {
    case 'egg.pigplanxe.co.kr':
      return true;
  }
  return false;
};

export const Const = {
  BREED_LOGINED_PAGE: '/breeding/dashboard',
  HATCHERY_LOGINED_PAGE: '/hatchery/dashboard',
  BROILER_LOGINED_PAGE: '/broiler/dashboard',
  COMMON_LOGINED_PAGE: '/common/standard/score',
  AUTO_LOGINED_PAGE: '/breeding/dashboard',
  AUTO_LOGOUT_PAGE: '/', // 로그인 화면
  FORCE_LOGOUT_PAGE: '/logout', // 강제 로그아웃 경로
  AUTO_MOBILE_LOGOUT_PAGE: '/mobile/login', // 모바일 로그인 화면
  REPORT_BREED_FIRST_PAGE: '/breeding/report/grwDailyR',
  REPORT_HATCHERY_FIRST_PAGE: '/hatchery/report/hatEpDailyHhR',
  REPORT_BROILER_FIRST_PAGE: '/broiler/report/dailyProjectR',
  EGG_USER_AGENT: 'eggplan',

  MENU_BREED: 'breeding',
  MENU_HATCHERY: 'hatchery',
  MENU_BROILER: 'broiler',
  MENU_COMMON: 'common',

  // groupId
  BREED: 'BREED',
  HATCHERY: 'HATCHERY',
  BROILER: 'BROILER',
  CONSULT: 'CONSULT',
  DEVEL: 'DEVEL',
  ADMIN: 'ADMIN',

  // userLevel
  COUNTRY: '1',
  DIVISION: '2',
  REGION: '3',
  SUB_REGION: '4',
  PPL: '5',
  FARM: '6',

  RESTFUL_API_PATH: '/egg/api',
  // ADD by D.JUNG for the stat restful api base path 2020-05-24
  RESTFUL_EGGPLAN_STAT_API_PATH: '/eggplan/search',

  LOCAL_HTTP_ADDR: process.env.REACT_APP_LOCAL_ADDR,
  LOCAL_HTTP_PORT: process.env.REACT_APP_LOCAL_HTTP_PORT,
  LOCAL_HTTPS_PORT: process.env.REACT_APP_LOCAL_HTTPS_PORT,

  REMOTE_BACKEND_ADDR: process.env.REACT_APP_REMOTE_BACKEND_ADDR,
  REMOTE_BACKEND_HTTP_PORT: process.env.REACT_APP_REMOTE_BACKEND_HTTP_PORT,
  REMOTE_BACKEND_HTTPS_PORT: process.env.REACT_APP_REMOTE_BACKEND_HTTPS_PORT,

  DEV_STAT_ADDR: process.env.REACT_APP_DEV_STAT_ADDR,
  DEV_STAT_HTTP_PORT: process.env.REACT_APP_DEV_STAT_HTTP_PORT,
  DEV_STAT_HTTPS_PORT: process.env.REACT_APP_DEV_STAT_HTTPS_PORT,

  PUB_STAT_ADDR: process.env.REACT_APP_PUB_STAT_ADDR,
  PUB_STAT_HTTP_PORT: process.env.REACT_APP_PUB_STAT_HTTP_PORT,
  PUB_STAT_HTTPS_PORT: process.env.REACT_APP_PUB_STAT_HTTPS_PORT,

  CANCEL_REQUEST_MESSAGE: 'cancel request',

  MOBILE_LOGINED_PAGE: '/mobile/broiler/home',
  MOBILE_LOGIN_PAGE: '/mobile/login',
  MOBILE_LOGOUT_PAGE: '/mobile/login',

  APP_DOWNLOAD_KEY: 'dGYsNGzV4MNHxuSR', // 백엔드 서버와 같지 않으면 다운로드 되지 않습니다.

  AGGR_COLOR: '#D1F6FD', // AgGrid - 집계 셀(행) 색상정의

  TEST_MODE: true, // 검증 및 인수를 위한 테스트 모드

  // =================================================================
  // 리포트 테스트용
  // =================================================================
  RPT_TEST: isLocal() || isTB() ? true : false, // 2020.07.23 CJ 시연회 이후 보고서 초기값은 제거합니다.
  RPT_PARAMS: {},
};

export const Server = {
  getRestAPI: function () {
    const apiPath = this._getApiPath();
    return this.getRemoteHost() + apiPath;
  },
  getRemoteHost: function () {
    return this._getHostName() == Const.LOCAL_HTTP_ADDR
      ? this._getLocalServer()
      : this._getRemoteServer();
  },
  // Add by D.JUNG for eggplan stat api server 2020-05-24
  getStatRemoteHost: function () {
    return this._getHostName() == Const.DEV_STAT_ADDR
      ? this._getDevStatServer()
      : this._getPubStatServer();
  },
  getStatAPI: function (indexapp, dsl_name, type = 'data') {
    /*
     ** ===================================================
     ** 필수 파라미터 입니다
     ** ===================================================
     ** type : data || chart
     ** statdate : 통계일자(YYYYMMDD/YYYY-MM-DD 모두 지원)
     ** lang : 언어 (ko, en, vi)
     ** ===================================================
     */
    const timeOut = 5000;

    // 통계(ETL)서버 정보를 가져옵니다.
    if (type !== 'chart' && type !== 'data') {
      console.error('type은 현재 chart 또는 data만 가능합니다 : type=', type);
      return undefined;
    }

    if (!indexapp) {
      console.error('indexapp은 필수 입니다. : indexapp=', indexapp);
      return undefined;
    }

    if (!dsl_name) {
      console.error('dsl_name은 필수 입니다. : dsl_name=', dsl_name);
      return undefined;
    }

    const farmCode = SessionUtil.getFarmCode();
    const countryCode = SessionUtil.getCountryCode();
    const lang = SessionUtil.getLang();

    if (!farmCode) {
      console.error('farmCode는 필수 입니다. farmCode=', farmCode);
      return undefined;
    }

    if (!countryCode) {
      console.error('countryCode 는 필수 입니다. countryCode=', countryCode);
      return undefined;
    }

    if (!lang) {
      console.error('lang 는 필수 입니다. lang=', lang);
      return undefined;
    }

    let uri = '/statistics/eggplan/search/' + indexapp + '/' + dsl_name;
    // if (type === 'chart') uri += '&chart_type=chart';

    return this._getHostName() == Const.LOCAL_HTTP_ADDR
      ? this._getDevStatServer() + uri
      : this._getPubStatServer() + uri;
  },
  _getDevStatServer: function () {
    let scheme = this._getScheme();
    let url = scheme + '//' + Const.DEV_STAT_ADDR;
    let port = Const.DEV_STAT_HTTP_PORT;

    if (scheme === 'http:') {
      port = Const.DEV_STAT_HTTP_PORT;
      url = url + ':' + port;
      return url;
    }

    if (scheme === 'https:') {
      port = Const.DEV_STAT_HTTPS_PORT;
      url = url + ':' + port;
      return url;
    }

    return undefined;
  },
  _getPubStatServer: function () {
    let scheme = this._getScheme();
    let url = scheme + '//' + Const.PUB_STAT_ADDR;
    let port = Const.PUB_STAT_HTTP_PORT;

    if (scheme === 'http:') {
      port = Const.PUB_STAT_HTTP_PORT;
      url += ':' + port;
      return url;
    }

    if (scheme === 'https:') {
      port = Const.PUB_STAT_HTTPS_PORT;
      url = url + ':' + port;
      return url;
    }

    return undefined;
  },
  _getLocalServer: function () {
    let scheme = this._getScheme();
    let url = scheme + '//' + Const.LOCAL_HTTP_ADDR;
    let port = Const.LOCAL_HTTP_PORT;

    if (scheme === 'http:') {
      port = Const.LOCAL_HTTP_PORT;
      url = url + ':' + port;
      return url;
    }

    if (scheme === 'https:') {
      port = Const.REMOTE_BACKEND_HTTP_PORT;
      url = url + ':' + port;
      return url;
    }

    return undefined;
  },
  _getRemoteServer: function () {
    let scheme = this._getScheme();
    let url = scheme + '//' + Const.REMOTE_BACKEND_ADDR;
    let port = Const.REMOTE_BACKEND_HTTP_PORT;

    if (scheme === 'http:') {
      port = Const.REMOTE_BACKEND_HTTP_PORT;
      url = url + ':' + port;
      return url;
    }

    if (scheme === 'https:') {
      port = Const.REMOTE_BACKEND_HTTPS_PORT;
      url = url + ':' + port;
      return url;
    }

    return undefined;
  },
  _getDevStatServer: function () {
    let scheme = this._getScheme();
    let url = scheme + '//' + Const.DEV_STAT_ADDR;
    let port = Const.DEV_STAT_HTTP_PORT;

    if (scheme === 'http:') {
      port = Const.DEV_STAT_HTTP_PORT;
      url = url + ':' + port;
      return url;
    }

    if (scheme === 'https:') {
      port = Const.DEV_STAT_HTTPS_PORT;
      url = url + ':' + port;
      return url;
    }

    return undefined;
  },
  _getPubStatServer: function () {
    let scheme = this._getScheme();
    let url = scheme + '//' + Const.PUB_STAT_ADDR;
    let port = Const.PUB_STAT_HTTP_PORT;

    if (scheme === 'http:') {
      port = Const.PUB_STAT_HTTP_PORT;
      url = url + ':' + port;
      return url;
    }

    if (scheme === 'https:') {
      port = Const.PUB_STAT_HTTPS_PORT;
      url = url + ':' + port;
      return url;
    }

    return undefined;
  },
  _getHostName: function () {
    if (window.location.hostname === 'localhost') return Const.LOCAL_HTTP_ADDR;
    return window.location.hostname;
  },
  _getScheme: function () {
    // return http: or https:
    const scheme = window.location.protocol;
    return scheme;
  },
  _getContext: function () {
    return Const.CONTEXT_PATH;
  },
  _getApiPath: function () {
    return Const.RESTFUL_API_PATH;
  },
};
