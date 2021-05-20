import React, { Fragment } from 'react';
import { MobileUtil, DateUtil } from 'utils';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import { DatePicker } from 'antd';
import { observer, inject } from 'mobx-react';
import i18n from 'i18next';
/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const ReceiveFromHachery = inject('MRcvStore')(
  observer((props) => {
    const date = '';

    return (
      <Fragment>
        <p>
          <Trans>Hatchery Transfer Info</Trans>
        </p>
        <div
          className="recebox2"
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          <ul>
            <li>
              <span style={{ width: '56%' }}>
                <Trans>Hatchery</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.hatcheryId == undefined
                ? null
                : props.mRcvStore.rcvSelectedTransferList.hatcheryId}
            </li>
            <li>
              <span style={{ width: '56%' }}>
                <Trans>Transfer Date</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.transferDate == undefined
                ? null
                : DateUtil.toDateFormat(
                    props.mRcvStore.rcvSelectedTransferList.transferDate
                  )}
            </li>
            <li>
              <span style={{ width: '56%' }}>
                <Trans>Transfer Qty</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.transferQty == undefined
                ? null
                : props.mRcvStore.rcvSelectedTransferList.transferQty}
            </li>

            <li>
              <span style={{ width: '56%' }}>
                <Trans>Strain</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.strainCode == undefined
                ? null
                : props.mRcvStore.rcvSelectedTransferList.strainCode}
              {props.mRcvStore.rcvSelectedTransferList.strain == undefined
                ? null
                : ' - ' + props.mRcvStore.rcvSelectedTransferList.strain}
            </li>
            <li>
              <span style={{ width: '56%' }}>
                <Trans>Order No</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.orderNo == undefined
                ? null
                : props.mRcvStore.rcvSelectedTransferList.orderNo}
            </li>
            <li>
              <span style={{ width: '56%' }}>
                <Trans>Transfer No</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.transferNo == undefined
                ? null
                : props.mRcvStore.rcvSelectedTransferList.transferNo}
            </li>
            <li>
              <span style={{ width: '56%' }}>
                <Trans>Truck No</Trans>
              </span>
              {props.mRcvStore.rcvSelectedTransferList.truckNo == undefined
                ? null
                : props.mRcvStore.rcvSelectedTransferList.truckNo}
            </li>
          </ul>
        </div>

        <p>
          <Trans>Input Receive Info</Trans>
        </p>

        <ul className="list_mtype1 mT10">
          <li>
            <span>
              <Trans>Receive Date</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <DatePicker
              className="mobile_date"
              name="mobile_date"
              style={{ width: '50%', height: 40 }}
              value={
                props.mRcvStore.rcvSaveForm.receiveDate
                  ? moment(props.mRcvStore.rcvSaveForm.receiveDate)
                  : moment(DateUtil.today())
              }
              allowClear={false}
              onChange={(date, dateString) => {
                props.mRcvStore.setRcvDate(dateString),
                  props.fnValidationDate(dateString);
              }}
            />
          </li>
          <li>
            <span>
              <Trans>Receive Qty</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <input
              type="number"
              name="rvcQty"
              id="rvcQty"
              className="input_mtype2_num"
              value={props.mRcvStore.rcvSaveForm.recvQty}
              onKeyDown={(e) => props.fnIsNumber(e)}
              onChange={(e) => {
                props.mRcvStore.setRecvQty(e.target.value),
                  props.fnSetReceiveQty(e.target.value);
              }}
            />
          </li>

          <li>
            <ul>
              <li style={{ width: '50%', float: 'left' }}>
                <span style={{ width: '28%' }}>
                  <Trans>P</Trans>
                </span>
                <input
                  style={{ width: '63%' }}
                  type="number"
                  name="pQty"
                  id="pQty"
                  className="input_mtype2_num"
                  value={props.mRcvStore.rcvSaveForm.pQty}
                  onKeyDown={(e) => props.fnIsNumber(e)}
                  onChange={(e) => {
                    props.mRcvStore.setRcvPQty(e.target.value),
                      props.fnValidationQty(e.target.value, 'P');
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('pQty')}
                />
              </li>
              <li style={{ width: '50%', overflow: 'hidden' }}>
                <span style={{ width: '35%' }}>
                  <Trans>B</Trans>
                </span>
                <input
                  style={{ width: '63%' }}
                  type="number"
                  name="bQty"
                  id="bQty"
                  className="input_mtype2_num"
                  value={props.mRcvStore.rcvSaveForm.bQty}
                  onKeyDown={(e) => props.fnIsNumber(e)}
                  onChange={(e) => {
                    props.mRcvStore.setRcvBQty(e.target.value),
                      props.fnValidationQty(e.target.value, 'B');
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('bQty')}
                />
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li style={{ width: '50%', float: 'left' }}>
                <span style={{ width: '28%' }}>
                  <Trans>A</Trans>
                </span>
                <input
                  style={{ width: '63%' }}
                  type="number"
                  name="aQty"
                  id="aQty"
                  className="input_mtype2_num"
                  value={props.mRcvStore.rcvSaveForm.aQty}
                  onKeyDown={(e) => props.fnIsNumber(e)}
                  onChange={(e) => {
                    props.mRcvStore.setRcvAQty(e.target.value),
                      props.fnValidationQty(e.target.value, 'A');
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('aQty')}
                />
              </li>
              <li style={{ width: '50%', overflow: 'hidden' }}>
                <span style={{ width: '35%' }}>
                  <Trans>Others</Trans>
                </span>
                <input
                  style={{ width: '63%' }}
                  type="number"
                  name="othersQty"
                  id="othersQty"
                  className="input_mtype2_num"
                  value={props.mRcvStore.rcvSaveForm.othersQty}
                  onKeyDown={(e) => props.fnIsNumber(e)}
                  onChange={(e) => {
                    props.mRcvStore.setRcvOthersQty(e.target.value),
                      props.fnValidationQty(e.target.value, 'Others');
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('othersQty')}
                />
              </li>
            </ul>
          </li>

          <li>
            <span>
              <Trans>Strain</Trans>
            </span>
            <input
              type="text"
              name="strain"
              id="strain"
              className="input_mtype2"
              readOnly
              onClick={(e) => props.fnOpenSearchModal()}
              value={props.mRcvStore.strainStr}
              placeholder={i18n.t('Please select strain.')}
            />
          </li>
          <li>
            <span>
              <Trans>Truck No</Trans>
            </span>
            <input
              type="text"
              name="truckNo"
              id="truckNo"
              className="input_mtype2"
              value={props.mRcvStore.rcvSaveForm.truckNo}
              onChange={(e) => {
                props.mRcvStore.setRcvTruckNo(e.target.value),
                  props.fnValidationTruckNo(e.target.value);
              }}
            />
          </li>
          <li>
            <span>
              <Trans>Remark</Trans>
            </span>
            <input
              type="text"
              name="remark"
              id="remark"
              className="input_mtype2"
              value={props.mRcvStore.rcvSaveForm.remarks}
              onChange={(e) => {
                props.mRcvStore.setRcvRemarks(e.target.value),
                  props.fnValidationRemark(e.target.value);
              }}
            />
          </li>
        </ul>
      </Fragment>
    );
  })
);

export default ReceiveFromHachery;
