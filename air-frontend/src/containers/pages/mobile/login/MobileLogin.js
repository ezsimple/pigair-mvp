import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SessionUtil } from 'utils';
import { Trans } from 'react-i18next';
import axios from 'axios';
import produce from 'immer';
import qs from 'qs';
import { observer, inject } from 'mobx-react';
import i18n from 'i18next';
import { Env, Const, Server } from 'components/Properties';
import { moment } from 'components';
import { withAlert } from 'react-alert';
import LangCode from '../../common/system/LangCode';

import logo from 'images/air_logo.gif';
import 'mApp.css';

@inject((stores) => ({
  mStore: stores.MobileStore,
}))
@observer
class MobileLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        lang: SessionUtil.getLang(),
        isMobile: 'Y',
      },
    };
  }
  componentDidMount() {
    // 달력에 로케일 적용
    moment.locale(SessionUtil.getLang());
    const { mStore } = this.props;
    mStore.setAppYn_N();

    let userAgent = navigator.userAgent.toLowerCase();
    //app 여부 체크
    if (userAgent.indexOf('eggplan') > -1) {
      mStore.setAppYn_Y();
    }

    if (localStorage.getItem('autoLogin')) {
      const params = {
        userId: localStorage.getItem('userId'),
        userPw: localStorage.getItem('userPw'),
        lang: SessionUtil.getLang(),
        countryCode: SessionUtil.getCountryCode(),
        isMobile: this.state.params.isMobile,
      };
      mStore.setUserId(params.userId);
      mStore.setUserPw(params.userPw);
      this.fnLogin(params); // 자동 로그인
      //자동로그인시 app 여부 체크
      if (userAgent.indexOf('eggplan') > -1) {
        mStore.setAppYn_Y();
      }
    }
  }

  // 아이디 값 세팅
  onChangeUserId = (e) => {
    const { mStore } = this.props;
    const value = e.target.value;
    mStore.setUserId(value);
  };

  //비밀번호 값 세팅
  onChangeUserPw = (e) => {
    const { mStore } = this.props;
    const value = e.target.value;
    mStore.setUserPw(value);
  };

  //자동 로그인 상태 세팅
  onChangeAutoLoginCheck = (e) => {
    const { mStore } = this.props;
    mStore.setAutoLogin();
  };

  fnMlogin = () => {
    const { mStore } = this.props;
    const params = {
      userId: mStore.userId,
      userPw: mStore.userPw,
      lang: SessionUtil.getLang(),
      countryCode: SessionUtil.getCountryCode(),
      isMobile: this.state.params.isMobile,
    };
    this.fnLogin(params);
  };

  // 로그인 요청하기
  fnLogin = (params) => {
    const that = this;
    const url = Server.getRestAPI() + '/login.do';

    axios({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        const { data } = response;
        if (data.error) {
          // 로그인 실패시에는 자동로그인 삭제
          localStorage.removeItem('autoLogin');
          console.log(data.error);
          that.props.alert.error(i18n.t(data.error));
          return;
        }
        console.log(data);
        that.fnSuccess(data);
      })
      .catch(function (error) {
        return [];
      });
  };

  //로그인 성공 했을 경우
  fnSuccess = (data) => {
    const { mStore } = this.props;
    const { user, countryInfo } = data;
    this.fnSaveUser(user);
    this.fnSaveCountryInfo(countryInfo);
    this.fnSaveRemember();
    mStore.setLogined();
    sessionStorage.setItem('isMobile', this.state.params.isMobile);
    localStorage.setItem('lang', this.state.params.lang);
    //로그인 성공시 ppl 값이 있으면 ppl 여부 세팅
    if (user.ppl != undefined) {
      mStore.setPplYn();
    }
    if (user.farmCode != undefined) {
      mStore.setFarmCode(user.farmCode);
    }
    this.props.history.push(Const.MOBILE_LOGINED_PAGE);
  };

  // 로그인 사용자 정보 저장
  fnSaveUser = (user) => {
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('userId', user.userId);
    sessionStorage.setItem('userNm', user.userNm);
    sessionStorage.setItem('countryCode', user.countryCode); // 숫자입니다.
    sessionStorage.setItem('farmCode', user.farmCode);
    sessionStorage.setItem('farmClass', user.farmClass);
    sessionStorage.setItem('farmName', user.farmName);
    sessionStorage.setItem('hatcheryId', user.hatcheryId);
    sessionStorage.setItem('division', user.division);
    sessionStorage.setItem('region', user.region);
    sessionStorage.setItem('subRegion', user.subRegion);
    sessionStorage.setItem('isLogined', true);
    sessionStorage.setItem('pplCode', user.ppl);
  };

  fnSaveCountryInfo = (data) => {
    const {
      moneycode,
      moneydecimalpoint,
      money1000sign,
      moneydecimalsign,
      moneyalign,
      number1000sign,
      numberalign,
      dateformat,
      tz,
    } = data;

    sessionStorage.setItem('country', data);
    sessionStorage.setItem('moneyCode', moneycode);
    sessionStorage.setItem('moneyDecimalPoint', moneydecimalpoint);
    sessionStorage.setItem('money1000Sign', money1000sign);
    sessionStorage.setItem('moneyDecimalSign', moneydecimalsign);
    sessionStorage.setItem('moneyAlign', moneyalign);
    sessionStorage.setItem('number1000Sign', number1000sign);
    sessionStorage.setItem('numberAlign', numberalign);
    sessionStorage.setItem('dateFormat', dateformat);
    sessionStorage.setItem('tz', tz);
  };

  fnSaveRemember = () => {
    const { mStore } = this.props;
    if (mStore.autoLogin) {
      localStorage.setItem('autoLogin', mStore.autoLogin);
      localStorage.setItem('userId', mStore.userId);
      localStorage.setItem('userPw', mStore.userPw);
    }
  };

  //언어 코그 선택
  setCode = (name, value) => {
    this.setState(
      produce((draft) => {
        draft.params[name] = value;
      }),
      function () {
        // console.log(this.state.params);
      }
    );
  };

  render() {
    const { mStore } = this.props;
    return (
      <Fragment>
        {/* 모바일 로그인 화면 입니다. S */}

        <div className="login_mbg1">
          <div
            className="login_mbox"
            style={{ height: mStore.appYn == 'N' ? '423px' : '390px' }}
          >
            <div className="loginimg">
              <img src={logo} />
            </div>
            <ul className="login_mlist">
              <li>
                <input
                  type="text"
                  name="userId"
                  className="input_mlogin"
                  placeholder="ID"
                  value={mStore.userId}
                  onChange={(e) => this.onChangeUserId(e)}
                />
                <i className="mdi mdi-account-circle"></i>
              </li>
              <li>
                <input
                  type="password"
                  name="userPw"
                  className="input_mlogin"
                  placeholder="Password"
                  value={mStore.userPw}
                  onChange={(e) => this.onChangeUserPw(e)}
                />
                <i className="mdi mdi-lock"></i>
              </li>
              <li>
                <LangCode
                  name="lang"
                  className="mobile_lang_select"
                  setCode={this.setCode}
                  code={this.state.params.lang}
                  changePossible={true}
                  disabled={false}
                  style={{ width: '100%', marginTop: '10px' }}
                />
                <i className="mdi mdi-earth"></i>
              </li>
              <li className="txt_right">
                <input
                  type="checkbox"
                  id="autoLogin"
                  onChange={(e) => this.onChangeAutoLoginCheck()}
                  name="autoLogin"
                />
                <label htmlFor="autoLogin">
                  <Trans>Remember me</Trans>
                </label>
              </li>
              <li className="mT10">
                <Link to="#">
                  <button
                    className="btn_mlogin"
                    onClick={(e) => {
                      this.fnMlogin();
                    }}
                  >
                    <Trans>LOGIN</Trans>
                  </button>
                </Link>
              </li>
              {
                // 피클모바일에서 지원하지 않고 있으므로,
                // CJ협의이후 활성화 여부 결정합니다.
                // 2020.04.27 주간회의결과
                mStore.appYn == 'N' && false ? (
                  <li>
                    <button
                      style={{ margin: '0px', lineHeight: '50px' }}
                      className="btn_mlogin btn_sky"
                      onClick={() => {
                        location.href =
                          Server.getRestAPI() +
                          '/dl.do' +
                          '?key=' +
                          Const.APP_DOWNLOAD_KEY;
                      }}
                    >
                      <Trans>DOWNLOAD APP</Trans>
                    </button>
                  </li>
                ) : null
              }
            </ul>
          </div>
          <div className="login_mfind">
            <i className="mdi mdi-account-alert"></i>
            <Trans>
              Please contact us by email to ask.
              <br />
              <Link to="#">shlee@ezfarm.co.kr</Link>
            </Trans>
          </div>
        </div>

        {/* 모바일 로그인 화면 입니다. E */}
      </Fragment>
    );
  }
}

export default withAlert()(MobileLogin);
