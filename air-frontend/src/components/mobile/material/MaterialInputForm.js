import React, { Fragment } from 'react';
import { DateUtil, MobileUtil } from 'utils';
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
 ** 4. 파일명과 클래스명을 동일하게 해 주세요
 ** 테스트.
 */

const MaterialInputForm = inject('MMaterialStore')(
  observer((props) => {
    return (
      <Fragment>
        <ul className="mlist_del_type">
          <li>
            <span style={{ position: 'relative', top: '4px' }}>
              <Trans>Materials</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <input
              type="text"
              name="material"
              id="material"
              className="input_mtype2"
              value={props.mMaterialStore.saveForm.materialName}
              readOnly
              onClick={(e) => props.fnOpenSearchModal('TM')}
              placeholder={i18n.t('Please Select Materials')}
            />
          </li>
          <li>
            <span style={{ position: 'relative', top: '4px' }}>
              <Trans>Type</Trans>
            </span>
            <input
              type="text"
              name="type"
              id="type"
              className="input_mtype2"
              disabled
              value={props.mMaterialStore.saveForm.materialType}
            />
          </li>
          <li>
            <span>
              <Trans>Date</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <DatePicker
              className="mobile_date"
              name="mobile_date"
              style={{ width: '40%', height: 40 }}
              value={
                props.mMaterialStore.saveForm.stockDate
                  ? moment(props.mMaterialStore.saveForm.stockDate)
                  : moment(DateUtil.today())
              }
              onChange={(date, dateString) =>
                props.mMaterialStore.setStockDate(dateString)
              }
              allowClear={false}
            />
          </li>
          <li>
            <span>
              <Trans>In/Out</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <input
              type="radio"
              name="radio_inout"
              id="radio_in"
              value="I"
              style={{ display: 'none' }}
            />
            <label
              htmlFor="radio_in"
              onClick={(e) => props.mMaterialStore.setIoFlag('I')}
            >
              <Trans>In</Trans>
            </label>
            <input
              type="radio"
              name="radio_inout"
              id="radio_out"
              value="O"
              style={{ display: 'none' }}
              checked
            />
            <label
              htmlFor="radio_out"
              onClick={(e) => props.mMaterialStore.setIoFlag('O')}
            >
              <Trans>Out</Trans>
            </label>
          </li>
          <li>
            <span>
              <Trans>Qty</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <input
              type="number"
              name="qty"
              id="qty"
              className="input_mtype2_num"
              value={props.mMaterialStore.saveForm.qty}
              onChange={(e) => {
                props.mMaterialStore.setQty(e.target.value);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('qty')}
            />
            <Trans>{props.mMaterialStore.saveForm.unit}</Trans>
          </li>
          <li>
            <span style={{ position: 'relative', top: '4px' }}>
              <Trans>Customer</Trans>
            </span>
            <input
              type="text"
              name="customer"
              id="customer"
              className="input_mtype2"
              readOnly
              onClick={(e) => props.fnOpenSearchModal('C')}
              value={
                props.mMaterialStore.saveForm.customerCode == ''
                  ? ''
                  : '[' +
                    props.mMaterialStore.saveForm.customerCode +
                    ']' +
                    props.mMaterialStore.saveForm.customerName
              }
              placeholder={i18n.t('Please Select Customer')}
            />
          </li>
          <li>
            <span>
              <Trans>PO No</Trans>
            </span>
            <input
              type="text"
              name="poNo"
              id="poNo"
              className="input_mtype2"
              value={props.mMaterialStore.saveForm.pOrderNo}
              onChange={(e) => props.mMaterialStore.setPorderNo(e.target.value)}
            />
          </li>
          <li>
            <span>
              <Trans>Invoice No</Trans>
            </span>
            <input
              type="text"
              name="invoiceNo"
              id="invoiceNo"
              className="input_mtype2"
              value={props.mMaterialStore.saveForm.invoiceNo}
              onChange={(e) =>
                props.mMaterialStore.setInvoiceNo(e.target.value)
              }
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
              value={props.mMaterialStore.saveForm.remarks}
              onChange={(e) => props.mMaterialStore.setRemarks(e.target.value)}
            />
          </li>
        </ul>
      </Fragment>
    );
  })
);

export default MaterialInputForm;
