import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AppLayout from 'layout/Layout';

import CommonRouteList from 'route/CommonRouteList';
import { Navs } from 'components/';

import { SessionUtil } from 'utils';
import { Const, Server } from 'components/Properties';
import { Login, Logout, MobileLogin } from 'containers/pages/common';

import 'App.css';

const CommonRoute = (props) => {
  const getRouteInfo = (cate, id) => {
    const pathname = window.location.pathname;
    return CommonRouteList.find((page) => page.uri === pathname);
  };

  // 미인증 사용자 접근 금지 기능
  if (!SessionUtil.isLogined()) return <Redirect to={Const.AUTO_LOGOUT_PAGE} />;

  const url = props.match.url;
  const cate = props.match.params.cate;
  const id = props.match.params.id;
  const { page } = getRouteInfo(cate, id);
  return (
    <AppLayout {...props}>
      <Route path={url} component={page ? page : Navs} />
    </AppLayout>
  );
};

export default withRouter(CommonRoute);
