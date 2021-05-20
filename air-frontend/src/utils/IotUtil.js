import { Server } from 'components/Properties';
import SessionUtil from 'utils/SessionUtil';

// AirBnB datepicker 사용
import axios from 'axios';
import { cloneDeep } from 'lodash';

// 변경불가 항목을 제외한 파라미터
function fnGetOptParam(config) {
  const param = cloneDeep(config);
  delete param.farmno;
  delete param.eq_type;
  delete param.cmd_type;
  delete param.icno;
  delete param.eqid;
  return param;
}

// --------------------------------------------------
// 집계 : 이유모돈 & 총사료 섭취량 & 평균사료 섭취량
// --------------------------------------------------
// config 에는 기본 정보가 저장되어 있습니다.
// 검색 인자를 json object 형태로 전달 받아야 합니다.
// --------------------------------------------------
async function fnGetSummaryInfo(config, searchObj) {
  const url = Server.getRestAPI() + '/getIotSummary.json';
  let param = {
    farmno: config.farmno,
    eq_type: config.eq_type,
    lang: SessionUtil.getLang(),
    date_format: SessionUtil.getDateFormat()
  };
  for (let key of Object.keys(searchObj)) {
    const value = searchObj[key];
    param[key] = value;
  }
  return axios({
    method: 'post',
    url: url,
    params: param
  });
}

// config 에는 기본 정보가 저장되어 있습니다.
// 검색 인자를 json object 형태로 전달 받아야 합니다.
function fnGetSettingList(config, searchObj) {
  const url = Server.getRestAPI() + '/getSettingList.json';
  const lang = SessionUtil.getLang();
  let param = {
    farmno: config.farmno,
    eq_type: config.eq_type,
    lang: SessionUtil.getLang(),
    date_format: SessionUtil.getDateFormat()
  };
  for (let key of Object.keys(searchObj)) {
    const value = searchObj[key];
    param[key] = value;
  }
  return axios({
    method: 'post',
    url: url,
    params: param
  });
}

function fnGetLastSetting(config) {
  const url = Server.getRestAPI() + '/getLastSetting.json';
  return axios({
    method: 'post',
    url: url,
    params: config
  });
  // ---------------------------------------------------------------------
  // 화두 : 공통 state를 가진 무언가 컴포넌트가필요하다면, HOC로 묶으세요.
  //        UI와 데이타의 분리 ...
  // ---------------------------------------------------------------------
  // .then(function(response) {
  //   const { data } = response;
  //   const setting = cloneDeep(config);
  //   for (var key of Object.keys(data)) {
  //     const value = data[key] != 'NULL' ? data[key] : '';
  //     setting[key] = value;
  //   }
  //   console.log('config : ', config);
  //   console.log('setting : ', setting);
  // });
  // ---------------------------------------------------------------------
}

// ----------------------------------------------------
// QR, PUSH 를 위한 라이브러리 연동 여부를 확인 합니다.
// 안드로이드, IOS 장치에 로딩 되어야 합니다.
// ----------------------------------------------------
function hasInterface() {
  return window['EZPigPlanInterface'] ? true : false;
}

export {
  fnGetSummaryInfo,
  fnGetLastSetting,
  fnGetSettingList,
  fnGetOptParam,
  hasInterface
};
