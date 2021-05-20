import React, { Fragment } from 'react';
import { Modal, Button, ModalBody, ModalFooter } from 'reactstrap';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { SessionUtil } from 'utils';
import { Trans } from 'react-i18next';
import i18n from 'i18next';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const GrowingItem = (props) => {
  return (
    <Fragment>
      <div>
        <ul className="mobile_form_content">
          <li className="mobile_growing_col1">
            <p>{props.reverseIdx[props.i]}</p>
          </li>
          <li className="mobile_growing_col2">
            <p>{props.data[props.i].wdate}</p>
          </li>
          <li className="mobile_growing_col3">
            {props.data[props.i].deathQty == '' &&
            props.data[props.i].cullingQty == '' &&
            props.data[props.i].harvestQty ? (
              <p>0</p>
            ) : (
              <p>
                {props.data[props.i].deathQty + props.data[props.i].cullingQty}
              </p>
            )}
          </li>
          <li className="mobile_growing_col4">
            <p>{props.data[props.i].population}</p>
          </li>

          <li
            className="mobile_growing_col5"
            onClick={(e) => {
              props.fnSetGrowingList(
                props.data[props.i],
                props.reverseIdx[props.i],
                props.data[props.i + 1]
              );
            }}
          >
            {
              //props.data.length - props.reverseIdx[props.i] <= 7 &&
              props.data[props.i].iuFlag == 'I' ? (
                <Button color="primary" size="sm" style={{ width: '90%' }}>
                  <Trans>Write</Trans>
                </Button>
              ) : //props.data.length - props.reverseIdx[props.i] <= 7 &&
              props.data[props.i].iuFlag == 'U' ? (
                <Button color="secondary" size="sm" style={{ width: '90%' }}>
                  <Trans>Modify</Trans>
                </Button>
              ) : null
            }
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default GrowingItem;
