import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import MaterialItem from './MaterialItem';
/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const MaterialItemList = (props) => {
  return (
    <Fragment>
      <div>
        <div className="mMaterialBtn">
          <Link to="/mobile/broiler/materialForm">
            <Button color="primary">Write</Button>
          </Link>
        </div>
      </div>

      {props.materialList.length == 0 ? (
        <p>
          <Trans>There is no Infromation.</Trans>
        </p>
      ) : (
        <div>
          <div style={{ marginTop: '20px' }}>
            <ul className="mobile_material_title">
              <li className="mobile_mtr_list_col_1">
                <Trans>Materials</Trans>
              </li>
              <li className="mobile_mtr_list_col_2">
                <Trans>Date</Trans>
              </li>
              <li className="mobile_mtr_list_col_3">
                <Trans>I/O</Trans>
              </li>
              <li className="mobile_mtr_list_col_4">
                <Trans>Qty</Trans>
              </li>
            </ul>
          </div>
          {props.materialList.map((data, i) => (
            <div key={i}>
              <MaterialItem
                data={props.materialList}
                i={i}
                fnSetMaterialList={props.fnSetMaterialList}
              />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default MaterialItemList;
