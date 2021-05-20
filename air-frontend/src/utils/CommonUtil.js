import { Server } from 'components/Properties';
import SessionUtil from 'utils/SessionUtil';

// AirBnB datepicker 사용
import axios from 'axios';
import qs from 'qs';
import produce from 'immer';

import { cloneDeep } from 'lodash';

export default class CommonUtil {
  // --------------------------------------------------
  // TC_CODE_DTL 코드값 가져오기
  // --------------------------------------------------
  static selectCodes = ({ masterCodeId }) => {
    const url = Server.getRestAPI() + '/system/selectCodes.do';
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify({ masterCodeId }),
      withCredentials: true,
      credentials: 'same-origin'
    });
  };

  // 주의 this.state.params : {} 가 존재해야 합니다.
  static setCode = (name, value) => {
    this.setState(
      produce(draft => {
        draft.params[name] = value;
      }),
      function() {
        console.log(this.state.params);
      }
    );
  };
}
