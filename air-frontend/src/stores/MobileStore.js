import { observable, action, configure, computed } from 'mobx';
import { SessionUtil } from 'utils';
configure({ enforceActions: 'observed' });

/*
모바일 버전 공통 Store 입니다.
공통적으로 쓰이는 상태값 또는 로그인 관련 상태값을 관리합니다.
*/
class MobileStore {
  constructor(root) {
    this.root = root;
  }

  @observable headerYn = false; //글로벌 헤더 사용여부
  @observable popupStep = false; // 입력단계 상태관리 : 입력폼의 헤더 구분을 위한 상태관리

  @observable logined = false; // 로그인 여부
  @observable autoLogin = false; //자동 로그인 여부
  @observable userId = ''; // 사용자아이디
  @observable userPw = ''; //사용자 비밀번호
  @observable pplYn = false; // 사용자 PPL 여부
  @observable titleIcon = ''; // 글로벌 헤더 메뉴 타이틀 아이콘
  @observable title = ''; // 글로벌 헤더 메뉴 타이틀 제목
  @observable farmCode = ''; // 로그인된 사용자 FarmCode

  @observable rcvSelectModalShow = false; // Receive 종류 선택 모달 on/off

  // 모달 on/off |
  // cate [S: 검색, A:알림, C:확인] --->Modal 형태
  //type [S: 저장(save), D: 삭제(delete), B:뒤로가기(back), LO:로그아웃]---> 확인 모달 타입
  @observable modalFlag = {
    onoff: false,
    cate: '',
    type: '',
    msg: '',
    params: '',
  };

  @observable searchResultList = []; //검색결과 리스트

  //검색 타입  S: strain  / C: Customer / F:Feed, / V: Vaccine,
  // M: Medicine / TM: Total Material
  @observable searchType = '';
  @observable searchKey = ''; // 검색어
  @observable searchRowCnt = 0; //검색단위 갯수
  @observable searchTotal = 0; // 검색 전체량
  @observable searchPageNo = 1; // 검색 페이징

  @observable menuName = ''; // Footer navigation 선택된 메뉴
  @observable iuFlag = 'I'; // inser& update Flag

  @observable dynamicInputNo = 1; // 검색창 동적 입력을 위한 구분 번호

  @observable appYn = 'N'; // App 여부 확인

  @action
  isMobile = () => {
    return SessionUtil.isMobile();
  };

  @action
  setLogined = () => {
    this.logined = !this.logined;
  };

  @action
  setAutoLogin = () => {
    this.autoLogin = !this.autoLogin;
  };

  @action
  setUserId = (value) => {
    this.userId = value;
  };

  @action
  setUserPw = (value) => {
    this.userPw = value;
  };

  @action
  setPplYn = () => {
    this.pplYn = !this.pplYn;
  };

  @action
  setTitleIcon = (value) => {
    this.titleIcon = value;
    sessionStorage.setItem('titleIcon', value);
  };

  @action
  setTitle = (value) => {
    this.title = value;
    sessionStorage.setItem('title', value);
  };

  @action
  setFarmCode = (value) => {
    this.farmCode = value;
  };

  @action
  setRcvSelectModalOpen = () => {
    this.rcvSelectModalShow = true;
  };
  @action
  setRcvSelectModalClose = () => {
    this.rcvSelectModalShow = false;
  };

  @action
  setPopupStepNextTrue = () => {
    this.popupStep = true;
    sessionStorage.setItem('popupStep', true);
  };

  @action
  setPopupStepNextFalse = () => {
    this.popupStep = false;
    sessionStorage.setItem('popupStep', false);
  };

  @action
  setModalOpen = (cate, type, msg, params) => {
    this.modalFlag = {
      onoff: true,
      cate: cate,
      type: type,
      msg: msg,
      params: params,
    };
  };

  @action
  setModalClose = () => {
    this.modalFlag = { onoff: false, cate: '', type: '', msg: '', params: '' };
  };

  @action
  setSearchResultList = (value) => {
    this.searchResultList = value;
  };

  @action
  setSearchType = (value) => {
    this.searchType = value;
    sessionStorage.setItem('searchType', value);
  };

  @action
  setMenuName = (value) => {
    this.menuName = value;
    sessionStorage.setItem('menuName', value);
  };

  @action
  setIuFlagUpdate = () => {
    this.iuFlag = 'U';
    sessionStorage.setItem('iuFlag', 'U');
  };

  @action
  setIuFlagInsert = () => {
    this.iuFlag = 'I';
    sessionStorage.setItem('iuFlag', 'I');
  };

  @action
  setSearchKey = (value) => {
    this.searchKey = value;
  };

  @action
  setSearchTotal = (value) => {
    this.searchTotal = value;
  };

  @action
  setSearchRowCnt = (value) => {
    this.searchRowCnt = value;
  };

  @action
  setSearchPageNo = (value) => {
    this.searchPageNo = value;
  };

  @action
  setSdynamicInputNo = (value) => {
    this.dynamicInputNo = value;
  };

  @action
  setAppYn_Y = () => {
    this.appYn = 'Y';
  };

  @action
  setAppYn_N = () => {
    this.appYn = 'N';
  };

  @action
  initStore = () => {
    this.popupStep = false; // 입력단계 여부
    this.confirmModalShow = { onoff: false, cate: '', type: '', msg: '' }; // 확인 모달 on/off |  type [S: 저장(save), D: 삭제(delete), B:뒤로가기(back)]
    this.searchResultList = []; //검색결과 리스트
    this.searchType = ''; //검색 타입  S: strain  / C: Customer /
    this.searchKey = ''; // 검색어
    this.searchRowCnt = 0;
    this.searchTotal = 0;
    this.searchPageNo = 1;
    this.menuName = ''; // Footer navigation 선택된 메뉴
    this.iuFlag = 'I'; // inser& update Flag
    this.dynamicInputNo = 1;
  };
}

export default new MobileStore();
