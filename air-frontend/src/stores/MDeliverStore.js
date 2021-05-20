import { observable, action, configure, comparer } from 'mobx';
configure({ enforceActions: 'observed' });

class MDeliverStore {
  constructor(root) {
    this.root = root;
  }

  @observable deliverList = []; // 출고리스트

  @observable delSaveForm = {
    farmCode: '',
    projCode: '',
    workDate: '',
    sOrderNo: '',
    customerCode: '',
    customerName: '',
    cullingQty: 0,
    cullingWeight: 0,
    harvestQty: 0,
    harvestWeight: 0,
    truckNo: '',
    remarks: '',
    prevCullingQty: 0,
    prevCullingWeight: 0,
    prevHarvestQty: 0,
    prevHarvestWeight: 0,
  };

  @observable growLogListForDel = []; //출고리스트 작성을 위한 육성일지 리스트
  @observable selectedGrowLogForDel = ''; // 선택된 육성일지(출고를 위한)

  @action
  setDeliverList = (value) => {
    this.deliverList = value;
  };

  @action
  setWorkDate = (value) => {
    this.delSaveForm.workDate = value;
  };

  @action
  setOrderNo = (value) => {
    this.delSaveForm.sOrderNo = value;
  };

  @action
  setCustomerCode = (value) => {
    this.delSaveForm.customerCode = value;
  };

  @action
  setCustomerName = (value) => {
    this.delSaveForm.customerName = value;
  };

  @action
  setCullingQty = (value) => {
    this.delSaveForm.cullingQty = value;
  };

  @action
  setCullingWeight = (value) => {
    this.delSaveForm.cullingWeight = value;
  };

  @action
  setHarvestQty = (value) => {
    this.delSaveForm.harvestQty = value;
  };

  @action
  setHarvestWeight = (value) => {
    this.delSaveForm.harvestWeight = value;
  };

  @action
  setTruckNo = (value) => {
    this.delSaveForm.truckNo = value;
  };

  @action
  setRemarks = (value) => {
    this.delSaveForm.remarks = value;
  };

  @action
  setGrowLogListForDel = (value) => {
    this.growLogListForDel = value;
  };

  @action
  setSelectedGrowLogForDel = (value) => {
    this.selectedGrowLogForDel = value;
  };

  @action
  setPrevCullingQty = (value) => {
    this.delSaveForm.prevCullingQty = value;
  };

  @action
  setPrevCullingWeight = (value) => {
    this.delSaveForm.prevCullingWeight = value;
  };

  @action
  setPrevHarvestQty = (value) => {
    this.delSaveForm.prevHarvestQty = value;
  };

  @action
  setPrevHarvestWeight = (value) => {
    this.delSaveForm.prevHarvestWeight = value;
  };

  @action
  setFormDeliverUpdate = (data) => {
    console.log(data);
    this.setOrderNo(data[0].sOrderNo);
    this.setCustomerCode(data[0].customerCode);
    this.setCustomerName(data[0].customerName);
    this.setCullingQty(data[0].cullingQty);
    this.setCullingWeight(data[0].cullingWeight);
    this.setHarvestQty(data[0].harvestQty);
    this.setHarvestWeight(data[0].harvestWeight);
    this.setTruckNo(data[0].truckNo);
    this.setRemarks(data[0].remarks);
    this.setWorkDate(data[0].workDate);
  };

  @action
  initSaveForm = () => {
    this.delSaveForm = {
      farmCode: '',
      projCode: '',
      workDate: '',
      sOrderNo: '',
      customerCode: '',
      customerName: '',
      cullingQty: 0,
      cullingWeight: 0,
      harvestQty: 0,
      harvestWeight: 0,
      truckNo: '',
      remarks: '',
    };
  };

  @action
  initSotre = () => {
    this.deliverList = []; // 고객이름
    this.initSaveForm();
    this.growLogListForDel = [];
    this.selectedGrowLogForDel = '';
  };
}

export default new MDeliverStore();
