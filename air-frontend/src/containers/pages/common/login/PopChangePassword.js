import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SessionUtil, DateUtil, GridUtil } from 'utils';
import { Trans } from 'react-i18next';
import { Const, Server } from 'components/Properties';
import axios from 'axios';
import qs from 'qs';
import { moment } from 'components';
import i18n from 'i18next';
import { Popconfirm, Switch, message, DatePicker, Select } from 'antd';
import NumberFormat from 'react-number-format';
import { AgGridReact } from 'components/commons/ag-grid/AgGridUtil';
import { withAlert } from 'react-alert';

class PopChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popChangePasswordView: props.popChangePasswordView,
      params: {
        userId: props.userId,
        prevPw: props.prevPw,
        userPw: undefined,
        pwChanged: 'Y',
      },
    };
  }

  componentDidMount() {
    // 달력에 로케일 적용
    moment.locale(SessionUtil.getLang());
    this.userPw.focus();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.popChangePasswordView == false &&
      this.state.popChangePasswordView == false
    )
      this.setState({
        params: { userId: this.props.userId, prevPw: this.props.userPw },
        popChangePasswordView: this.props.popChangePasswordView,
      });
  }

  setOnChange = (e, params) => {
    let that = this;
    let col = e.target.name ? e.target.name : '';
    let val = e.target.value;
    params.type = params.type ? params.type.toUpperCase() : '';
    this.setState(
      { params: { ...this.state.params, [col]: val } },
      function () {}
    );
  };

  fnCheck = () => {
    const that = this;
    const { prevPw, userPw } = this.state.params;
    // console.log(prevPw, userPw);
    if (!userPw || userPw === '') {
      that.props.alert.error(i18n.t('New password is empty'));
      return false;
    }

    if (userPw && userPw.length < 8) {
      that.props.alert.error(i18n.t('New password is too short'));
      return false;
    }

    if (prevPw === userPw) {
      that.props.alert.error(i18n.t('New password is same'));
      return false;
    }

    return true;
  };

  fnChangePassword = (params) => {
    const that = this;
    const url = Server.getRestAPI() + '/users/changePassword.do';

    axios({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        const { data } = response;
        console.log(data);
        if (!data) {
          that.props.alert.error(i18n.t('New password is not accepted'));
          return;
        }
        // goto logout & retry login with new password
        that.setState({ popChangePasswordView: false }, function () {
          that.fnLogout();
          that.props.fnChangePopupView(false);
          that.props.alert.show(
            i18n.t(
              'Thank you!, your password has been changed. Please login with new password'
            )
          );
        });
      })
      .catch(function (error) {
        return [];
      });
  };

  fnOk = () => {
    if (!this.fnCheck()) return;
    const { params } = this.state;
    this.fnChangePassword(params);
  };

  fnCancel = () => {
    const that = this;
    this.setState(
      {
        params: { userPw: '' },
        popChangePasswordView: false,
      },
      function () {
        that.fnLogout();
      }
    );
  };

  setOnKeydown = (e, params) => {
    console.log(e);
    const { key } = e;
    if (key && key === 'Enter') {
      console.log(e);
      this.fnOk();
    }
  };

  fnLogout = (params) => {
    const that = this;
    const url = Server.getRestAPI() + '/logout.do';
    axios({
      method: 'post',
      url: url,
      data: qs.stringify(params),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        const lang = SessionUtil.getLang();
        const systemCountryCode =
          localStorage.getItem('systemCountryCode') || '1';
        sessionStorage.clear();
        localStorage.clear();
        localStorage.setItem('lang', lang);
        localStorage.setItem('systemCountryCode', systemCountryCode);
      })
      .catch(function (error) {
        return [];
      });
  };

  render() {
    if (!this.state.popChangePasswordView) return null;
    return (
      <Fragment>
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0, 0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '550px',
              height: 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '320px',
              margin: 'auto',
              borderRadius: '10px',
              background: 'white',
            }}
          >
            <div className="pop_box">
              <h2>
                <Trans>Change Password</Trans>
              </h2>
              <div className="border txt_left">
                <label htmlFor="">
                  <Trans>Password(New)</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'userPw', //*** */
                  type: 'password', //*** */
                  that: this, //*** */
                  statsForm: this.state.params, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 200, // px제외 : 없으면 100% */
                  placeholder: i18n.t('Enter New Password'),
                  setOnKeydown: this.setOnKeydown,
                })}
                <button
                  className="btn_green"
                  style={{ marginRight: 5 }}
                  onClick={() => this.fnOk()}
                >
                  <Trans>Ok</Trans>
                </button>
                <button
                  className="btn_gray mL0"
                  onClick={() => this.fnCancel()}
                >
                  <Trans>Cancel</Trans>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withAlert()(PopChangePassword);
