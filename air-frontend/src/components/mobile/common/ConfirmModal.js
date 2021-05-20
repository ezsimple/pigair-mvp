import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { observer, inject } from 'mobx-react';

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
class ConfirmModal extends Component {
  onCloseModal = () => {
    const { mStore } = this.props;
    mStore.setModalClose();
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
          <div>
            <p>{mStore.modalFlag.msg}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.onCloseModal}>
            <Trans>Cancel</Trans>
          </Button>
          {mStore.modalFlag.type == 'S' ? (
            <Button color="success" onClick={(e) => this.props.confirm()}>
              <Trans>Save</Trans>
            </Button>
          ) : mStore.modalFlag.type == 'D' ? (
            <Button color="danger" onClick={(e) => this.props.delete()}>
              <Trans>Delete</Trans>
            </Button>
          ) : mStore.modalFlag.type == 'W' ? (
            <Button color="warning" onClick={(e) => this.props.warning()}>
              <Trans>OK</Trans>
            </Button>
          ) : mStore.modalFlag.type == 'LO' ? (
            <Button color="danger" onClick={(e) => this.props.confirm()}>
              <Trans>OK</Trans>
            </Button>
          ) : mStore.modalFlag.type == 'PC' ? (
            <Button color="danger" onClick={(e) => this.props.delete()}>
              <Trans>OK</Trans>
            </Button>
          ) : null}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmModal;
