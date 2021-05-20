import DateUtil from './DateUtil';

// ==========================================
// 양위원님 세션의 정보가 필요한 부분을
// 일단 메소드로 정의해서 사용했으면 합니다.
// ==========================================
class SessionUtil {
  static isLogined = () => {
    const flag = sessionStorage.getItem('isLogined') || false;
    return JSON.parse(flag); // isLogined is true/false String
  };
  static getFarmCode = () => {
    // const farmNo = sessionStorage.getItem('farmNo');
    const farmCode = sessionStorage.getItem('farmCode');
    return farmCode;
  };
  static getFarmClass = () => {
    return sessionStorage.getItem('farmClass');
  };
  static getFarmNm = () => {
    const farmNm = sessionStorage.getItem('farmName');
    return farmNm;
  };
  static getFarmInfo = () => {
    const farmNm = SessionUtil.getFarmNm();
    const farmCode = SessionUtil.getFarmNm();
    if (!farmCode) return;
    return farmNm + '(' + farmCode + ')';
  };
  static getHatcheryId = () => {
    const hatcheryId = sessionStorage.getItem('hatcheryId');
    return hatcheryId;
  };
  static getLang = () => {
    const defaultLang = 'en';
    let lang = (localStorage.getItem('lang') || defaultLang).toLowerCase();
    if (!(lang === 'id' || lang === 'vn' || lang == 'en' || lang == 'ko'))
      lang = defaultLang;
    return lang;
  };
  static isPpl = () => {
    const isPpl = JSON.parse(sessionStorage.getItem('isPpl')); // isPpl is true/false String
    return isPpl;
  };
  static isBroiler = () => {
    const groupId = sessionStorage.getItem('groupId');
    return groupId === 'BROILER';
  };

  // --------------------------------------------
  // 국가별 local Timezone 정보를 가져옵니다.
  // --------------------------------------------
  static getTz = () => {
    const tz = sessionStorage.getItem('tz');
    return tz;
  };

  static getDateFormat = () => {
    // const dateFormat = DateUtil.getOracleDateFormat();
    const dateFormat = sessionStorage.getItem('dateFormat') || '';
    // console.log('dateFormat : ', dateFormat);
    return dateFormat.toUpperCase(); // moment 에서는 대문자 이어야 함.
  };

  // 로컬에서 표시용
  static getDatetimeFormat = () => {
    // const dateFormat = DateUtil.getOracleDateFormat();
    const datetimeFormat = SessionUtil.getDateFormat() + ' HH:mm:ss';
    // console.log('datetimeFormat : ', datetimeFormat);
    return datetimeFormat;
  };

  static getUserId = () => {
    const userId = sessionStorage.getItem('userId');
    // console.log('userId : ', userId);
    return userId;
  };
  static getUserNm = () => {
    const userNm = sessionStorage.getItem('userNm');
    return userNm;
  };
  static getUserLevel = () => {
    const userLevel = sessionStorage.getItem('userLevel');
    return userLevel;
  };
  static getUserLevelNm = () => {
    const userLevelNm = sessionStorage.getItem('userLevelNm');
    return userLevelNm;
  };
  static getGroupId = () => {
    const groupId = sessionStorage.getItem('groupId');
    return groupId;
  };
  static getCountryCode = () => {
    const countryCode = sessionStorage.getItem('countryCode');
    // console.log('countryCode : ', countryCode);
    return countryCode || '01';
  };
  static setExpire = () => {
    return sessionStorage.clear();
  };
  static isMobile = () => {
    const flag = sessionStorage.getItem('isMobile') || 'N';
    return flag === 'Y' ? flag : 'N';
  };

  // static getEqIds = () => {
  //   // JSON Object 배열을 LocalStorage & SessionStorage에서 가져하기
  //   const eqIds = JSON.parse(sessionStorage.getItem('eqIds'));
  //   return eqIds;
  // };

  static getProjCode = () => {
    const projCode = sessionStorage.getItem('projCode');
    return projCode;
  };
}

export default SessionUtil;
