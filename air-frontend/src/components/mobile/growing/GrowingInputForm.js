import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import { DatePicker } from 'antd';
import { MobileUtil } from 'utils';
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

const GrowingInputForm = inject('MGrowingStore')(
  observer((props) => {
    return (
      <Fragment>
        <ul className="mlist_del_type">
          <li>
            <span>
              <Trans>Population</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <input
              type="number"
              name="pop"
              id="pop"
              className="input_mtype2_num"
              value={sessionStorage.getItem('prevGrowLogPopulation')}
              readOnly
              style={{ background: '#f5f5f5' }}
            />
          </li>
          <li>
            <span>
              <Trans>workDate</Trans>
              <span className="mobile_form_necs">*</span>
            </span>
            <DatePicker
              className="mobile_date"
              name="mobile_date"
              style={{ width: '40%', height: 40 }}
              allowClear={false}
              disabled
              defaultValue={moment(sessionStorage.getItem('workDate'))}
            />
          </li>
          <li>
            <div className="mGrowForm_div_left">
              <span style={{ width: '34%' }}>
                <Trans>Death</Trans>
              </span>
              <input
                type="number"
                name="death"
                id="death"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.deathQty}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setDeathQty(e.target.value);
                  props.fnValidationDeathQty(e.target.value);
                }}
                pattern="[0-9]{10}"
                onFocus={(e) => MobileUtil.fnFocusInput('death')}
              />
            </div>
            <div className="mGrowForm_div_right">
              <span>
                <Trans>Culling</Trans>
              </span>
              <input
                type="number"
                name="culling"
                id="culling"
                className="input_mtype2_num"
                style={{ width: '48%', background: '#f5f5f5' }}
                value={props.mGrowingStore.growSaveForm.cullingQty}
                readOnly
              />
            </div>
          </li>

          <li>
            <div className="mGrowForm_div_left">
              <span style={{ width: '34%' }}>
                <Trans>Ompal</Trans>
              </span>
              <input
                type="number"
                name="Ompal"
                id="Ompal"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.ompalQty}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setOmpalQty(e.target.value),
                    props.fnValidationQty(e.target.value, 'O');
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('Ompal')}
              />
            </div>
            <div className="mGrowForm_div_right">
              <span>
                <Trans>Weak</Trans>
              </span>
              <input
                type="number"
                name="Weak"
                id="Weak"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.weakQty}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setWeakQty(e.target.value),
                    props.fnValidationQty(e.target.value, 'W');
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('Weak')}
              />
            </div>
          </li>

          <li>
            <div className="mGrowForm_div_left">
              <span style={{ width: '34%' }}>
                <Trans>DryLeg</Trans>
              </span>
              <input
                type="number"
                name="DryLeg"
                id="DryLeg"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.drylegQty}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setDrylegQty(e.target.value),
                    props.fnValidationQty(e.target.value, 'D');
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('DryLeg')}
              />
            </div>
            <div className="mGrowForm_div_right">
              <span>
                <Trans>Claim</Trans>
              </span>
              <input
                type="number"
                name="Claim"
                id="Claim"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.claimQty}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setClaimQty(e.target.value);
                  props.fnValidationQty(e.target.value, 'C');
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('Claim')}
              />
            </div>
          </li>

          <li>
            <div className="mGrowForm_div_left" style={{ float: 'none' }}>
              <span style={{ width: '44%' }}>
                <Trans>Abnormal</Trans>
              </span>
              <input
                type="number"
                name="Abnormal"
                id="Abnormal"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.abnormalQty}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setAbnormalQty(e.target.value);
                  props.fnValidationQty(e.target.value, 'A');
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('Abnormal')}
              />
            </div>
            <div className="mGrowForm_div_right"></div>
          </li>

          <li>
            <div className="mGrowForm_div_left" style={{ float: 'inherit' }}>
              <span style={{ width: '34%' }}>
                <Trans>B.W</Trans>
              </span>
              <input
                type="number"
                name="bw"
                id="bw"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.bw}
                onKeyDown={(e) => props.fnIsNumber(e)}
                onChange={(e) => {
                  props.mGrowingStore.setBw(e.target.value);
                  //props.fnSetReceiveQty();
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('bw')}
              />
              g
            </div>
            <div className="mGrowForm_div_right">
              {/* <span>
                <Trans>Unit</Trans>
              </span>
              <input
                type="number"
                name="unit"
                id="unit"
                className="input_mtype2_num"
                style={{ width: '48%' }}
                value={props.mGrowingStore.growSaveForm.uniformity}
                onChange={(e) => {
                  //props.mGrowingStore.setUniformity(e.target.value);
                  props.fnValidationUtit(e.target.value);
                  //props.fnSetReceiveQty();
                }}
                onFocus={(e) => MobileUtil.fnFocusInput('unit')}
                step="0.01"
              />
              % */}
            </div>
          </li>

          <li>
            <span style={{ width: '20%' }}>
              <Trans>Remark</Trans>
            </span>
            <input
              type="text"
              name="remarks"
              id="remarks"
              className="input_mtype2"
              style={{ width: '79%' }}
              value={props.mGrowingStore.growSaveForm.growingRem}
              onChange={(e) => {
                props.mGrowingStore.setRemarks(e.target.value);
                props.fnValidationRemark(e.target.value);
              }}
            />
          </li>

          <hr color={'#d4e4ef'} />

          <li>
            <span style={{ width: '25%' }}>
              <Trans>Feed</Trans>
            </span>
            <input
              type="text"
              name="feed1"
              id="feed1"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('F'), props.mStore.setSdynamicInputNo(1);
              }}
              value={props.mGrowingStore.growSaveForm.feedName1}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="feed1_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.feedUseAmt1}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'F', 1);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('feed1_num')}
            />
            {props.mGrowingStore.growSaveForm.feedUnit1}
          </li>
          <li>
            <span style={{ width: '25%' }}></span>
            <input
              type="text"
              name="feed2"
              id="feed2"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('F'), props.mStore.setSdynamicInputNo(2);
              }}
              value={props.mGrowingStore.growSaveForm.feedName2}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="feed2_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.feedUseAmt2}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'F', 2);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('feed2_num')}
            />
            {props.mGrowingStore.growSaveForm.feedUnit2}
          </li>
          <li>
            <span style={{ width: '25%' }}></span>
            <input
              type="text"
              name="feed3"
              id="feed3"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('F'), props.mStore.setSdynamicInputNo(3);
              }}
              value={props.mGrowingStore.growSaveForm.feedName3}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="feed3_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.feedUseAmt3}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'F', 3);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('feed3_num')}
            />
            {props.mGrowingStore.growSaveForm.feedUnit3}
          </li>
          <li>
            <span style={{ width: '25%' }}>
              <Trans>Vaccine</Trans>
            </span>
            <input
              type="text"
              name="vaccine1"
              id="vaccine1"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('V'), props.mStore.setSdynamicInputNo(1);
              }}
              value={props.mGrowingStore.growSaveForm.vaccineName1}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="vaccine1_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.vaccineUseAmt1}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'V', 1);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('vaccine1_num')}
            />
            {props.mGrowingStore.growSaveForm.vaccineUnit1}
          </li>
          <li>
            <span style={{ width: '25%' }}></span>
            <input
              type="text"
              name="vaccine2"
              id="vaccine2"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('V'), props.mStore.setSdynamicInputNo(2);
              }}
              value={props.mGrowingStore.growSaveForm.vaccineName2}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="vaccine2_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.vaccineUseAmt2}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'V', 2);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('vaccine2_num')}
            />
            {props.mGrowingStore.growSaveForm.vaccineUnit2}
          </li>
          <li>
            <span style={{ width: '25%' }}></span>
            <input
              type="text"
              name="vaccine3"
              id="vaccine3"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('V'), props.mStore.setSdynamicInputNo(3);
              }}
              value={props.mGrowingStore.growSaveForm.vaccineName3}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="vaccinee3_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.vaccineUseAmt3}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'V', 3);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('vaccinee3_num')}
            />
            {props.mGrowingStore.growSaveForm.vaccineUnit3}
          </li>
          <li>
            <span style={{ width: '25%' }}>
              <Trans>Medicine</Trans>
            </span>
            <input
              type="text"
              name="Medicine1"
              id="Medicine1"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('M'), props.mStore.setSdynamicInputNo(1);
              }}
              value={props.mGrowingStore.growSaveForm.medicineName1}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="Medicine1_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.medicineUseAmt1}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'M', 1);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('Medicine1_num')}
            />
            {props.mGrowingStore.growSaveForm.medicineUnit1}
          </li>
          <li>
            <span style={{ width: '25%' }}></span>
            <input
              type="text"
              name="Medicine2"
              id="Medicine2"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('M'), props.mStore.setSdynamicInputNo(2);
              }}
              value={props.mGrowingStore.growSaveForm.medicineName2}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="Medicine2_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.medicineUseAmt2}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'M', 2);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('Medicine2_num')}
            />
            {props.mGrowingStore.growSaveForm.medicineUnit2}
          </li>
          <li>
            <span style={{ width: '25%' }}></span>
            <input
              type="text"
              name="Medicine3"
              id="Medicine3"
              className="input_mtype2"
              style={{ width: '43%', marginRight: '3%' }}
              readOnly
              onClick={(e) => {
                props.onOpenModal('M'), props.mStore.setSdynamicInputNo(3);
              }}
              value={props.mGrowingStore.growSaveForm.medicineName3}
            />
            <input
              type="number"
              className="input_mtype2_num"
              id="Medicine3_num"
              style={{ width: '16%' }}
              value={props.mGrowingStore.growSaveForm.medicineUseAmt3}
              onChange={(e) => {
                props.fnMaterialValidation(e.target.value, 'M', 3);
              }}
              onFocus={(e) => MobileUtil.fnFocusInput('Medicine3_num')}
            />
            {props.mGrowingStore.growSaveForm.medicineUnit3}
          </li>
          <li>
            <span style={{ width: '25%' }}>
              <Trans>Vet.Log</Trans>
            </span>
            <input
              type="text"
              name="vetLog"
              id="vetLog"
              className="input_mtype2"
              style={{ width: '70%' }}
              value={props.mGrowingStore.growSaveForm.veterinarian}
              onChange={(e) => {
                props.mGrowingStore.setVeterinarian(e.target.value);
              }}
            />
          </li>
        </ul>
      </Fragment>
    );
  })
);

export default GrowingInputForm;
