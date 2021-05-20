import React, { Component } from 'react';
import { PagingUtil } from 'utils';
import { Trans } from 'react-i18next';
import { Modal, ModalBody } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import { Input } from 'antd';
import SearchResultItemList from './SearchResultItemList';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

@inject((stores) => ({
  mStore: stores.MobileStore,
  mRcvStore: stores.MRcvStore,
  mGrowingStore: stores.MGrowingStore,
  mDeliverStore: stores.MDeliverStore,
  mMaterialStore: stores.MMaterialStore,
}))
@observer
class SearchModal extends Component {
  componentDidMount() {
    const { mStore } = this.props;
    mStore.setSearchType(sessionStorage.getItem('searchType'));
    mStore.setMenuName(sessionStorage.getItem('menuName'));
  }

  onCloseModal = () => {
    const { mStore } = this.props;
    mStore.setModalClose();
  };

  onCloseModalWithValue = (val1, val2, val3, val4) => {
    const {
      mStore,
      mRcvStore,
      mGrowingStore,
      mDeliverStore,
      mMaterialStore,
    } = this.props;

    if (mStore.searchType == 'S') {
      //검색 타입이 strain 인 경우
      if (mStore.menuName == 'rcv') {
        //입고 관련 작업 수행
        mRcvStore.setRcvStrain(val1);
        mRcvStore.setRcvStrainStr(val2);
      }
    }
    if (mStore.searchType == 'C') {
      //검색 타입이 customer 인 경우
      if (mStore.menuName == 'rcv') {
        //입고 관련 작업 수행
        mRcvStore.setRcvCustomerCode(val1);
        mRcvStore.setRcvCustomerName(val2);
      }
      if (mStore.menuName == 'del') {
        //출고 관련 작업 수행
        mDeliverStore.setCustomerCode(val1);
        mDeliverStore.setCustomerName(val2);
      }
      if (mStore.menuName == 'mtr') {
        mMaterialStore.setCustomerCode(val1);
        mMaterialStore.setCustomerName(val2);
      }
    }

    if (mStore.searchType == 'F') {
      //검색 타입이 Feed 인 경우
      if (mStore.menuName == 'grw') {
        //입고 관련 작업 수행
        if (mStore.dynamicInputNo == 1) {
          mGrowingStore.setFeedCode1(val1);
          mGrowingStore.setFeedName1(val2);
          mGrowingStore.setFeedUnit1(val3);
        }
        if (mStore.dynamicInputNo == 2) {
          mGrowingStore.setFeedCode2(val1);
          mGrowingStore.setFeedName2(val2);
          mGrowingStore.setFeedUnit2(val3);
        }
        if (mStore.dynamicInputNo == 3) {
          mGrowingStore.setFeedCode3(val1);
          mGrowingStore.setFeedName3(val2);
          mGrowingStore.setFeedUnit3(val3);
        }
      }
    }

    if (mStore.searchType == 'V') {
      //검색 타입이 Feed 인 경우
      if (mStore.menuName == 'grw') {
        //입고 관련 작업 수행
        if (mStore.dynamicInputNo == 1) {
          mGrowingStore.setVaccineCode1(val1);
          mGrowingStore.setVaccineName1(val2);
          mGrowingStore.setVaccineUnit1(val3);
        }
        if (mStore.dynamicInputNo == 2) {
          mGrowingStore.setVaccineCode2(val1);
          mGrowingStore.setVaccineName2(val2);
          mGrowingStore.setVaccineUnit2(val3);
        }
        if (mStore.dynamicInputNo == 3) {
          mGrowingStore.setVaccineCode3(val1);
          mGrowingStore.setVaccineName3(val2);
          mGrowingStore.setVaccineUnit3(val3);
        }
      }
    }

    if (mStore.searchType == 'M') {
      //검색 타입이 Feed 인 경우
      if (mStore.menuName == 'grw') {
        //입고 관련 작업 수행
        if (mStore.dynamicInputNo == 1) {
          mGrowingStore.setMedicineCode1(val1);
          mGrowingStore.setMedicineName1(val2);
          mGrowingStore.setMedicineUnit1(val3);
        }
        if (mStore.dynamicInputNo == 2) {
          mGrowingStore.setMedicineCode2(val1);
          mGrowingStore.setMedicineName2(val2);
          mGrowingStore.setMedicineUnit2(val3);
        }
        if (mStore.dynamicInputNo == 3) {
          mGrowingStore.setMedicineCode3(val1);
          mGrowingStore.setMedicineName3(val2);
          mGrowingStore.setMedicineUnit3(val3);
        }
      }
    }

    if (mStore.searchType == 'TM') {
      mMaterialStore.setMaterialCode(val1);
      mMaterialStore.setMaterialName(val2);
      mMaterialStore.setUnit(val3);
      mMaterialStore.setMaterialType(val4);
    }

    mStore.setModalClose();
  };

  //검색결과 페이징
  onClick = (pageNo) => {
    const { mStore } = this.props;
    mStore.setSearchPageNo(pageNo);
    if (mStore.searchType == 'S') {
    }

    if (mStore.searchType == 'C') {
      this.props.fnSelectCustomer();
    }

    if (
      mStore.searchType == 'F' ||
      mStore.searchType == 'V' ||
      mStore.searchType == 'M'
    ) {
      this.props.fnSelectMaterial();
    }
    if (mStore.searchType == 'TM') {
      this.props.fnSelectMaterialInfoTotal();
    }
  };
  test = () => {
    const { mStore } = this.props;
    if (mStore.modalFlag.cate == 'S') {
      if (mStore.modalFlag.onoff == true) {
        return true;
      }
    }
  };

  render() {
    const { mStore } = this.props;

    return (
      <Modal
        isOpen={mStore.modalFlag.onoff}
        toggle={this.onCloseModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fade={false}
      >
        <ModalBody>
          {mStore.searchType == 'S' ? null : (
            <div className="mobile_search_area">
              <div className="mobile_search_ph">
                <p>
                  <Trans>Search</Trans>
                </p>
              </div>
              <div className="mobile_search_input_area">
                <Input.Search
                  type="text"
                  name="search"
                  placeholder={
                    mStore.searchType == 'C'
                      ? 'Customer Code or Name'
                      : mStore.searchType == 'F' ||
                        mStore.searchType == 'V' ||
                        mStore.searchType == 'M' ||
                        mStore.searchType == 'TM'
                      ? 'Material Code or Name'
                      : 'ssss'
                  }
                  onSearch={(value) => {
                    mStore.searchType == 'C'
                      ? this.props.fnSelectCustomer(value)
                      : mStore.searchType == 'F' ||
                        mStore.searchType == 'V' ||
                        mStore.searchType == 'M'
                      ? this.props.fnSelectMaterial(value)
                      : mStore.searchType == 'TM'
                      ? this.props.fnSelectMaterialInfoTotal(value)
                      : null;
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <SearchResultItemList
              searchResultList={mStore.searchResultList}
              searchType={mStore.searchType}
              onCloseModalWithValue={this.onCloseModalWithValue}
            />
          </div>

          {mStore.searchType == 'S' ? null : (
            <div
              id="myGrid"
              style={{
                height: 'auto',
                width: '100%',
              }}
              className="ag-theme-balham"
            >
              <PagingUtil
                total={mStore.searchTotal}
                rowCnt={mStore.searchRowCnt}
                pageSize={10}
                pageNo={mStore.searchPageNo}
                onClick={this.onClick}
              />
            </div>
          )}
        </ModalBody>
      </Modal>
    );
  }
}

export default SearchModal;
