import React, { Fragment, useState } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'antd';
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

const MaterialItem = (props) => {
  return (
    <Fragment>
      <div onClick={(e) => props.fnSetMaterialList(props.data[props.i])}>
        <ul className="mobile_form_content">
          <li className="mobile_mtr_list_col_1">
            <p
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              [{props.data[props.i].materialCode}]
              {props.data[props.i].materialTypeName}
            </p>
          </li>
          <li className="mobile_mtr_list_col_2">
            <p>{props.data[props.i].stockDate}</p>
          </li>
          <li className="mobile_mtr_list_col_3">
            {props.data[props.i].ioFlag == 'I' ? <p>In</p> : <p>Out</p>}
          </li>
          <li className="mobile_mtr_list_col_4">
            <p>{props.data[props.i].qty}</p>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default MaterialItem;
