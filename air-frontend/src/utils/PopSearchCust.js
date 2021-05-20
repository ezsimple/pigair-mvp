import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { SessionUtil, DateUtil, GridUtil } from 'utils';
import { Trans } from 'react-i18next';
import { Const, Server } from 'components/Properties';
import axios from 'axios';
import qs from 'qs';
import { moment } from 'components';
import i18n from 'i18next';
import { Popconfirm, Switch, message, DatePicker, Select } from 'antd';
import NumberFormat from 'react-number-format';
import { AgGridReact } from 'components/commons/ag-grid/AgGridUtil';
import { withAlert } from 'react-alert';
/*
 ** PopSearchCust
 **
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 */
class PopSearchCust extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstance: this,
      popSearchCustView: false,
      value: '',
      form: [],
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
            return '<button class="btn_sel">' + i18n.t('Select') + '</button>';
          },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Customer Code',
          field: 'customerCode',
          width: 150,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Customer Name',
          field: 'customerName',
          width: 300,
          cellStyle: { textAlign: 'left' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Chief Date',
          field: 'chiefName',
          width: 100,
          cellStyle: { textAlign: 'left' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Country',
          field: 'countryName',
          width: 100,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'BizNo',
          field: 'bizno',
          width: 70,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Kind',
          field: 'customerKindName',
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
    console.log(this.props);
    moment.locale(SessionUtil.getLang());
    this.fnInit(this.props);
    this['customerCode'].focus();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (
  //     prevState.popSearchCustView !== nextProps.popSearchCustView &&
  //     nextProps.popSearchCustView
  //   ) {
  //     prevState.currentInstance.fnInit(nextProps);

  //     return {
  //       popSearchCustView: nextProps.popSearchCustView
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
    data.masterCodeId = 'EP01';
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
              ['customerCode']: nextProps.customerCode,
              ['customerKind']: nextProps.customerKind,
            },
          },
          function () {
            let { customerCode } = nextProps;
            // 검색식 없이 조회시 600M의 데이터 발생중. DB서버 부하 발생
            // 정책적으로 2자리 이상 입력되어야 검색도록 조치함
            if (customerCode && nextProps.customerCode.length >= 2) {
              that.fnSearch();
            }
            that['customerCode'].focus();
          }
        );
      })
      .catch(function (error) {
        return [];
      });
  };

  // CJ서버에서 파라미터 없이 요청시 한번에 600M 이상의 정보 조회로 DB Overhead 발생하고 있음
  // 이를 방지하기위해, 정책적으로 2자리 이상 입력시만 검색하도록 조치함
  // 2020.10.23
  fnCheck = () => {
    let { customerCode, customerName } = this.state.form;
    let minLength = 2;
    let msg = i18n.t('Please enter at least two characters.');

    if (!customerCode && !customerName) {
      this.props.alert.error(msg);
      return false;
    }

    if (customerCode && customerCode.length < minLength) {
      this.props.alert.error(msg);
      return false;
    }

    if (customerName && customerName.length < minLength) {
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
    //data.customerKind = data.customerKind.toString();

    console.log('===>', data);

    if (!this.fnCheck()) {
      return;
    }

    const url = Server.getRestAPI();
    axios({
      method: 'post',
      url: url + '/breed/release/selectCustomerList.do',
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
      this.props.fnSelectCust(e.data);
      this.props.fnClosePop('popSearchCustView');
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
    this.props.fnSelectCust(e.data);
    this.props.fnClosePop('popSearchCustView');
  };
  handleChange = (value) => {
    this.setState(
      { form: { ...this.state.form, ['customerKind']: value } },
      function () {
        console.log(value, this.state.form.customerKind);
      }
    );
  };
  render() {
    if (!this.props.popSearchCustView) return null;
    const optionsM = [];
    this.state.classList.map(function (d, i) {
      const value = d.codeValue;
      optionsM.push({
        value,
        //disabled: i === 10,
      });
    });

    // this.props.customerKind.map(function(d, i) {
    //   console.log('dddddd', d);
    // });
    const options = this.state.classList.map((d) => (
      <option key={d.codeValue} value={d.codeValue} selected>
        {d.codeText}
      </option>
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
                <Trans>Customer</Trans>
              </h2>
              <div className="border txt_left">
                <label htmlFor="" className="mL20">
                  <Trans>Customer Code</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'customerCode', //*** */
                  type: '', //*** */
                  that: this, //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 120, // px제외 : 없으면 100% */
                  placeholder: 'Customer Code',
                  setOnKeydown: this.setOnKeydown,
                })}
                <label htmlFor="">
                  <Trans>Customer Name</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'customerName', //*** */
                  type: '', //*** */
                  that: this, //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 200, // px제외 : 없으면 100% */
                  placeholder: 'Customer Name',
                  setOnKeydown: this.setOnKeydown,
                })}
                <button
                  className="btn_gray mL20"
                  onClick={() => this.fnSearch()}
                >
                  <Trans>Search</Trans>
                </button>
                {/* <br></br>
                <label htmlFor="" className="mL20" style={{ width: '130px' }}>
                  <Trans>Kind</Trans>
                </label> */}

                {/* <Select
                  mode="multiple"
                  style={{
                    width: '670px',
                    marginLeft: '140px'
                  }}
                  placeholder="Please select"
                  defaultValue={this.props.customerKind}
                  showArrow={true}
                  onChange={this.handleChange}
                >
                  {options}
                </Select> */}
              </div>
              <div
                style={{ height: '300px', width: '100%' }}
                className="board_list ag-theme-balham mB10"
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
                ></AgGridReact>
              </div>
              <div className="f_right mT10 mB10">
                <button
                  className="btn_gray"
                  onClick={(e) => this.props.fnClosePop('popSearchCustView')}
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
export default withAlert()(PopSearchCust);
