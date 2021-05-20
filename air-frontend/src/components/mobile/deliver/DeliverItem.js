import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SessionUtil } from 'utils';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import i18n from 'i18next';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const DeliverItem = (props) => {
  return (
    <Fragment>
      <div
        style={{
          borderTop: '1px solid #007bff',
          marginTop: '12px',
          borderBottom:
            props.data.length == props.i + 1 ? '1px solid #007bff' : '',
        }}
        onClick={(e) => props.fnSetDeliverInfo(props.data[props.i])}
      >
        <ul className="mobile_deliverlist_ul">
          <li className="mobile_deliverlist_li_right">
            <span>
              <Trans>Deliver Day</Trans>
            </span>
          </li>
          <li className="mobile_deliverlist_li_left">
            <span>{props.data[props.i].workDate}</span>
          </li>
          <li className="mobile_deliverlist_li_right">
            <span>
              <Trans>Customer</Trans>
            </span>
          </li>
          <li className="mobile_deliverlist_li_left">
            <span>
              [{props.data[props.i].customerCode}]
              {props.data[props.i].customerName}
            </span>
          </li>
          <li className="mobile_deliverlist_li_right">
            <span>
              <Trans>Qty / Weight</Trans>
            </span>
          </li>
          <li className="mobile_deliverlist_li_left">
            <span>
              {props.data[props.i].harvestQty} /
              {props.data[props.i].harvestWeight} Kg
            </span>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default DeliverItem;
