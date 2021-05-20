import React, { Fragment } from 'react';
import { message, DatePicker, Select } from 'antd';
import { SessionUtil, DateUtil } from 'utils';
import axios from 'axios';
import qs from 'qs';
import { Const, Server } from 'components/Properties';
import querystring from 'querystring';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(val, callback) {
  // ------------------------------------------------
  // 동시 호출시 마지막 axios만 수행하는 문제점 보완.
  // ------------------------------------------------
  // if (timeout) {
  //   clearTimeout(timeout);
  //   timeout = null;
  // }
  // ------------------------------------------------
  currentValue = val.value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: val.value.toUpperCase(),
    });

    let data = {};
    let that = this;
    //data.farmCode = SessionUtil.getFarmCode();
    data.dateFormat = SessionUtil.getDateFormat();

    let url = Server.getRestAPI();
    switch (val.inputParam) {
      case 'farmCode':
        if (val.value.length > 1) {
          data.farmCode = val.value.toUpperCase();
          url = url + '/system/searchTcFarmInfo.do';
        } else return;
        break;

      case 'customerCode':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        data.customerName = val.value;
        url = url + '/breed/release/selectCustomerList.do';
        break;

      case 'division':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        data.division = val.value.toUpperCase();
        url = url + '/system/selectTcDivision.do';
        break;

      case 'region':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        if (!val.pValue0) return;
        data.division = val.pValue0.toUpperCase();
        data.region = val.value.toUpperCase();
        url = url + '/system/selectTcRegion.do';
        break;

      case 'subRegion':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        if (!val.pValue0 || !val.pValue1) return;
        data.division = val.pValue0.toUpperCase();
        data.region = val.pValue1.toUpperCase();
        data.subRegion = val.value.toUpperCase();
        url = url + '/system/selectTcSubRegion.do';
        break;

      case 'hatcheryId':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        data.hatcheryId = val.value.toUpperCase();
        url = url + '/system/selectTcHatcheryInfo.do';
        break;

      case 'materialCode':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        if (!val.pValue0) return;
        data.materialType = val.pValue0;
        data.materialCode = val.value;
        url = url + '/basis/selectTcMaterialCode.do';
        break;

      case 'projectCode':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        data.projCode = val.value.toUpperCase();
        url = url + '/report/searchTbProjectInfo.do';
        break;

      case 'flockId':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        if (!val.pValue0) return;
        data.farmCode = val.pValue0;
        data.flockId = val.value;
        url = url + '/report/searchTpFlockInfo.do';
        break;

      case 'hhId':
        if (
          val.value.length < Number(val.inputMinLen > 0 ? val.inputMinLen : 0)
        )
          return;
        if (!val.pValue0) return; // farmCode가 없으면
        // if (!val.pValue1) return; // flockId가 없으면
        data.farmCode = val.pValue0;
        // data.flockId = val.pValue1;
        data.hhId = val.value;
        url = url + '/report/searchTcBreedHhInfo.do';
        break;

      default:
        return;
    }

    axios({
      method: 'post',
      url: url,
      data: qs.stringify(data),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        const result = response.data.rows1;
        const data = [];
        switch (val.inputParam) {
          case 'farmCode':
            result.forEach((r) => {
              data.push({
                value: r.farmCode,
                text: r.farmInfo,
              });
            });
            break;

          case 'customerCode':
            result.forEach((r) => {
              data.push({
                value: r.customerCode,
                text: r.customerName,
              });
            });
            break;

          case 'division':
            result.forEach((r) => {
              data.push({
                value: r.division,
                text: r.divisionInfo,
              });
            });
            break;

          case 'region':
            result.forEach((r) => {
              data.push({
                value: r.region,
                text: r.regionInfo,
              });
            });
            break;

          case 'subRegion':
            result.forEach((r) => {
              data.push({
                value: r.subRegion,
                text: r.subRegionInfo,
              });
            });
            break;

          case 'hatcheryId':
            result.forEach((r) => {
              data.push({
                value: r.hatcheryId,
                text: r.hatcheryInfo,
              });
            });
            break;

          case 'materialCode':
            result.forEach((r) => {
              data.push({
                value: r.materialCode,
                text: r.materialInfo,
              });
            });
            break;

          case 'projectCode':
            result.forEach((r) => {
              data.push({
                value: r.projCode,
                text: r.projInfo,
              });
            });
            break;

          case 'flockId':
            result.forEach((r) => {
              data.push({
                value: r.flockId,
                text: r.flockInfo,
              });
            });
            break;

          case 'hhId':
            result.forEach((r) => {
              data.push({
                value: r.hhId,
                text: r.hhInfo,
              });
            });
            break;
        }

        callback(data);
      })
      .catch(function (error) {
        return [];
      });
  }

  // 동시 호출시 마지막 axios만 수행하는 문제점 보완.
  // timeout = setTimeout(fake, 300);
  fake();
}

export default class SearchInput extends React.Component {
  state = {
    data: [],
    value: undefined,
  };

  componentDidMount() {
    // this[this.props.inputParam] = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.handleSearch(this.props.defaultValue);
    }
    if (prevProps.isProjDisabled !== this.props.isProjDisabled) {
      this.setState({ value: undefined });
    }
  }

  handleSearch = (value) => {
    if (value) {
      let val = {};
      val.value = value;
      val.defaultValue = this.props.defaultValue;
      val.inputParam = this.props.inputParam;
      val.farmClass = this.props.farmClass;
      val.inputMinLen = this.props.inputMinLen;
      val.pValue0 = this.props.pValue0;
      val.pValue1 = this.props.pValue1;
      fetch(val, (data) => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };

  handleChange = (value) => {
    this.setState({ value: value });
    this.props.getValue(value);
  };

  render() {
    const options = this.state.data.map((d) => (
      <Select.Option key={d.value}>{d.text}</Select.Option>
    ));
    return (
      <Select
        showSearch
        // pValue={this.props.pValue} // parent value (division, region, subRegion )
        // value={this.state.value ? this.state.value : null} // null 때문에 placeholder 가 안나옴
        value={this.props.defaultValue}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={true}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
        optionFilterProp="children"
        ref={(select) => {
          this.props.that[this.props.inputName] = select;
        }}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        disabled={this.props.isDisabled}
      >
        {options}
      </Select>
    );
  }
}
