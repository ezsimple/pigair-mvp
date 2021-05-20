import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoImg from 'images/logo.png';
import MenuBtnImg from 'images/menubar.png';

const Logo = () => (
  <div className="navbar">
    <h1>
      <img src={LogoImg} alt={'logo'} />
    </h1>
    <div className="btnmenu">
      <Link to="/popup/common/3">
        <p href="#">
          <img src={MenuBtnImg} alt={'menubar'} />
        </p>
      </Link>
    </div>
  </div>
);

Logo.defaultProps = {
  outerClassName: 'navbar',
  innerClassName: 'btnmenu'
};

export { Logo };
