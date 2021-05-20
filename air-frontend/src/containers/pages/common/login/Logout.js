import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { Const, Server } from 'components/Properties';
import { inject, observer } from 'mobx-react';
import { SessionUtil } from 'utils';

@inject((stores) => ({ mainStore: stores.MainStore }))
@observer
export default class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { logout: false };
  }

  componentDidMount() {
    this.fnLogout();
  }

  fnGoLogin = () => {};

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
        that.setState({ logout: true });
      })
      .catch(function (error) {
        return [];
      });
  };

  render() {
    if (this.state.logout) return <Redirect to={Const.AUTO_LOGOUT_PAGE} />;
    return <React.Fragment></React.Fragment>;
  }
}
