import React from 'react';
import { Route, Redirect, withRouter, Prompt } from 'react-router-dom';
import MobileRouteList from 'route/MobileRouteList';
import { Login, Logout, MobileLogin } from 'containers/pages/common';

import { SessionUtil } from 'utils';
import { Const, Server } from 'components/Properties';
import MobileStore from '../stores/MobileStore';

import 'mApp.css';

const MobileRoute = (props) => {
  const getRouteInfo = (cate, id) => {
    const pathname = window.location.pathname;
    return MobileRouteList.find((page) => page.uri === pathname);
  };

  // 미인증 사용자 접근 금지 기능
  if (!SessionUtil.isLogined())
    return <Redirect to={Const.AUTO_MOBILE_LOGOUT_PAGE} />;

  const url = props.match.url;
  const cate = props.match.params.cate;
  const id = props.match.params.id;
  const { page } = getRouteInfo(cate, id);

  const blockMove = () => {
    MobileStore.setModalClose();
    return false;
  };

  return (
    <div>
      <Prompt
        message={(props) => (MobileStore.modalFlag.onoff ? blockMove() : true)}
      />
      <Route path={url} component={page ? page : MobileLogin} />
    </div>
  );
};

export default withRouter(MobileRoute);
