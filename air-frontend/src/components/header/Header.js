import React, { Component, Fragment } from 'react';

import { Link, withRouter, BrowserHistory } from 'react-router-dom';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';

import styles from './Header.module.scss';

import { Logo } from 'components/commons/logo/Logo';
import { Menu, HistoryBack } from 'components';
import { Trans } from 'react-i18next';

class Header extends Component {
  render() {
    const { cate, id } = this.props;
    return (
      <Fragment>
        <header className="headtop">
          <Logo />
          <Menu cate={cate} id={id} />
        </header>
      </Fragment>
    );
  }
}

// Popup용 헤더
const PopHeader = props => {
  const { name } = props;
  return (
    <header className="popup-headtop">
      <div className="popup-navbar">
        <div className="btnmenu">
          <HistoryBack>
            <i className="mdi mdi-chevron-left" />
          </HistoryBack>
        </div>
        <h1>
          <Trans>m.{name}</Trans>
        </h1>
      </div>
    </header>
  );
};

export default Header;
export { Header, PopHeader };
