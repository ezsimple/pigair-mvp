import React, { Fragment } from 'react';
import NumberFormat from 'react-number-format';
import { TimePicker, Select, DatePicker, Input, Radio } from 'antd';
import { moment } from 'components';

export default class FormUtil {
  static formatNumber = (params) => {
    if (params.value && Number(params.value) !== 0) {
      return Math.floor(params.value)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else return '';
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
    if (_.isEmpty(params.type)) params.type = '';
    params.type = params.type.toUpperCase();

    let cl = params.className
      ? params.className
      : params.width
      ? 'input_base'
      : 'input_base w100';
    let ww = params.width ? params.width : '30';

    if (params.type && params.type === 'N') {
      return (
        <NumberFormat
          name={params.inputName}
          className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            textAlign: 'right',
          }}
          disabled={params.disabled ? params.disabled : false}
          thousandSeparator={true}
          maxLength={params.maxLength ? params.maxLength : 20}
          allowNegative={params.minVal === 0 ? false : true}
          decimalScale={params.dec ? params.dec : 0}
          name={params.inputName}
          getInputRef={(el) => (params.that[params.inputName] = el)}
          value={
            params.value
              ? params.value
              : params.form[params.inputName] == 0 ||
                params.form[params.inputName]
              ? params.form[params.inputName] || ''
              : 0
          }
          onChange={(e) => params.onChange(e, params)}
          onFocus={(e) => {
            e.target.select();
          }}
          readOnly={params.readOnly ? params.readOnly : false}
        />
      );
    }

    if (params.type && params.type === 'T') {
      return (
        <TimePicker
          //defaultValue={moment('12:08', 'HH:mm')}
          name={params.inputName}
          className={cl}
          style={{ width: params.width ? params.width + 'px' : null }}
          format={'HH:mm'}
          placeholder={params.placeholder}
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          value={
            params.value
              ? moment(params.value)
              : params.form[params.inputName]
              ? moment(params.form[params.inputName], 'HH:mm') || ''
              : null
          }
          onChange={(date, dateString) => params.onChange(dateString, params)}
          readOnly={params.readOnly ? params.readOnly : false}
          // onFocus={e => {
          //   e.target.select();
          // }}
        />
      );
    }

    if (params.type && params.type === 'D') {
      return (
        <DatePicker
          name={params.inputName}
          //className={cl}
          style={{ width: params.width ? params.width + 'px' : null }}
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          value={
            params.form[params.inputName]
              ? moment(params.form[params.inputName])
              : null
          }
          onChange={(date, dateString) => params.onChange(dateString, params)}
          // onFocus={e => {
          //   e.target.select();
          // }}
          placeholder={params.placeholder}
          allowClear={false}
          readOnly={params.readOnly ? params.readOnly : false}
        />
      );
    }

    if (params.type && params.type === 'SELECT') {
      return (
        <Select
          name={params.inputName}
          showSearch
          disabled={params.disabled ? params.disabled : false}
          value={params.value ? params.value : params.form[params.inputName]}
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
          onChange={(value) => params.onChange(value, params)}
          ref={(select) => {
            params.that[params.inputName] = select;
          }}
          readOnly={params.readOnly ? params.readOnly : false}
        >
          {params.options}
        </Select>
      );
    }

    if (params.type && params.type === 'S') {
      // console.log(
      //   params.value,
      //   params.inputName,
      //   params.form[params.inputName],
      //   params.form[params.inputName] ? 'true' : 'false',
      //   _.isEmpty(params.form[params.inputName])
      // );
      return (
        <Input
          name={params.inputName}
          type="text"
          disabled={true}
          className={cl}
          style={{
            width: params.width ? params.width + 'px' : null,
            textAlign: params.textAlign ? params.textAlign : null,
          }}
          value={
            params.value
              ? params.value
              : params.form[params.inputName] == 0 ||
                params.form[params.inputName]
              ? params.form[params.inputName]
              : ''
          }
          readOnly={params.readOnly ? params.readOnly : false}
        />
      );
    }

    if (params.type && params.type === 'YN') {
      return (
        <Radio.Group
          disabled={params.disabled ? params.disabled : false}
          name={params.inputName}
          value={params.value ? params.value : 'N'}
          onChange={(e) => params.onChange(e, params)}
        >
          <Radio value={'Y'}>Y</Radio>
          <Radio value={'N'}>N</Radio>
        </Radio.Group>
      );
    }

    {
      // ------------------------------------------------------
      // DEFAULT render Input
      // ------------------------------------------------------
      return (
        <Input
          type={params.type ? params.type : 'text'}
          disabled={params.disabled ? params.disabled : false}
          name={params.inputName}
          className={cl}
          style={{ width: params.width ? params.width + 'px' : null }}
          maxLength={params.maxLength ? params.maxLength : 20}
          //ref={params.that[params.inputName]}
          ref={(input) => {
            params.that[params.inputName] = input;
          }}
          value={
            params.value
              ? params.value
              : params.form[params.inputName] == 0 ||
                params.form[params.inputName]
              ? params.form[params.inputName] || ''
              : ''
          }
          onChange={(e) => params.onChange(e, params)}
          onKeyDown={(e) =>
            params.setOnKeydown ? params.setOnKeydown(e) : null
          }
          onFocus={(e) => {
            e.target.select();
          }}
          readOnly={params.readOnly ? params.readOnly : false}
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
        //     : params.form[params.inputName]
        //     ? params.form[params.inputName] || ''
        //     : null
        // }
        //onChange={e => params.onChange(e, params)}
      />
    );
  };
}
