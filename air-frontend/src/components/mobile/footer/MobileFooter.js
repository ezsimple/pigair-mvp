import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const MobileFooter = (props) => {
  return (
    <Fragment>
      {/* footer */}
      <div className="mfooter">
        <ul className="mmenu">
          <li
            onClick={(e) => {
              props.fnSelecetMenu(
                i18n.t('Growing Log'), //메뉴 이름
                'mdi mdi-border-outside', //아이콘
                'grw' //메뉴 코드
              );
            }}
          >
            {/* 아이콘 글자는 영어로 표기합니다. (번역하지 않습니다.)
                스마트폰해상도와 글자폭에 따라 푸터가 깨질 수 있습니다. */}
            <i className="mdi mdi-border-outside"></i>
            Daily Log
          </li>
          <li
            onClick={(e) => {
              props.fnSelecetMenu(i18n.t('Deliver'), 'mdi mdi-export', 'del');
            }}
          >
            <i className="mdi mdi-truck-delivery"></i>
            Deliver
          </li>
          <li
            onClick={(e) => {
              props.fnSelecetMenu(
                i18n.t('Receive'),
                'mdi mdi-playlist-check',
                'rcv'
              );
            }}
          >
            <i className="mdi mdi-playlist-check"></i>
            Receive
          </li>
          <li
            onClick={(e) => {
              props.fnSelecetMenu(
                i18n.t('Material'),
                'mdi-cube-outline',
                'mtr'
              );
            }}
          >
            <i className="mdi mdi-cube-outline"></i>
            Materials
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default MobileFooter;
