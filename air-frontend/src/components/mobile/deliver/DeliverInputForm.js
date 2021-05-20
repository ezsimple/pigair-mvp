import React, { Fragment } from 'react';
import { MobileUtil } from 'utils';
import { Trans } from 'react-i18next';
import { Select } from 'antd';
import { observer, inject } from 'mobx-react';
import i18n from 'i18next';
/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요
 ** 테스트.
 */

const DeliverInputForm = inject('MDeliverStore')(
  observer((props) => {
    const date = '';
    const { Option } = Select;

    return (
      <Fragment>
        <ul className="mlist_del_type">
          <li>
            <span style={{ position: 'relative', top: '4px' }}>
              <Trans>Customer</Trans>
            </span>
            <input
              type="text"
              name=""
              id=""
              className="input_mtype2"
              readOnly
              onClick={(e) => props.fnOpenSearchModal('C')}
              value={props.mDeliverStore.delSaveForm.customerName}
              placeholder={i18n.t('Please Select Customer')}
            />
          </li>
          <li>
            <span style={{ float: 'left', marginTop: '11px' }}>
              <Trans>Culling</Trans>
            </span>
            <ul style={{ width: '70%', overflow: 'hidden' }}>
              <li style={{ width: '50%', float: 'left' }}>
                <span>Qty</span>
                <input
                  type="number"
                  name="culQty"
                  id="culQty"
                  className="input_mtype2_num"
                  value={props.mDeliverStore.delSaveForm.cullingQty}
                  onChange={(e) => {
                    props.mDeliverStore.setCullingQty(e.target.value);
                    props.fnValidationCullingQty(e.target.value);
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('culQty')}
                />
              </li>
              <li style={{ width: '50%', overflow: 'hidden' }}>
                <input
                  type="number"
                  name="culW"
                  id="culW"
                  className="input_mtype2_num"
                  value={props.mDeliverStore.delSaveForm.cullingWeight}
                  onChange={(e) => {
                    props.mDeliverStore.setCullingWeight(e.target.value);
                    props.fnValidationWeight(e.target.value, 'C');
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('culW')}
                />
                <span>Kg</span>
              </li>
            </ul>
          </li>
          <li>
            <span style={{ float: 'left', marginTop: '11px' }}>
              <Trans>Harvest</Trans>
            </span>
            <ul style={{ width: '70%', overflow: 'hidden' }}>
              <li style={{ width: '50%', float: 'left' }}>
                <span>Qty</span>
                <input
                  type="number"
                  name="harQty"
                  id="harQty"
                  className="input_mtype2_num"
                  value={props.mDeliverStore.delSaveForm.harvestQty}
                  onChange={(e) => {
                    props.mDeliverStore.setHarvestQty(e.target.value),
                      props.fnValidationHarvestQty(e.target.value);
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('harQty')}
                />
              </li>
              <li style={{ width: '50%', overflow: 'hidden' }}>
                <input
                  type="number"
                  name="harW"
                  id="harW"
                  className="input_mtype2_num"
                  value={props.mDeliverStore.delSaveForm.harvestWeight}
                  onChange={(e) => {
                    props.mDeliverStore.setHarvestWeight(e.target.value);
                    props.fnValidationWeight(e.target.value, 'H');
                  }}
                  onFocus={(e) => MobileUtil.fnFocusInput('harW')}
                />
                <span>Kg</span>
              </li>
            </ul>
          </li>
          <li>
            <span>
              <Trans>Order No</Trans>
            </span>
            <input
              type="text"
              name="orderNo"
              id="orderNo"
              className="input_mtype2"
              value={props.mDeliverStore.delSaveForm.sOrderNo}
              onChange={(e) => {
                props.mDeliverStore.setOrderNo(e.target.value);
              }}
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
              value={props.mDeliverStore.delSaveForm.truckNo}
              onChange={(e) => {
                props.mDeliverStore.setTruckNo(e.target.value);
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
              value={props.mDeliverStore.delSaveForm.remarks}
              onChange={(e) => {
                props.mDeliverStore.setRemarks(e.target.value);
              }}
            />
          </li>
        </ul>
      </Fragment>
    );
  })
);

export default DeliverInputForm;
