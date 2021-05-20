import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import i18n from 'i18next';
import produce from 'immer';
import axios from 'axios';
import qs from 'qs';
import { inject, observer } from 'mobx-react';
import { Checkbox, message } from 'antd';
import { withAlert } from 'react-alert';
import { isMobile } from 'mobile-device-detect';

import { SessionUtil } from 'utils';
import { fnDetectLang } from 'utils/LangUtil';
import { Env, Const, Server } from 'components/Properties';

import LangCode from 'containers/pages/common/system/LangCode';

// import '../Common.module.css';
import './Login.css';
import PopChangePassword from './PopChangePassword';

import loginlogo from 'images/loginlogo.png';
import cj_loginlogo from 'images/cj/loginlogo_cj.png';
/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 */
@inject((stores) => ({ mainStore: stores.MainStore }))
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logined: false,
      autoLogin: localStorage.getItem('autoLogin') || false,
      popChangePasswordView: false,
      params: {
        userId: '',
        userPw: '',
        lang: SessionUtil.getLang(),
        countryCode: SessionUtil.getCountryCode(),
      },
    };
  }

  componentDidMount() {
    // console.log('this.state:', this.state);
    // console.log('params:', qs.stringify(this.state.params));
    const that = this;
    // 달력에 로케일 적용
    moment.locale(SessionUtil.getLang());

    // let noti1 = i18n.t(
    //   '1. 본 시스템은 Feed&Care 임직원 중 사전 등록된 사용자에 한해 사용할 수 있습니다.'
    // );
    // let noti2 = i18n.t(
    //   '2. 불법적인 접근 및 사용시 관련법규에 의해 처벌될 수 있습니다.'
    // );
    // this.props.alert.error(noti1, { timeout: 10000 });
    // this.props.alert.error(noti2, { timeout: 10000 });

    if (localStorage.getItem('autoLogin')) {
      const param = {
        userId: localStorage.getItem('userId'),
        userPw: localStorage.getItem('userPw'),
        lang: SessionUtil.getLang(),
        countryCode: SessionUtil.getCountryCode(),
      };
      this.fnLogin(param); // 자동 로그인
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log(prevState, this.state);
    if (prevState.logined == false && this.state.logined == true) {
      // console.log(this);
      const loginedPage = this.getLoginedPage();
      this.props.history.push(loginedPage); // loginPage History overwrite
    }
  }

  onChangeParam = (e) => {
    const { name, value } = e.target;
    this.setState(
      produce((draft) => {
        draft.params[name] = value;
      })
    );
  };

  onClicked = (e) => {
    const { name, checked } = e.target;
    // console.log('onClicked:', name, checked);
    this.setState(
      produce((draft) => {
        draft.params[name] = checked;
      })
    );
  };

  // 로그인 요청하기
  fnEnter = (e) => {
    if (e.key !== 'Enter') return;
    this.fnSignin();
  };

  fnSignin = () => {
    const { params } = this.state;
    this.fnLogin(params);
  };

  fnLogin = (params) => {
    const that = this;
    const url = Server.getRestAPI() + '/login.do';

    // console.log('params:', params);
    axios({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        const { data } = response;
        // const { setLogin } = TopMenuStore;
        // console.log('fnLogin : ', data);
        if (data.error) {
          // 로그인 실패시에는 자동로그인 삭제
          localStorage.removeItem('autoLogin');
          that.props.alert.error(i18n.t(data.error));
          return;
        }
        that.fnSuccess(data);
      })
      .catch(function (error) {
        return [];
      });
  };

  // 로그인 사용자 정보 저장
  fnSaveUser = (user) => {
    // console.log('User:', user);
    // mobx는 새로고침에 정보가 훅~ 날아갑니다.
    // 그래서 sessionStore를 사용해야 합니다.
    // const { mainStore } = this.props;
    // mainStore.setUser(user);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('userId', user.userId);
    sessionStorage.setItem('userNm', user.userNm);
    sessionStorage.setItem('groupId', user.groupId);
    sessionStorage.setItem('userLevel', user.userLevel);
    sessionStorage.setItem('userLevelNm', user.userLevelNm);
    sessionStorage.setItem('countryCode', user.countryCode); // 숫자입니다.
    sessionStorage.setItem('farmCode', user.farmCode);
    sessionStorage.setItem('farmClass', user.farmClass);
    sessionStorage.setItem('farmName', user.farmName);
    sessionStorage.setItem('hatcheryId', user.hatcheryId);
    sessionStorage.setItem('division', user.division);
    sessionStorage.setItem('region', user.region);
    sessionStorage.setItem('subRegion', user.subRegion);
    sessionStorage.setItem('isLogined', true);
    const isPpl = !_.isEmpty(user.ppl);
    sessionStorage.setItem('isPpl', isPpl);
    sessionStorage.setItem('pplCode', user.ppl);
  };

  fnSaveCountryInfo = (data) => {
    // console.log(data);
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
    const { userId, userPw, autoLogin } = this.state.params;
    // console.log('fnSaveRemember : ', userId, userPw, autoLogin);
    if (autoLogin) {
      localStorage.setItem('autoLogin', autoLogin);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userPw', userPw);
    }
  };

  fnSuccess = (data) => {
    const that = this;
    const { user, countryInfo, lastAccess } = data;
    const { pwChanged } = user;

    if (pwChanged === 'N') {
      this.setState({ popChangePasswordView: true });
      return;
    }

    this.fnSaveUser(user);
    this.fnSaveCountryInfo(countryInfo);
    this.fnSaveRemember();

    const { clientIp, loginTime } = JSON.parse(lastAccess);
    if (clientIp) {
      // 한번이라도 로그인 이력이 있어야 합니다
      this.props.alert.show(
        <div>
          <p>{i18n.t('Last Login')}</p>
          <p>Ip: {clientIp}</p>
          <p>Time: {loginTime}</p>
        </div>,
        { timeout: 10000 }
      );
    }
    this.setState({ logined: true }, function () {
      // Move to ComponentDidUpdate LifeCycle 
      // const loginedPage = that.getLoginedPage();
      // that.props.history.replace(loginedPage); // loginPage History overwrite
    });
  };

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

  // 사용자 Level, 그룹에 따라 첫페이지가 달라짐
  getLoginedPage = () => {
    const { mainStore } = this.props;
    const { isWorkManager } = mainStore;
    const groupId = SessionUtil.getGroupId();
    let loginedPage = Const.AUTO_LOGINED_PAGE;
    switch (groupId) {
      case Const.ADMIN:
      case Const.DEVEL:
        break;

      case Const.CONSULT:
        if (isWorkManager()) loginedPage = '/breeding/report/grwDailyR';
        return loginedPage;

      case Const.BREED:
        loginedPage = Const.BREED_LOGINED_PAGE;
        if (isWorkManager()) loginedPage = '/breeding/report/grwDailyR';
        return loginedPage;

      case Const.HATCHERY:
        loginedPage = Const.HATCHERY_LOGINED_PAGE;
        // if (isWorkManager()) loginedPage = '/breeding/report/grwDailyR';
        return loginedPage;

      case Const.BROILER:
        loginedPage = Const.BROILER_LOGINED_PAGE;
        if (isWorkManager()) loginedPage = '/broiler/report/dailyProjectR';
        return loginedPage;
    }
    return loginedPage;
  };
  fnChangePopupView = (value) => {
    this.setState({
      params: { userPw: '' }, // 패스워드 Clear
      popChangePasswordView: value,
    });
  };

  render() {
    const groupId = SessionUtil.getGroupId();
    const userLevel = SessionUtil.getUserLevel();
    const isLogined = SessionUtil.isLogined();
    // const loginedPage = this.getLoginedPage();
    const userAgent = window.navigator.userAgent;
    if (isMobile || userAgent.indexOf(Const.EGG_USER_AGENT) > -1)
      return <Redirect to={Const.MOBILE_LOGIN_PAGE} />;
    // if (isLogined) {
    // <Redirect to={loginedPage} />; // session ID가 달라지는 문제가 있음
    // return null;
    // }
    const noti1 = i18n.t(
      '1. 본 시스템은 Feed&Care임직원 및 관계자만 사용할 수 있습니다.'
    );
    const noti2 = i18n.t(
      '2. 불법적인 접근 및 사용시 관련법규에 의해 처벌될 수 있습니다.'
    );
    return (
      <Fragment>
        {/* 디자인 영역 */}
        <div className="con_login">
          <div className="login_bg1">
            <div className="login_bg2">
              <div className="login_box">
                <div className="loginimg">
                  <img src={Env === 'cjprod' ? cj_loginlogo : loginlogo} />
                </div>
                <div className="logintxt">EggPlan</div>

                <ul className="login_list">
                  <li>
                    <label htmlFor="" className="labelzero">
                      <Trans>Id</Trans>
                    </label>
                    <input
                      type="text"
                      name="userId"
                      className="input_login"
                      placeholder="ID"
                      value={this.state.params.userId}
                      onChange={(e) => this.onChangeParam(e)}
                    />
                    <i className="mdi mdi-account-circle"></i>
                  </li>
                  <li>
                    <label htmlFor="" className="labelzero">
                      <Trans>Password</Trans>
                    </label>
                    <input
                      type="password"
                      name="userPw"
                      className="input_login"
                      placeholder="Password"
                      value={this.state.params.userPw}
                      onChange={(e) => this.onChangeParam(e)}
                      onKeyDown={(e) => this.fnEnter(e)}
                    />
                    <i className="mdi mdi-lock"></i>
                  </li>
                  <li>
                    <label htmlFor="" className="labelzero">
                      <Trans>Language</Trans>
                    </label>
                    <LangCode
                      name="lang"
                      className=""
                      setCode={this.setCode}
                      code={this.state.params.lang}
                      changePossible={true}
                      disabled={false}
                    />
                    <i className="mdi mdi-earth"></i>
                  </li>
                  <li className="txt_right mT20">
                    <Checkbox name="autoLogin" onChange={this.onClicked}>
                      <Trans>Remember me</Trans>
                    </Checkbox>
                  </li>
                  <li className="mT30">
                    <button className="btn_login" onClick={this.fnSignin}>
                      <Trans>LOGIN</Trans>
                    </button>
                  </li>
                </ul>

                <div
                  className="login_find"
                  style={{ textAlign: 'left', marginLeft: 40 }}
                >
                  <Trans>
                    1. 본 시스템은 Feed&Care임직원 및 관계자만 사용할 수
                    있습니다.
                  </Trans>
                  <br></br>
                  <Trans>
                    2. 불법적인 접근 및 사용시 관련법규에 의해 처벌될 수
                    있습니다.
                  </Trans>
                </div>
              </div>

              {/*
              <div
                style={{
                  marginTop: 50,
                  marginLeft: 140,
                  // position: 'relative',
                  display: 'block',
                  background: '#fff',
                  borderRadius: 5,
                  borderColor: '#f00',
                  width: 500,
                }}
              >
                <div>{noti1}</div>
                <div>{noti2}</div>
              </div>
              */}
            </div>
          </div>
        </div>

        {/* 최초 로그인시 패스워드 변경 강제 기능 */}
        {this.state.popChangePasswordView && (
          <PopChangePassword
            popChangePasswordView={this.state.popChangePasswordView}
            userId={this.state.params.userId}
            prevPw={this.state.params.userPw}
            fnChangePopupView={this.fnChangePopupView}
          />
        )}
        {/* 디자인 영역 */}
      </Fragment>
    );
  }
}

export default withAlert()(Login);
