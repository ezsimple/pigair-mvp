import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Env, Const } from 'components/Properties';
import i18n from 'i18next';
import mobilelogo from 'images/logo.png';
import cj_mobilelogo from 'images/cj/logo_white_cj.png';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const MobileHeader = (props) => {
  return (
    <Fragment>
      {/* header */}
      <div className="mobile_header">
        <Link to={Const.MOBILE_LOGINED_PAGE}>
          <img
            src={Env === 'cjprod' ? cj_mobilelogo : mobilelogo}
            style={{
              width: '100px',
              position: 'absolute',
              left: '20px',
              top: '10px',
            }}
          />
        </Link>
        {props.mStore.pplYn == true ? (
          <div className="mobile_login_info">
            <div>[{props.mStore.userId}]</div>
            <div
              className="mobile_logout_btn"
              onClick={(e) =>
                props.fnLogoutModalOpen('LO', i18n.t('Do you want to logout?'))
              }
            >
              <Trans>Log out</Trans>
              <i className="mdi mdi-logout-variant"></i>
            </div>
          </div>
        ) : (
          <div className="mobile_login_info">
            <div>
              {props.mStore.farmCode}
              <span></span>
              {props.mStore.userId}
            </div>
            <div>
              <div
                className="mobile_logout_btn"
                onClick={(e) =>
                  props.fnLogoutModalOpen(
                    'LO',
                    i18n.t('Do you want to logout?')
                  )
                }
              >
                <Trans>Log out</Trans>
                <i className="mdi mdi-logout-variant"></i>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MobileHeader;
