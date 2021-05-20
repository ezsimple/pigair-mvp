import { pickBy, identity } from 'lodash';

class ObjectUtil {
  // object에서 undefined 필드를 제거한 object를 얻는다.
  static getClearnedObject = (origObj) => {
    return pickBy(origObj, (v) => v !== undefined);
  };

  // 화면에서 폭을 퍼센트가 아닌 숫자로 구해야 하는 경우 사용
  static getScrollWidth = (className) => {
    // -60은 스크롤바 생성을 없앤다
    return document.getElementsByClassName(className)[0].scrollWidth - 60;
  };

  // pivot : 컬럼을 행으로 변경하는 기능
  static pivotBy = (columnKey, rowData) =>
    rowData.reduce((prev, cur) => {
      const value = cur[columnKey];
      prev.push(value);
      return prev;
    }, []);
}

export default ObjectUtil;
