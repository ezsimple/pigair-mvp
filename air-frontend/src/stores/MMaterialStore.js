import { observable, action, configure, computed } from 'mobx';
configure({ enforceActions: 'observed' });

/*
프로젝트 관련 Store 입니다.
추후 추가될 상태값들을 위해 구분하였습니다.
*/

class MMaterialStore {
  constructor(root) {
    this.root = root;
  }

  @observable materialList = []; //자제정보 리스트

  @observable saveForm = {
    farmCode: '',
    materialCode: '',
    materialName: '',
    materialType: '',
    unit: '',
    stockSeq: 0,
    customerCode: '',
    customerName: '',
    invoiceNo: '',
    qty: 0,
    pOrderNo: '',
    remarks: '',
    projCode: '',
    ioFlag: 'O',
    stockDate: '',
  };

  @observable selectedMaterialList = ''; //선택한 자제정보

  @action
  setMaterialList = (value) => {
    this.materialList = value;
  };

  @action
  setMaterialCode = (value) => {
    this.saveForm.materialCode = value;
  };

  @action
  setMaterialName = (value) => {
    this.saveForm.materialName = value;
  };

  @action
  setMaterialType = (value) => {
    this.saveForm.materialType = value;
  };

  @action
  setUnit = (value) => {
    this.saveForm.unit = value;
  };

  @action
  setStockSeq = (value) => {
    this.saveForm.stockSeq = value;
  };

  @action
  setCustomerCode = (value) => {
    this.saveForm.customerCode = value;
    if (value == undefined) {
      this.saveForm.customerCode = '';
    }
  };

  @action
  setCustomerName = (value) => {
    this.saveForm.customerName = value;
    if (value == undefined) {
      this.saveForm.customerCode = '';
    }
  };

  @action
  setInvoiceNo = (value) => {
    this.saveForm.invoiceNo = value;
  };

  @action
  setQty = (value) => {
    this.saveForm.qty = value;
  };

  @action
  setPorderNo = (value) => {
    this.saveForm.pOrderNo = value;
  };

  @action
  setRemarks = (value) => {
    this.saveForm.remarks = value;
  };

  @action
  setIoFlag = (value) => {
    this.saveForm.ioFlag = value;
  };

  @action
  setStockDate = (value) => {
    this.saveForm.stockDate = value;
  };

  @action
  initSaveForm = () => {
    this.saveForm = {
      farmCode: '',
      materialCode: '',
      materialName: '',
      materialType: '',
      unit: '',
      stockSeq: 0,
      customerCode: '',
      customerName: '',
      invoiceNo: '',
      qty: 0,
      pOrderNo: '',
      remarks: '',
      projCode: '',
      ioFlag: 'O',
      stockDate: '',
    };
  };

  @action
  setSelectedMaterialList = (value) => {
    this.selectedMaterialList = value;
    sessionStorage.setItem('stockSeq', value.stockSeq);
  };

  @action
  setSaveFormForUpdate = (data) => {
    this.setMaterialCode(data.materialCode);
    this.setMaterialName(data.materialName);
    this.setUnit(data.unit);
    this.setCustomerCode(data.customerCode);
    this.setCustomerName(data.customerName);
    this.setInvoiceNo(data.invoiceNo);
    this.setQty(data.qty);
    this.setPorderNo(data.pOrderNo);
    this.setRemarks(data.remarks);
    this.setIoFlag(data.ioFlag);
    this.setStockDate(data.stockDate);
  };

  //소토어 초기화
  @action
  initStore = () => {
    this.initSaveForm();
    this.materialList = [];
    this.selectedMaterialList = '';
  };
}

export default new MMaterialStore();
