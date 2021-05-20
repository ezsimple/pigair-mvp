import SessionUtil from 'utils/SessionUtil';
import { moment } from 'components';
import i18n from 'i18next';

function fnDetectLang() {
  const lang = SessionUtil.getLang() || 'ko';
  if (lang === 'ko') moment.locale('ko'); // 한국
  if (lang === 'en') moment.locale('en'); // 미국
  if (lang === 'vn') moment.locale('vi'); // 베트남
  if (lang === 'id') moment.locale('id'); // 인도네시아
  // if (lang === 'kh') moment.locale('km'); // 캄보디아
  // if (lang === 'mm') moment.locale('my'); // 미얀마
  i18n.changeLanguage(lang);
}

export { fnDetectLang };
