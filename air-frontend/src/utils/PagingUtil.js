import React from 'react';
import { DateUtil } from 'utils';
import produce from 'immer';

/*
 ** ---------------------------------
 ** params {
 **  total : 전체 행의 수
 **  rowCnt : 가져온 ROW 수
 **  pageSize : 페이징 크기
 **  pageNo : 현재 페이지 번호
 ** }
 ** ---------------------------------
 ** 첫번째 행 번호(계산) => ((pageNo-1) * pageSize) + 1
 ** 마지막 행 번호(계산) => ((pageNo-1) * pageSize) + rowCnt
 ** 전체 행 번호(파라미터) => total
 ** 첫번째 페이지 번호(무조건 1) (pageNo-1)>0?pageNo-1:1
 ** 이전 페이지 번호(계산) => (pageNo-1)>0?pageNo-1:1
 ** 다음 페이지 번호(계산) => (pageNo+1)=>(total/pageSize)?(total/pageSize):(pageNo+1)
 ** 마지막 페이지 번호(계산) => (total/pageSize)
 ** ---------------------------------
 */
export default class PagingUtil extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      regDate: DateUtil.toDateTimeFormat()
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.total !== this.props.total ||
      prevProps.rowCnt !== this.props.rowCnt ||
      prevProps.pageNo !== this.props.pageNo ||
      prevProps.pageSize !== this.props.pageSize
    ) {
      this.setState(
        produce(draft => {
          draft.regDate = DateUtil.toDateTimeFormat();
        }),
        function() {
          // console.log(this.state.params);
        }
      );
    }
  }

  render() {
    const total = this.props.total ? this.props.total : 0; // 전체 행 번호(파라미터)
    const rowCnt = this.props.rowCnt ? this.props.rowCnt : 0;
    const pageSize = this.props.pageSize ? this.props.pageSize : 10;
    const pageNo = this.props.pageNo ? this.props.pageNo : 1;
    const lastPageNo = _.ceil(total / pageSize, 0); // 마지막 페이지 번호(계산)
    const pageInfo = {
      firstRowNo: rowCnt > 0 ? (pageNo - 1) * pageSize + 1 : 0, // 첫번째 행 번호(계산)
      lastRowNo: (pageNo - 1) * pageSize + rowCnt, // 마지막 행 번호(계산)
      firstPageNo: rowCnt > 0 ? 1 : 0, // 첫번째 페이지 번호(무조건 1)
      prevPageNo: pageNo - 1 > 0 ? pageNo - 1 : 1, // 이전 페이지 번호(계산)
      lastPageNo: lastPageNo, // 마지막 페이지 번호(계산)
      nextPageNo: pageNo + 1 > lastPageNo ? lastPageNo : pageNo + 1 // 다음 페이지 번호(계산)
    };
    console.log(
      'total:',
      total,
      'rowCnt:',
      rowCnt,
      'pageSize:',
      pageSize,
      'pageNo:',
      pageNo,
      'pageInfo:',
      pageInfo
    );
    return (
      <React.Fragment>
        <div className="ag-paging-panel ag-unselectable">
          <span ref="eSummaryPanel" className="ag-paging-row-summary-panel">
            <span ref="lbFirstRowOnPage">{pageInfo.firstRowNo}</span>
            {/* 첫번째 행 번호(계산) */}
            to
            <span ref="lbLastRowOnPage">{pageInfo.lastRowNo}</span>
            {/* 마지막 행 번호(계산) */}
            of
            <span ref="lbRecordCount">{total}</span>
            {/* 전체 행 번호(파라미터) */}
          </span>
          <span className="ag-paging-page-summary-panel">
            <div
              ref="btFirst"
              className={
                pageNo == 1
                  ? 'ag-paging-button ag-disabled'
                  : 'ag-paging-button'
              }
            >
              <span className="ag-icon ag-icon-first" unselectable="on" />
              <button
                name="firstPageNo"
                type="button"
                onClick={e => this.props.onClick(pageInfo.firstPageNo, e)}
              >
                First
              </button>
              {/* 첫번째 페이지 번호(무조건 1) */}
            </div>
            <div
              ref="btPrevious"
              className={
                pageNo == 1
                  ? 'ag-paging-button ag-disabled'
                  : 'ag-paging-button'
              }
            >
              <span className="ag-icon ag-icon-previous" unselectable="on" />
              <button
                name="prevPageNo"
                type="button"
                onClick={e => this.props.onClick(pageInfo.prevPageNo, e)}
              >
                Previous
              </button>
              {/* 이전 페이지 번호(계산) */}
            </div>
            Page
            <span ref="lbCurrent">{pageNo}</span>
            of
            <span ref="lbTotal">
              {pageInfo.lastPageNo}
              {/* 마지막 페이지 번호 */}
            </span>
            <div
              ref="btNext"
              className={
                rowCnt == 0 || pageNo == pageInfo.lastPageNo
                  ? 'ag-paging-button ag-disabled'
                  : 'ag-paging-button'
              }
            >
              <span className="ag-icon ag-icon-next" unselectable="on" />
              <button
                name="nextPageNo"
                type="button"
                onClick={e => this.props.onClick(pageInfo.nextPageNo, e)}
              >
                Next
              </button>
              {/* 다음 페이지 번호(계산) */}
            </div>
            <div
              ref="btLast"
              className={
                rowCnt == 0 || pageNo == pageInfo.lastPageNo
                  ? 'ag-paging-button ag-disabled'
                  : 'ag-paging-button'
              }
            >
              <span className="ag-icon ag-icon-last" unselectable="on" />
              <button
                name="lastPageNo"
                type="button"
                onClick={e => this.props.onClick(pageInfo.lastPageNo, e)}
              >
                Last
              </button>
              {/* 마지막 페이지 번호(계산) */}
            </div>
          </span>
        </div>
      </React.Fragment>
    );
  }
}
