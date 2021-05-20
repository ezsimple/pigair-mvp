import { observable, action, configure, comparer } from 'mobx';
configure({ enforceActions: 'observed' });
import i18n from 'i18next';
import MobileStore from './MobileStore';

class MRcvStore {
  constructor(root) {
    this.root = root;
  }

  @observable rcvTransferList = []; //입식 리스트 정보
  @observable rcvSelectedTransferList = ''; // 선택된 입식정보

  @observable receivedList = ''; // 입고 정보

  @observable rcvSaveForm = {
    recvQty: 0,
    receiveDate: '',
    strainCode: '',
    truckNo: '',
    remarks: '',
    customerCode: '',
    transferNo: '',
    orderNo: '',
    transferDate: '',
    transferQty: 0,
    aQty: 0,
    bQty: 0,
    pQty: 0,
    othersQty: 0,
  }; // 입고처리 시 필요한 form 입력 정보들

  @observable strainStr = ''; // Strain 이름
  @observable customerName = ''; // 고객이름
  @observable growingLogYn = 'N'; // 육성일지 작성 여부(1회라도 작성한 경우)

  @action
  setRcvTransferList = (value) => {
    this.rcvTransferList = value;
  };

  @action
  setSelectedTransferList = (value) => {
    this.rcvSelectedTransferList = value;
  };

  @action
  setRecvQty = (value) => {
    this.rcvSaveForm.recvQty = value;
    // Number(this.rcvSaveForm.pQty) +
    // Number(this.rcvSaveForm.bQty) +
    // Number(this.rcvSaveForm.aQty) +
    // Number(this.rcvSaveForm.othersQty);
  };

  @action
  setRcvDate = (value) => {
    this.rcvSaveForm.receiveDate = value;
  };

  @action
  setRcvStrain = (value) => {
    this.rcvSaveForm.strainCode = value;
  };

  @action
  setRcvStrainStr = (value) => {
    this.strainStr = value;
  };

  @action
  setRcvTruckNo = (value) => {
    this.rcvSaveForm.truckNo = value;
  };

  @action
  setRcvRemarks = (value) => {
    this.rcvSaveForm.remarks = value;
  };

  @action
  setRcvCustomerCode = (value) => {
    this.rcvSaveForm.customerCode = value;
  };

  @action
  setRcvCustomerName = (value) => {
    this.customerName = value;
  };

  @action
  setRcvTransferNo = (value) => {
    this.rcvSaveForm.transferNo = value;
  };
  @action
  setRcvOrderNo = (value) => {
    this.rcvSaveForm.orderNo = value;
  };
  @action
  setRcvTransferDate = (value) => {
    this.rcvSaveForm.transferDate = value;
  };
  @action
  setRcvTransferQty = (value) => {
    this.rcvSaveForm.transferQty = value;
  };

  @action
  initRcvSaveForm = () => {
    this.rcvSaveForm = {
      recvQty: 0,
      receiveDate: '',
      strainCode: '',
      truckNo: '',
      remarks: '',
      customerCode: '',
      transferNo: '',
      orderNo: '',
      transferDate: '',
      transferQty: 0,
      aQty: 0,
      bQty: 0,
      pQty: 0,
      othersQty: 0,
    };
  };

  @action
  setReceivedList = (value) => {
    this.receivedList = value;
  };

  @action
  setRcvAQty = (value) => {
    this.rcvSaveForm.aQty = value;
  };

  @action
  setRcvBQty = (value) => {
    this.rcvSaveForm.bQty = value;
  };

  @action
  setRcvPQty = (value) => {
    this.rcvSaveForm.pQty = value;
  };

  @action
  setRcvOthersQty = (value) => {
    this.rcvSaveForm.othersQty = value;
  };

  @action
  setGrowingLogYn_Y = () => {
    this.growingLogYn = 'Y';
    sessionStorage.setItem('growingLogYn', 'Y');
  };

  @action
  setGrowingLogYn_N = () => {
    this.growingLogYn = 'N';
    sessionStorage.setItem('growingLogYn', 'N');
  };

  @action
  setFormUpdateHatchery = (data) => {
    this.setReceivedList(data);
    this.setRcvAQty(data[0].aQty);
    this.setRcvBQty(data[0].bQty);
    this.setRcvPQty(data[0].pQty);
    this.setRcvOthersQty(data[0].othersQty);
    this.setRcvDate(data[0].receiveDate);
    this.setRcvStrain(data[0].strainCode);
    this.setRcvStrainStr(data[0].strain);
    this.setRcvTruckNo(data[0].truckNo);
    this.setRcvRemarks(data[0].remarks);
  };

  @action
  setFormUpdateSupplier = (data) => {
    this.setReceivedList(data);
    this.setRcvAQty(data[0].aQty);
    this.setRcvBQty(data[0].bQty);
    this.setRcvPQty(data[0].pQty);
    this.setRcvOthersQty(data[0].othersQty);
    this.setRcvDate(data[0].receiveDate);
    this.setRcvStrain(data[0].strainCode);
    this.setRcvStrainStr(data[0].strain);
    this.setRcvTruckNo(data[0].truckNo);
    this.setRcvRemarks(data[0].remarks);
    this.setRcvCustomerCode(data[0].customerCode);
    this.setRcvTransferNo(data[0].transferNo);
    this.setRcvOrderNo(data[0].orderNo);
    this.setRcvTransferDate(data[0].transferDate);
    this.setRcvTransferQty(data[0].transferQty);
  };

  @action
  initStore = () => {
    this.rcvTransferList = [];
    //this.rcvSelectedTransferList = ''; // 선택된 입식정보
    this.receivedList = ''; // 입고 정보
    this.strainStr = ''; // Strain 이름
    this.customerName = ''; // 고객이름
    this.setGrowingLogYn_N();
    this.initRcvSaveForm();
  };
}

export default new MRcvStore();
