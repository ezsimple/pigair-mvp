import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { SessionUtil } from 'utils';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import i18n from 'i18next';
import DeliverItem from './DeliverItem';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const DeliverItemlist = (props) => {
  return (
    <Fragment>
      {props.deliverList.length == 0 ? (
        <p>
          <Trans>There are no delivered list. Please insert information.</Trans>
        </p>
      ) : (
        props.deliverList.map((data, i) => (
          <div key={i}>
            <DeliverItem
              data={props.deliverList}
              i={i}
              fnSetDeliverInfo={props.fnSetDeliverInfo}
            />
          </div>
        ))
      )}
    </Fragment>
  );
};

export default DeliverItemlist;
