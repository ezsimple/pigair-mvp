import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import AlertModal from 'components/mobile/common/AlertModal';
import SearchModal from 'components/mobile/common/SearchModal';
import ConfirmModal from 'components/mobile/common/ConfirmModal';
import SelectModal from 'components/mobile/common/SelectModal';
/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

@inject((stores) => ({
  mStore: stores.MobileStore,
}))
@observer
class ModalContainer extends Component {
  render() {
    const { mStore } = this.props;
    switch (mStore.modalFlag.cate) {
      case '':
        return null;
      case 'C':
        return (
          <ConfirmModal
            confirm={this.props.confirm}
            warning={this.props.warning}
            delete={this.props.delete}
          />
        );
      case 'A':
        return <AlertModal />;
      case 'S':
        return (
          <SearchModal
            fnSelectMaterialInfoTotal={this.props.fnSelectMaterialInfoTotal}
            fnSelectCustomer={this.props.fnSelectCustomer}
            fnSelectMaterial={this.props.fnSelectMaterial}
          />
        );
      case 'RCV':
        return <SelectModal fnSelectRcvType={this.props.fnSelectRcvType} />;
    }
  }
}

export default ModalContainer;
