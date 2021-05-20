import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const ReceiveHatcheryItem = (props) => {
  return (
    <Fragment>
      <div
        className="recebox"
        onClick={(e) => props.fnSetTransferList(props.data[props.i])}
      >
        <ul style={{ marginLeft: '0px' }}>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Hatchery</Trans>
            </span>
            {props.data[props.i].hatcheryId}
          </li>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Transfer Date</Trans>
            </span>
            {props.data[props.i].transferDate}
          </li>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Transfer Qty</Trans>
            </span>
            {props.data[props.i].transferQty}
          </li>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Strain</Trans>
            </span>
            {props.data[props.i].strainCode} - {props.data[props.i].strain}
          </li>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Order No</Trans>
            </span>
            {props.data[props.i].orderNo}
          </li>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Transfer No</Trans>
            </span>
            {props.data[props.i].transferNo}
          </li>
          <li>
            <span style={{ width: '56%' }}>
              <Trans>Truck No</Trans>
            </span>
            {props.data[props.i].truckNo}
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default ReceiveHatcheryItem;
