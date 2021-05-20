import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import ReceiveHatcheryItem from './ReceiveHatcheryItem';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const ReceiveHatcheryItemList = (props) => {
  return (
    <Fragment>
      {props.hatcheryList.length == 0 ? (
        <div className="receive_hatchery_none_list">
          <p>
            <Trans>There are no Transfer List.</Trans>
          </p>
          <p>
            <Trans>Please Check Information.</Trans>
          </p>
        </div>
      ) : (
        <div>
          <p>
            <Trans>Select Hatchery Release Info</Trans>
          </p>
          {props.hatcheryList.map((data, i) => (
            <div
              key={i}
              className="receive_hatchery_list_wrapper"
              onClick={(e) => props.setPopupStepNextTrue()}
            >
              <ReceiveHatcheryItem
                data={props.hatcheryList}
                i={i}
                fnSetTransferList={props.fnSetTransferList}
              />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default ReceiveHatcheryItemList;
