import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
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
class SelectModal extends Component {
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
      >
        <ModalHeader style={{ height: '62px' }}>
          <Trans>Please Select</Trans>
        </ModalHeader>
        <ModalBody>
          <div className="mobile_rcv_select_modal">
            <div className="f_left" style={{ width: '100%' }}>
              <input type="radio" name="rcvSelectRoute" id="selectHetchery" />
              <label
                htmlFor="selectHetchery"
                onClick={(e) => this.props.fnSelectRcvType('h')}
                style={{ width: '100%' }}
              >
                <span>
                  <Trans>From Hatchery</Trans>
                </span>
              </label>
            </div>
          </div>
          <div>
            <div className="f_left" style={{ width: '100%' }}>
              <input type="radio" name="rcvSelectRoute" id="selectSupplier" />
              <label
                htmlFor="selectSupplier"
                onClick={(e) => this.props.fnSelectRcvType('')}
                style={{ width: '100%' }}
              >
                <span>
                  <Trans>From Supplier</Trans>
                </span>
              </label>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default SelectModal;
