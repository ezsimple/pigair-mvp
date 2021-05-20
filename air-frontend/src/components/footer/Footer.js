import React, { Component, Fragment } from 'react';
import { Link, NavLink, NavItem } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Trans } from 'react-i18next';

const Footer = props => {
  return (
    <Fragment>
      <footer className={styles.footer}>
        <ul className={styles.footer_menu}>
          <li>
            <Link to="/page/daily/0">
              <i className="mdi mdi-home-outline"></i>
              <Trans>m.홈</Trans>
            </Link>
          </li>
          <li>
            <Link to="/page/quick/0">
              <i className="mdi mdi-format-list-bulleted"></i>
              <Trans>m.퀵메뉴</Trans>
            </Link>
          </li>
          <li>
            <Link to="/popup/common/1">
              <i className="mdi mdi-qrcode"></i>
              <Trans>m.QR</Trans>
            </Link>
          </li>
          <li>
            <Link to="/popup/common/2">
              <i className="mdi mdi-account"></i>
              <Trans>m.마이페이지</Trans>
            </Link>
          </li>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Footer;
