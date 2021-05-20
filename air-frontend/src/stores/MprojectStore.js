import { observable, action, configure, computed } from 'mobx';
configure({ enforceActions: 'observed' });

/*
프로젝트 관련 Store 입니다.
추후 추가될 상태값들을 위해 구분하였습니다.
*/

class MprojectStore {
  constructor(root) {
    this.root = root;
  }

  @observable projectList = []; //프로젝트 리스트
  @observable selectedProject = ''; // 선택한 프로젝트
  @observable pageCount = 1; // 프로젝트 리스트 페이지 번호

  @action
  setProjectList = (value) => {
    this.projectList = value;
  };

  @action
  setSelectedProject = (value) => {
    this.selectedProject = value;
    sessionStorage.setItem('projCode', value.projCode);
    sessionStorage.setItem('broReceiveNo', value.broReceiveNo);
    sessionStorage.setItem('startDate', value.startDate);
    sessionStorage.setItem('ageDay', value.ageDay);
  };

  @action
  setPageCountProjectList = (value) => {
    this.pageCount = this.pageCount + 1;
  };

  @action
  initPageCountProjectList = (value) => {
    this.pageCount = 1;
  };

  @action
  initStore = () => {
    this.projectList = [];
    this.selectedProject = '';
    this.pageCount = 1;
  };
}

export default new MprojectStore();
