import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { TimePicker, Select, DatePicker, Input } from 'antd';
import TimeField from 'react-simple-timefield';
import { moment } from 'components';

export default class GridUtil {
  /* 종계, 육계 리포트용 숫자포맷, 없음:"-", 천단위 쉼표 표시 */
  static formatReport = (params) => {
    const { value } = params;
    if (!value) return '-';
    if (isNaN(parseFloat(value)) || !isFinite(value)) return;
    else if (value && Number(value) !== 0) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };

  static formatNumber = (params) => {
    const { value } = params;
    if (!value) return 0;
    if (isNaN(parseFloat(value)) || !isFinite(value)) return;
    else if (value && Number(value) !== 0) {
      return Math.floor(value)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  };

  static formatNumberDec = (params) => {
    if (!params.value) return 0;
    var parts = params.value.toString().split('.');
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
      (parts[1] ? '.' + parts[1] : '')
    );

    // var obj = params.value;
    // console.log('sssssssssss', obj);
    // var regx = new RegExp(/(-?\d+)(\d{3})/);
    // var bExists = obj.indexOf('.', 0); //0번째부터 .을 찾는다.
    // var strArr = obj.split('.');
    // while (regx.test(strArr[0])) {
    //   //문자열에 정규식 특수문자가 포함되어 있는지 체크
    //   //정수 부분에만 콤마 달기
    //   strArr[0] = strArr[0].replace(regx, '$1,$2'); //콤마추가하기
    // }
    // if (bExists > -1) {
    //   //. 소수점 문자열이 발견되지 않을 경우 -1 반환
    //   obj = strArr[0] + '.' + strArr[1];
    // } else {
    //   //정수만 있을경우 //소수점 문자열 존재하면 양수 반환
    //   obj = strArr[0];
    // }
    // return obj; //문자열 반환
  };

  static getRowHeight = (params) => {
    if (params.node.level === 0) {
      return 33;
    } else {
      return 33;
    }
  };
  static getEditCell = (op, w) => {
    let h = 33;
    if (op === 'E') {
      // edit
      return {
        textAlign: 'right',
        backgroundColor: '#fff',
        border: '1px solid #15A897',
        //margin: '1px',
        height: h - 3 + 'px',
        width: w ? w - 2 + 'px' : null,
      };
    } else if (op === 'P') {
      //protect
      return {
        textAlign: 'right',
        backgroundColor: '#F4F9FF',
        height: h + 'px',
        width: w ? w + 'px' : null,
      };
    } else if (op === 'D') {
      //display only
      return {
        textAlign: 'right',
        backgroundColor: '#EAF0F7',
        height: h + 'px',
        width: w ? w + 'px' : null,
      };
    }
  };

  static renderInput = (params) => {
    // inputName: 'closingQtyF',//***
    // type: 'N',               //***
    // dec: 0,                  // type:'N'
    // width: 100,              // px제외
    // maxLength: 0,            // type:'' type:'N' 자릿수
    // maxVal: 0,               // type:'N' 최대값
    // options: 0,              // type:'SELECT' options
    // statsForm: this.state.growingForm,     //***
    // setOnChange: this.setOnChange,         //***
    // setOnChangeTime: this.setOnChangeTime  //*** type:'D'

    params.type = params.type.toUpperCase();
    //console.log('params', params);
    let cl = params.width ? 'input_base' : 'input_base w100';
    let ww = params.width ? params.width : '30';
    let backgroundColor = params.disabled ? '#f5f5f5' : '#fff';
    if (params.type && params.type === 'N') {
      //cl = params.width ? 'input_base w' + params.width : 'input_base';

      return (
        <NumberFormat
          className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            height: params.height ? params.height + 'px' : null,
            textAlign: 'right',
            backgroundColor: backgroundColor,
          }}
          disabled={params.disabled ? params.disabled : false}
          thousandSeparator={true}
          maxLength={params.maxLength ? params.maxLength : null}
          allowNegative={params.minVal === 0 ? false : true}
          decimalScale={params.dec ? params.dec : 0}
          name={params.inputName}
          getInputRef={(el) => (params.that[params.inputName] = el)}
          value={
            params.value
              ? params.value
              : params.statsForm[params.inputName]
              ? params.statsForm[params.inputName] || ''
              : 0
          }
          onChange={(e) => params.setOnChange(e, params)}
          onFocus={(e) => {
            e.target.select();
          }}
        />
      );
    } else if (params.type && params.type === 'TM') {
      return (
        <TimeField
          className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            backgroundColor: backgroundColor,
          }}
          value={
            params.value
              ? params.value
              : params.statsForm[params.inputName]
              ? params.statsForm[params.inputName]
              : ''
          } //onChange={(event, value) => {...}} // {Function} required
          //input={<MyCustomInputElement />} // {Element}  default: <input type="text" />
          disabled={params.disabled ? params.disabled : false}
          colon=":" // {String}   default: ":"
          //showSeconds // {Boolean}  default: false
          onChange={(date, timeString) =>
            params.setOnChange(timeString, params)
          }
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          onFocus={(e) => {
            e.target.select();
          }}
        />
      );
    } else if (params.type && params.type === 'T') {
      return (
        <TimePicker
          //defaultValue={moment('12:08', 'HH:mm')}
          className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            backgroundColor: backgroundColor,
          }}
          format={'HH:mm'}
          placeholder={params.placeholder}
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          value={
            params.value
              ? moment(params.value)
              : params.statsForm[params.inputName]
              ? moment(params.statsForm[params.inputName], 'HH:mm') || ''
              : null
          }
          onChange={(date, dateString) =>
            params.setOnChange(dateString, params)
          }
          // onFocus={e => {
          //   e.target.select();
          // }}
        />
      );
    } else if (params.type && params.type === 'D') {
      return (
        <DatePicker
          name={params.inputName}
          //className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            backgroundColor: backgroundColor,
          }}
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          value={
            params.statsForm[params.inputName]
              ? moment(params.statsForm[params.inputName])
              : null
          }
          onChange={(date, dateString) =>
            params.setOnChange(dateString, params)
          }
          // onFocus={e => {
          //   e.target.select();
          // }}
          disabled={params.disabled ? params.disabled : false}
          placeholder={params.placeholder}
          allowClear={false}
          disabledDate={params.disabledDate}
        />
      );
    } else if (params.type && params.type === 'SELECT') {
      return (
        <Select
          showSearch
          disabled={params.disabled ? params.disabled : false}
          value={
            params.value ? params.value : params.statsForm[params.inputName]
          }
          placeholder={params.placeholder}
          style={{
            width: params.width ? params.width + 'px' : '100%',
          }}
          defaultActiveFirstOption={false}
          showArrow={true}
          //filterOption={false}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          optionFilterProp="children"
          //onSearch={this.handleSearch}
          onChange={(value) => params.setOnChange(value, params)}
          ref={(select) => {
            params.that[params.inputName] = select;
          }}
        >
          {params.options}
        </Select>
      );
    } else if (params.type && params.type === 'S') {
      return (
        <Input
          type="text"
          disabled={true}
          className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            textAlign: params.textAlign ? params.textAlign : null,
          }}
          value={params.value ? params.value : ''}
        />
      );
    } else {
      return (
        <Input
          type={params.type || params.type !== '' ? params.type : 'text'}
          disabled={params.disabled ? params.disabled : false}
          name={params.inputName}
          className={cl}
          style={{ width: params.width ? params.width + 'px' : null }}
          maxLength={params.maxLength ? params.maxLength : null}
          //ref={params.that[params.inputName]}
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          value={
            params.value
              ? params.value
              : params.statsForm[params.inputName]
              ? params.statsForm[params.inputName] || ''
              : ''
          }
          onChange={(e) => params.setOnChange(e, params)}
          onKeyDown={(e) =>
            params.setOnKeydown ? params.setOnKeydown(e) : null
          }
          onFocus={(e) => {
            e.target.select();
          }}
        />
      );
    }
  };

  // static fnOnKeyDown = (e, params) => {
  //   if (e.key === 'Enter') {
  //     console.log(e);

  //     var event = document.createEvent('Events');
  //     event.initEvent('keydown', true, true);
  //     event.keyCode = 9;
  //     params.that[params.inputName].dispatchEvent(event);
  //     //document.getElementById('pOrderNo').dispatchEvent(event);
  //   }
  // };
  static NumberInput = (params) => {
    //params.type = params.type.toUpperCase();
    //console.log('params', params);
    let cl = params.width ? 'input_base' : 'input_base w100';
    let ww = params.width ? params.width : '30';
    return (
      <NumberFormat
        className={cl}
        style={{
          width: params.width ? params.width + 'px' : null,
          textAlign: 'right',
        }}
        thousandSeparator={true}
        maxLength={params.maxLength ? params.maxLength : null}
        decimalScale={params.dec ? params.dec : 0}
        name={params.inputName}
        //getInputRef={el => (params.that[params.inputName] = el)}
        // value={
        //   params.value
        //     ? params.value
        //     : params.statsForm[params.inputName]
        //     ? params.statsForm[params.inputName] || ''
        //     : null
        // }
        //onChange={e => params.setOnChange(e, params)}
      />
    );
  };
}
