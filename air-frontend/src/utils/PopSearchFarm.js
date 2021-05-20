import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SessionUtil, DateUtil, GridUtil } from 'utils';
import { Trans } from 'react-i18next';
import { Const, Server } from 'components/Properties';
import axios from 'axios';
import qs from 'qs';
import { moment } from 'components';
import i18n from 'i18next';
import { Select } from 'antd';
import NumberFormat from 'react-number-format';
import { AgGridReact } from 'components/commons/ag-grid/AgGridUtil';
/*
 ** PopSearchFarm
 **
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 */
class PopSearchFarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstance: this,
      popSearchFarmView: false,
      value: '',
      form: [
        {
          farmCode: '',
          farmName: '',
        },
      ],
      classList: [],
      rowData: [],
      columnDefs: [
        {
          headerName: '',
          field: 'ck',
          width: 70,
          cellStyle: { textAlign: 'center' },
          editable: true,
          cellRenderer: (params) => {
            return '<button class="btn_sel">' + i18n.t('선택') + '</button>';
          },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Farm Code',
          field: 'farmCode',
          width: 150,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Farm Name',
          field: 'farmName',
          width: 300,
          cellStyle: { textAlign: 'left' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Start Date',
          field: 'startDate',
          width: 100,
          cellStyle: { textAlign: 'left' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Class',
          field: 'farmClassName',
          width: 70,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Status',
          field: 'farmStatus',
          width: 70,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Division',
          field: 'division',
          width: 100,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Region',
          field: 'region',
          width: 100,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Sub Region',
          field: 'subRegion',
          width: 100,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
      ],
      defaultColDef: {
        filter: true,
        resizable: true,
        sortable: true,
        editable: false,
        suppressSizeToFit: false,
      },
    };
  }
  componentDidMount() {
    // 달력에 로케일 적용
    moment.locale(SessionUtil.getLang());
    this.fnInit(this.props);
    this['farmCode'] ? this['farmCode'].focus() : null;
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (
  //     prevState.popSearchFarmView !== nextProps.popSearchFarmView &&
  //     nextProps.popSearchFarmView
  //   ) {
  //     prevState.currentInstance.fnInit(nextProps);

  //     return {
  //       popSearchFarmView: nextProps.popSearchFarmView
  //     };
  //   }
  //   return null;
  // }

  fnInit = (nextProps) => {
    let that = this;
    let data = this.state.form;
    console.log(nextProps);
    data.countryCode = SessionUtil.getCountryCode();
    data.dateFormat = SessionUtil.getDateFormat();
    data.masterCodeId = 'EP16';

    const url = Server.getRestAPI();
    axios({
      method: 'post',
      url: url + '/breed/release/selectCodes.do',
      data: qs.stringify(data),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        that.setState(
          {
            classList: response.data.rows1,
            form: {
              ...that.state.form,
              ['farmCode']: nextProps.farmCode,
              ['farmClass']: nextProps.farmClass,
            },
          },
          function () {
            let { farmCode } = nextProps;
            // 검색코드 없이 검색시 700M 데이터 처리 발생. 부하 방지를 위해
            // 정책적으로 2자리 이상일 경우에만 검색도록 조치함
            if (farmCode && farmCode.length >= 2) {
              that.fnSearch();
            }
          }
        );
      })
      .catch(function (error) {
        return [];
      });
  };

  // CJ서버에서 파라미터 없이 요청시 한번에 700M 이상의 정보 조회로 DB Overhead 발생하고 있음
  // 이를 방지하기위해, 정책적으로 2자리 이상 입력시만 검색하도록 조치함
  // 2020.10.23
  fnCheck = () => {
    let { farmCode, farmName } = this.state.form;
    let minLength = 2;
    let msg = i18n.t('Please enter at least two characters.');

    if (!farmCode && !farmName) {
      this.props.alert.error(msg);
      return false;
    }

    if (farmCode && farmCode.length < minLength) {
      this.props.alert.error(msg);
      return false;
    }

    if (farmName && farmName.length < minLength) {
      this.props.alert.error(msg);
      return false;
    }

    return true;
  };

  fnSearch = () => {
    let that = this;
    let data = this.state.form;

    data.countryCode = SessionUtil.getCountryCode();
    data.dateFormat = SessionUtil.getDateFormat();

    if (!this.fnCheck()) {
      return;
    }

    const url = Server.getRestAPI();
    axios({
      method: 'post',
      url: url + '/breed/release/selectFarmList.do',
      data: qs.stringify(data),
      withCredentials: true,
      credentials: 'same-origin',
    })
      .then(function (response) {
        that.setState(
          {
            rowData: response.data.rows1,
          },
          function () {}
        );
      })
      .catch(function (error) {
        return [];
      });
  };

  setOnChange = (e, params) => {
    let that = this;
    let col = '';
    let val = '';
    params.type = params.type ? params.type.toUpperCase() : '';
    if (params.type === 'SELECT') {
      //Select
      col = params.inputName;
      val = e;
    } else if (params.type === 'D' || params.type === 'T') {
      col = params.inputName;
      val = e;
    } else {
      col = e.target.name ? e.target.name : '';
      val = e.target.value;
    }
    if (params.type === 'N') {
      val = val.replace(/,/gi, '');
      if (params.maxVal) {
        if (Number(val) > Number(params.maxVal)) {
          val = Number(params.maxVal);
        }
      }
    }

    this.setState({ form: { ...this.state.form, [col]: val } }, function () {});
  };

  onCellClicked = (e) => {
    if (e.column.colId === 'ck') {
      this.props.fnSelectFarm(e.data);
      this.props.fnClosePop('popSearchFarmView');
    }
  };
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };
  onDateChange = (date, dateString, name) => {
    this.setState({ [name]: dateString }, function () {
      console.log(this.state);
    });
  };
  setOnKeydown = (e, params) => {
    if (e.key === 'Enter') {
      this.fnSearch();
    }
  };
  onRowDoubleClicked = (e) => {
    this.props.fnSelectFarm(e.data);
    this.props.fnClosePop('popSearchFarmView');
  };
  render() {
    if (!this.props.popSearchFarmView) return null;
    const Option = Select.Option;
    const options = this.state.classList.map((d) => (
      <Option key={d.codeValue}>{d.codeText}</Option>
    ));
    let row = this.state;
    return (
      <Fragment>
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0, 0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '900px',
              height: 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '100px',
              margin: 'auto',
              borderRadius: '10px',
              background: 'white',
            }}
          >
            <div className="pop_box">
              <h2>
                <Trans>Farm</Trans>
              </h2>
              <div className="border mT10 txt_center">
                <label htmlFor="" className="mL20">
                  <Trans>Farm Code</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'farmCode', //*** */
                  type: '', //*** */
                  that: this, //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 120, // px제외 : 없으면 100% */
                  placeholder: 'Farm Code',
                  setOnKeydown: this.setOnKeydown,
                })}
                <label htmlFor="">
                  <Trans>Farm Name</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'farmName', //*** */
                  type: '', //*** */
                  that: this, //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 200, // px제외 : 없으면 100% */
                  placeholder: 'Farm Name',
                  setOnKeydown: this.setOnKeydown,
                })}
                <label htmlFor="" className="mL20">
                  <Trans>Class</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'farmClass', //*** */
                  type: 'SELECT', //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  that: this, //*** */
                  options: options, //*** */ type:'SELECT' options*/
                  //placeholder: 'Strain', //*** */
                  width: 120, // px제외 : 없으면 30 */
                })}
                <button className="btn_gray" onClick={() => this.fnSearch()}>
                  <Trans>Search</Trans>
                </button>
              </div>
              <div
                style={{ height: '350px', width: '100%', marginBottom: '20px' }}
                className="board_list ag-theme-balham"
              >
                <AgGridReact
                  onGridReady={this.onGridReady}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData ? this.state.rowData : []}
                  defaultColDef={this.state.defaultColDef}
                  onCellClicked={(e) => this.onCellClicked(e)}
                  onRowDoubleClicked={(e) => this.onRowDoubleClicked(e)}
                  onCellFocused={(e) => {
                    e.api.gridOptionsWrapper.gridOptions.suppressCellSelection = true;
                  }}
                  rowSelection={'single'}
                  pagination={true}
                  paginationPageSize={100}
                  enableRangeSelection={true}
                ></AgGridReact>
              </div>
              <div className="f_right mT10 mB30">
                <button
                  className="btn_gray"
                  onClick={(e) => this.props.fnClosePop('popSearchFarmView')}
                >
                  <Trans>Cancel</Trans>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default PopSearchFarm;
