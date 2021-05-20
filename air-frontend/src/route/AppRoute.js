import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loading from './Loading';

import { Login, Logout, MobileLogin } from 'containers/pages/common';

// -----------------------------------------------------------
// Route-based code spliting (번들링 사이즈를 줄이기 위해서)
// 코드 스플리팅 (모바일은 별개 서버스로 구분 합니다.)
// -----------------------------------------------------------
import CommonRoute from './CommonRoute';
const MobileRoute = React.lazy(() => import('./MobileRoute'));

class AppRoute extends React.PureComponent {
  render() {
    const props = this.props;
    return (
      <BrowserRouter>
        <React.Suspense fallback={<div className="loading-indicator" />}>
          <Switch>
            {/* 공통 정보 관리 */}
            <Route
              path={'/common/:cate'}
              render={(props) => <CommonRoute {...props} />}
            />
            <Route path={'/mobile/login'} component={MobileLogin} />
            <Route
              path={'/mobile/:cate'}
              render={(props) => <MobileRoute {...props} />}
            />

            {/* 로그인 페이지 */}
            <Route path={'/login'} component={Login} />

            {/* 로그아웃 페이지 */}
            <Route path={'/logout'} component={Logout} />

            {/* 부적절한 접근을 한 경우 */}
            <Route render={(props) => <MobileLogin {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default AppRoute;
