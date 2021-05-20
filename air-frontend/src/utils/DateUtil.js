import moment from 'moment-timezone';
import { SessionUtil } from 'utils';

class DateUtil {
  static getOracleDateFormat = () => {
    // moment 에서는 yyyy-MM-dd가 아닌 모두 대문자 이어야만 합니다.
    return 'YYYY-MM-DD';
  };

  static toFormat = datetime => {
    if (!datetime) return '';
    return moment(datetime).format(DateUtil.getOracleDateFormat());
  };

  static toDateFormat = datetime => {
    if (!datetime) return undefined;
    return moment(datetime).format(SessionUtil.getDateFormat());
  };

  static toDateTimeFormat = datetime => {
    if (!datetime) return '';
    const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
    return moment(datetime).format(datetimeFormat);
  };

  // 타임존에 따른 현재 시간 구하기
  // SingleDatePicker.props.displayFormat='YYYY-MM-DD'로
  // 변경해야만 합니다. moment의
  static now = (date = null) => {
    const timezone = 'Asia/Seoul';
    // const datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
    const now = date
      ? moment(new Date(date)).tz(timezone)
      : moment().tz(timezone);
    return now;
  };

  static toDateTimeString = (date = null) => {
    const timezone = 'Asia/Seoul';
    const now = date
      ? this.toDateTimeFormat(date).toString()
      : this.toDateTimeFormat(moment().tz(timezone)).toString();
    return now;
  };

  static toPostfixDateTimeString = (date = null) => {
    return DateUtil.toDateTimeString(date)
      .replace(/-/gi, '_')
      .replace(/ /gi, '_');
  };

  static now2 = (date = '') => {
    const timezone = 'Asia/Seoul';
    const now = date !== '' ? moment(new Date(date)).tz(timezone) : null;
    return now;
  };

  static today = (date = null, timezone = 'Asia/Seoul') => {
    const datetimeFormat = 'YYYY-MM-DD';
    const now = date
      ? moment(new Date(date))
          .tz(timezone)
          .format(datetimeFormat)
      : moment()
          .tz(timezone)
          .format(datetimeFormat);
    return now;
  };
}

export default DateUtil;
