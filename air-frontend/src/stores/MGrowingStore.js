import { observable, action, configure, computed } from 'mobx';
configure({ enforceActions: 'observed' });

/*
프로젝트 관련 Store 입니다.
추후 추가될 상태값들을 위해 구분하였습니다.
*/

class MGrowingStore {
  constructor(root) {
    this.root = root;
  }

  @observable growingList = []; //프로젝트 리스트
  @observable selectedGrowList = '';

  @observable latestWorkDate = 0;

  @observable growSaveForm = {
    farmCode: '',
    projCode: '',
    workDate: '',
    deathQty: 0,
    cullingQty: 0,
    bw: 0,
    uniformity: 0,
    remarks: '',
    feedRem: '',
    medicineRem: '',
    vaccineRem: '',
    veterinarian: '',
    growingRem: '',
    feedCode1: '',
    feedName1: '',
    feedUnit1: '',
    feedUseAmt1: 0,
    feedCode2: '',
    feedName2: '',
    feedUnit2: '',
    feedUseAmt2: 0,
    feedCode3: '',
    feedName3: '',
    feedUnit3: '',
    feedUseAmt3: 0,
    medicineCode1: '',
    medicineName1: '',
    medicineUnit1: '',
    medicineUseAmt1: 0,
    medicineCode2: '',
    medicineName2: '',
    medicineUnit2: '',
    medicineUseAmt2: 0,
    medicineCode3: '',
    medicineName3: '',
    medicineUnit3: '',
    medicineUseAmt3: 0,
    vaccineCode1: '',
    vaccineName1: '',
    vaccineUnit1: '',
    vaccineUseAmt1: 0,
    vaccineCode2: '',
    vaccineUnit2: '',
    vaccineName2: '',
    vaccineUseAmt2: 0,
    vaccineCode3: '',
    vaccineName3: '',
    vaccineUnit3: '',
    vaccineUseAmt3: 0,
    ompalQty: 0,
    weakQty: 0,
    abnormalQty: 0,
    claimQty: 0,
    drylegQty: 0,
  };

  @action
  setGrowingList = (value) => {
    this.growingList = value;
  };

  @action
  setSelectedGrowingList = (value) => {
    this.selectedGrowList = value;
  };

  @action
  setWorkDate = (value) => {
    this.growSaveForm.workDate = value;
  };

  @action
  setDeathQty = (value) => {
    this.growSaveForm.deathQty = value;
  };

  @action
  setCullingQty = () => {
    this.growSaveForm.cullingQty =
      Number(this.growSaveForm.ompalQty) +
      Number(this.growSaveForm.weakQty) +
      Number(this.growSaveForm.abnormalQty) +
      Number(this.growSaveForm.claimQty) +
      Number(this.growSaveForm.drylegQty);
  };

  @action
  setBw = (value) => {
    this.growSaveForm.bw = value;
  };

  @action
  setUniformity = (value) => {
    this.growSaveForm.uniformity = value;
  };

  @action
  setRemarks = (value) => {
    this.growSaveForm.growingRem = value;
  };
  ///////////////FEED/////////////////////////
  @action
  setFeedCode1 = (value) => {
    this.growSaveForm.feedCode1 = value;
  };

  @action
  setFeedName1 = (value) => {
    this.growSaveForm.feedName1 = value;
  };

  @action
  setFeedUnit1 = (value) => {
    this.growSaveForm.feedUnit1 = value;
  };

  @action
  setFeedUseAmt1 = (value) => {
    this.growSaveForm.feedUseAmt1 = value;
  };

  @action
  setFeedCode2 = (value) => {
    this.growSaveForm.feedCode2 = value;
  };

  @action
  setFeedName2 = (value) => {
    this.growSaveForm.feedName2 = value;
  };

  @action
  setFeedUnit2 = (value) => {
    this.growSaveForm.feedUnit2 = value;
  };

  @action
  setFeedUseAmt2 = (value) => {
    this.growSaveForm.feedUseAmt2 = value;
  };

  @action
  setFeedCode3 = (value) => {
    this.growSaveForm.feedCode3 = value;
  };

  @action
  setFeedName3 = (value) => {
    this.growSaveForm.feedName3 = value;
  };

  @action
  setFeedUnit3 = (value) => {
    this.growSaveForm.feedUnit3 = value;
  };

  @action
  setFeedUseAmt3 = (value) => {
    this.growSaveForm.feedUseAmt3 = value;
  };
  ///////////////FEED/////////////////////////

  ///////////////Vaccine/////////////////////////@action
  @action
  setVaccineCode1 = (value) => {
    this.growSaveForm.vaccineCode1 = value;
  };

  @action
  setVaccineName1 = (value) => {
    this.growSaveForm.vaccineName1 = value;
  };

  @action
  setVaccineUnit1 = (value) => {
    this.growSaveForm.vaccineUnit1 = value;
  };

  @action
  setVaccineUseAmt1 = (value) => {
    this.growSaveForm.vaccineUseAmt1 = value;
  };
  @action
  setVaccineCode2 = (value) => {
    this.growSaveForm.vaccineCode2 = value;
  };

  @action
  setVaccineName2 = (value) => {
    this.growSaveForm.vaccineName2 = value;
  };

  @action
  setVaccineUnit2 = (value) => {
    this.growSaveForm.vaccineUnit2 = value;
  };

  @action
  setVaccineUseAmt2 = (value) => {
    this.growSaveForm.vaccineUseAmt2 = value;
  };
  @action
  setVaccineCode3 = (value) => {
    this.growSaveForm.vaccineCode3 = value;
  };

  @action
  setVaccineName3 = (value) => {
    this.growSaveForm.vaccineName3 = value;
  };

  @action
  setVaccineUnit3 = (value) => {
    this.growSaveForm.vaccineUnit3 = value;
  };

  @action
  setVaccineUseAmt3 = (value) => {
    this.growSaveForm.vaccineUseAmt3 = value;
  };

  ///////////////Vaccine/////////////////////////

  ///////////////Medicine/////////////////////////
  @action
  setMedicineCode1 = (value) => {
    this.growSaveForm.medicineCode1 = value;
  };

  @action
  setMedicineName1 = (value) => {
    this.growSaveForm.medicineName1 = value;
  };

  @action
  setMedicineUnit1 = (value) => {
    this.growSaveForm.medicineUnit1 = value;
  };

  @action
  setMedicineUseAmt1 = (value) => {
    this.growSaveForm.medicineUseAmt1 = value;
  };

  @action
  setMedicineCode2 = (value) => {
    this.growSaveForm.medicineCode2 = value;
  };

  @action
  setMedicineName2 = (value) => {
    this.growSaveForm.medicineName2 = value;
  };

  @action
  setMedicineUnit2 = (value) => {
    this.growSaveForm.medicineUnit2 = value;
  };

  @action
  setMedicineUseAmt2 = (value) => {
    this.growSaveForm.medicineUseAmt2 = value;
  };

  @action
  setMedicineCode3 = (value) => {
    this.growSaveForm.medicineCode3 = value;
  };

  @action
  setMedicineName3 = (value) => {
    this.growSaveForm.medicineName3 = value;
  };

  @action
  setMedicineUnit3 = (value) => {
    this.growSaveForm.medicineUnit3 = value;
  };

  @action
  setMedicineUseAmt3 = (value) => {
    this.growSaveForm.medicineUseAmt3 = value;
  };
  ///////////////Medicine/////////////////////////

  @action
  setVeterinarian = (value) => {
    this.growSaveForm.veterinarian = value;
  };

  @action
  setLatestWorkDate = (value) => {
    this.latestWorkDate = value;
  };

  @action
  setOmpalQty = (value) => {
    this.growSaveForm.ompalQty = value;
    this.setCullingQty();
  };

  @action
  setWeakQty = (value) => {
    this.growSaveForm.weakQty = value;
    this.setCullingQty();
  };

  @action
  setAbnormalQty = (value) => {
    this.growSaveForm.abnormalQty = value;
    this.setCullingQty();
  };

  @action
  setClaimQty = (value) => {
    this.growSaveForm.claimQty = value;
    this.setCullingQty();
  };

  @action
  setDrylegQty = (value) => {
    this.growSaveForm.drylegQty = value;
    this.setCullingQty();
  };

  @action
  initGrowSaveForm = () => {
    this.growSaveForm = {
      farmCode: '',
      projCode: '',
      workDate: '',
      deathQty: 0,
      cullingQty: 0,
      //bw: 0,
      uniformity: 0,
      remarks: '',
      feedRem: '',
      medicineRem: '',
      vaccineRem: '',
      veterinarian: '',
      growingRem: '',
      feedCode1: '',
      feedName1: '',
      feedUnit1: '',
      feedUseAmt1: 0,
      feedCode2: '',
      feedName2: '',
      feedUnit2: '',
      feedUseAmt2: 0,
      feedCode3: '',
      feedName3: '',
      feedUnit3: '',
      feedUseAmt3: 0,
      medicineCode1: '',
      medicineName1: '',
      medicineUnit1: '',
      medicineUseAmt1: 0,
      medicineCode2: '',
      medicineName2: '',
      medicineUnit2: '',
      medicineUseAmt2: 0,
      medicineCode3: '',
      medicineName3: '',
      medicineUnit3: '',
      medicineUseAmt3: 0,
      vaccineCode1: '',
      vaccineName1: '',
      vaccineUnit1: '',
      vaccineUseAmt1: 0,
      vaccineCode2: '',
      vaccineUnit2: '',
      vaccineName2: '',
      vaccineUseAmt2: 0,
      vaccineCode3: '',
      vaccineName3: '',
      vaccineUnit3: '',
      vaccineUseAmt3: 0,
      ompalQty: 0,
      weakQty: 0,
      abnormalQty: 0,
      claimQty: 0,
      drylegQty: 0,
    };
  };

  @action
  setFromGrowingUpdateCommonInfo = (data) => {
    this.setDeathQty(data.deathQty);
    this.setCullingQty(data.cullingQty);
    this.setBw(data.bw);
    this.setUniformity(data.uniformity);
    this.setRemarks(data.growingRem);
    this.setOmpalQty(data.ompalQty);
    this.setWeakQty(data.weakQty);
    this.setAbnormalQty(data.abnormalQty);
    this.setClaimQty(data.claimQty);
    this.setDrylegQty(data.dryLegQty);
    this.setVeterinarian(data.veterinarian);
  };

  @action
  setFromGrowingUpdateFeed = (data) => {
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        this.setFeedCode1(data[0].feedCode);
        this.setFeedName1(data[0].materialName);
        this.setFeedUnit1(data[0].unit);
        this.setFeedUseAmt1(data[0].useAmt);
      }

      if (i == 1) {
        this.setFeedCode2(data[1].feedCode);
        this.setFeedName2(data[1].materialName);
        this.setFeedUnit2(data[1].unit);
        this.setFeedUseAmt2(data[1].useAmt);
      }

      if (i == 2) {
        this.setFeedCode3(data[2].feedCode);
        this.setFeedName3(data[2].materialName);
        this.setFeedUnit3(data[2].unit);
        this.setFeedUseAmt3(data[2].useAmt);
      }
    }
  };

  @action
  setFromGrowingUpdateVaccine = (data) => {
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        this.setVaccineCode1(data[0].vaccineCode);
        this.setVaccineName1(data[0].materialName);
        this.setVaccineUnit1(data[0].unit);
        this.setVaccineUseAmt1(data[0].useAmt);
      }

      if (i == 1) {
        this.setVaccineCode2(data[1].vaccineCode);
        this.setVaccineName2(data[1].materialName);
        this.setVaccineUnit2(data[1].unit);
        this.setVaccineUseAmt2(data[1].useAmt);
      }

      if (i == 2) {
        this.setVaccineCode3(data[2].vaccineCode);
        this.setVaccineName3(data[2].materialName);
        this.setVaccineUnit3(data[2].unit);
        this.setVaccineUseAmt3(data[2].useAmt);
      }
    }
  };

  @action
  setFromGrowingUpdateMedicine = (data) => {
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        this.setMedicineCode1(data[0].medicineCode);
        this.setMedicineName1(data[0].materialName);
        this.setMedicineUnit1(data[0].unit);
        this.setMedicineUseAmt1(data[0].useAmt);
      }

      if (i == 1) {
        this.setMedicineCode2(data[1].medicineCode);
        this.setMedicineName2(data[1].materialName);
        this.setMedicineUnit2(data[1].unit);
        this.setMedicineUseAmt2(data[1].useAmt);
      }

      if (i == 2) {
        this.setMedicineCode3(data[2].medicineCode);
        this.setMedicineName3(data[2].materialName);
        this.setMedicineUnit3(data[2].unit);
        this.setMedicineUseAmt3(data[2].useAmt);
      }
    }
  };

  @action
  initStore = () => {
    this.latestWorkDate = 0;
    this.selectedGrowList = ''; // 선택된 입식정보
    this.growingList = []; // 입고 정보
    this.initGrowSaveForm();
  };
}

export default new MGrowingStore();
