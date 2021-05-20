import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const SearchResultItem = (props) => {
  return (
    <Fragment>
      <div
        className="mobile_search_modal_item"
        onClick={
          props.searchType == 'S'
            ? (e) =>
                props.onCloseModalWithValue(
                  props.data[props.i].codeValue,
                  props.data[props.i].codeText
                )
            : props.searchType == 'C'
            ? (e) =>
                props.onCloseModalWithValue(
                  props.data[props.i].customerCode,
                  props.data[props.i].customerName
                )
            : props.searchType == 'F' ||
              props.searchType == 'V' ||
              props.searchType == 'M'
            ? (e) =>
                props.onCloseModalWithValue(
                  props.data[props.i].materialCode,
                  props.data[props.i].materialName,
                  props.data[props.i].unit
                )
            : props.searchType == 'TM'
            ? (e) =>
                props.onCloseModalWithValue(
                  props.data[props.i].materialCode,
                  props.data[props.i].materialName,
                  props.data[props.i].unit,
                  props.data[props.i].materialTypeName
                )
            : null
        }
      >
        <div className="f_left" style={{ width: '90%' }}>
          <input
            type="radio"
            name="selectResultRadio"
            id={'selectReuslt' + props.i}
          />
          <label htmlFor={'selectReuslt' + props.i} style={{ width: '90%' }}>
            {props.searchType == 'S' ? (
              <span>{props.data[props.i].codeText}</span>
            ) : props.searchType == 'C' ? (
              <span>
                [{props.data[props.i].customerCode}]
                {props.data[props.i].customerName}
              </span>
            ) : props.searchType == 'F' ||
              props.searchType == 'V' ||
              props.searchType == 'M' ||
              props.searchType == 'TM' ? (
              <span>
                [{props.data[props.i].materialCode}]
                {props.data[props.i].materialName}
              </span>
            ) : (
              <div>
                <span> [code] </span>
                <span>name</span>
              </div>
            )}
          </label>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchResultItem;
