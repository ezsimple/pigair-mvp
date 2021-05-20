import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { observer, inject } from 'mobx-react';
import i18n from 'i18next';

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
class AlertModal extends Component {
  onCloseAlert = () => {
    const { mStore } = this.props;
    mStore.setModalClose();
  };

  render() {
    const { mStore } = this.props;
    return (
      <Modal
        isOpen={mStore.modalFlag.onoff}
        toggle={this.onCloseAlert}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>{mStore.modalFlag.msg}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.onCloseAlert}>
            <Trans>OK</Trans>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AlertModal;
