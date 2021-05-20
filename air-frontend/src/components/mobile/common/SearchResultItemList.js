import React, { Fragment } from 'react';
import SearchResultItem from './SearchResultItem';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const SearchResultItemList = (props) => {
  return (
    <Fragment>
      <div className="mobile_search_modal_result_area">
        {props.searchResultList.map((data, i) => (
          <div key={i}>
            <SearchResultItem
              data={props.searchResultList}
              i={i}
              searchType={props.searchType}
              onCloseModalWithValue={props.onCloseModalWithValue}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default SearchResultItemList;
