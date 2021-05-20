import React, { Fragment } from 'react';
import { SessionUtil, DateUtil, GridUtil } from 'utils';
import { Trans } from 'react-i18next';
import { Const, Server } from 'components/Properties';
import axios from 'axios';
import qs from 'qs';
import { moment } from 'components';
import i18n from 'i18next';
import { Select } from 'antd';
import { AgGridReact } from 'components/commons/ag-grid/AgGridUtil';
/*
 ** PopSearchCust
 **
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 */
class PopSearchMaterial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInstance: this,
      popSearchMaterialView: false,
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
          headerName: 'Material Code',
          field: 'materialCode',
          width: 150,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Material Name',
          field: 'materialName',
          width: 300,
          cellStyle: { textAlign: 'left' },
          suppressSizeToFit: true,
        },
        {
          headerName: 'Spec',
          field: 'spec',
          width: 200,
          cellStyle: { textAlign: 'left' },
          suppressSizeToFit: false,
        },
        {
          headerName: 'Unit',
          field: 'unit',
          width: 100,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: false,
        },
        {
          headerName: 'Msize',
          field: 'msize',
          width: 70,
          cellStyle: { textAlign: 'center' },
          suppressSizeToFit: false,
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
    this['materialName'].focus();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (
  //     prevState.popSearchMaterialView !== nextProps.popSearchMaterialView &&
  //     nextProps.popSearchMaterialView
  //   ) {
  //     prevState.currentInstance.fnInit(nextProps);

  //     return {
  //       popSearchMaterialView: nextProps.popSearchMaterialView
  //     };
  //   }
  //   return null;
  // }

  fnInit = (nextProps) => {
    let that = this;
    let data = this.state.form;
    //console.log(nextProps);
    data.countryCode = SessionUtil.getCountryCode();
    data.dateFormat = SessionUtil.getDateFormat();
    data.masterCodeId = 'EP13';
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
              ['materialName']: nextProps.materialName,
              ['materialType']: nextProps.materialType,
            },
          },
          function () {
            if (nextProps.materialName.length > 0) {
              that.fnSearch();
            }
            that['materialName'].focus();
          }
        );
      })
      .catch(function (error) {
        return [];
      });
  };

  fnSearch = () => {
    let that = this;
    let data = this.state.form;

    data.countryCode = SessionUtil.getCountryCode();
    data.dateFormat = SessionUtil.getDateFormat();
    data.materialType = data.materialType.toString();
    data.sql = 'selectTcMaterialCode';

    const url = Server.getRestAPI();
    axios({
      method: 'post',
      url: url + '/breed/growing/selectSql.do',
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
      this.props.fnSelectMaterial(
        e.data,
        this.props.fieldCode,
        this.props.fieldName,
        this.props.fieldUnit
      );
      this.props.fnClosePop('popSearchMaterialView');
    }
  };
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  setOnKeydown = (e, params) => {
    if (e.key === 'Enter') {
      this.fnSearch();
    }
  };
  onRowDoubleClicked = (e) => {
    this.props.fnSelectMaterial(
      e.data,
      this.props.fieldCode,
      this.props.fieldName,
      this.props.fieldUnit
    );
    this.props.fnClosePop('popSearchMaterialView');
  };
  handleChange = (value) => {
    this.setState(
      { form: { ...this.state.form, ['materialType']: value } },
      function () {
        console.log(value, this.state.form.materialType);
      }
    );
  };
  render() {
    if (!this.props.popSearchMaterialView) return null;
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
                <Trans>Material</Trans>
              </h2>
              <div className="border txt_left">
                <label htmlFor="">
                  <Trans>Type</Trans>
                </label>
                <Select
                  //mode="multiple"
                  style={{
                    width: '100px',
                    //marginLeft: '140px'
                  }}
                  placeholder="Please select"
                  defaultValue={this.props.materialType}
                  showArrow={true}
                  onChange={this.handleChange}
                >
                  {options}
                </Select>

                <label htmlFor="" className="mL20">
                  <Trans>Material Name</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'materialName', //*** */
                  type: '', //*** */
                  that: this, //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 150, // px제외 : 없으면 100% */
                  placeholder: 'Material Name',
                  setOnKeydown: this.setOnKeydown,
                })}
                <label htmlFor="" className="mL20">
                  <Trans>Material Code</Trans>
                </label>
                {GridUtil.renderInput({
                  inputName: 'materialCode', //*** */
                  type: '', //*** */
                  that: this, //*** */
                  statsForm: this.state.form, //*** */
                  setOnChange: this.setOnChange, //*** */
                  width: 120, // px제외 : 없으면 100% */
                  placeholder: 'Material Code',
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
                  onClick={(e) =>
                    this.props.fnClosePop('popSearchMaterialView')
                  }
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
export default PopSearchMaterial;
