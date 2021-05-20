import React, { Fragment, useState } from 'react';
import { SessionUtil } from 'utils';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import GrowingItem from './GrowingItem';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const GrowingItemList = (props) => {
  var reverseIdx = [];
  if (props.growList.length > 0) {
    for (var i = 0; i < props.growList.length; i++) {
      reverseIdx.push(i);
    }
    reverseIdx = reverseIdx.reverse();
  }

  return (
    <Fragment>
      <div style={{ marginTop: '20px' }}>
        <ul className="mobile_growing_title">
          <li className="mobile_growing_col1">
            <Trans>Age</Trans>
          </li>
          <li className="mobile_growing_col2">
            <Trans>workDate</Trans>
          </li>
          <li className="mobile_growing_col3">
            <Trans>Death&Cull.</Trans>
          </li>
          <li className="mobile_growing_col4">
            <Trans>Pop.</Trans>
          </li>
        </ul>
      </div>
      {props.growList.map((data, i) => (
        <div key={i}>
          <GrowingItem
            data={props.growList.reverse()}
            i={i}
            reverseIdx={reverseIdx}
            fnSetGrowingList={props.fnSetGrowingList}
            mProjectStore={props.mProjectStore}
            latestWorkDate={props.latestWorkDate}
          />
        </div>
      ))}
    </Fragment>
  );
};

export default GrowingItemList;
