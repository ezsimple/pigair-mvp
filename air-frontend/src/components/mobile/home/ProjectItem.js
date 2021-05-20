import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import i18n from 'i18next';
/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const ProjectItem = (props) => {
  return (
    <Fragment>
      <div className="f_left" style={{ width: '10%' }}>
        <input
          type="radio"
          name="hechery_radio"
          id={'hechery_radio' + props.i}
          value={props.i}
        />
        <label
          htmlFor={'hechery_radio' + props.i}
          onClick={(e) => props.fnSetSelectedProject(props.data[props.i])}
        ></label>
      </div>
      <dl
        className="projectinfo"
        style={{
          overflow: 'hidden',
          width: '90%',
          marginTop: '10px',
        }}
      >
        <dt style={{ marginBottom: '0px' }}>
          <li
            style={{
              width:
                props.data[props.i].recvQty -
                  (props.data[props.i].deathQtysum +
                    props.data[props.i].cullingQtysum +
                    props.data[props.i].harvestQty) ==
                0
                  ? '90%'
                  : '100%',
              float:
                props.data[props.i].recvQty -
                  (props.data[props.i].deathQtysum +
                    props.data[props.i].cullingQtysum +
                    props.data[props.i].harvestQty) ==
                0
                  ? 'left'
                  : 'none',
              paddingLeft:
                props.data[props.i].recvQty -
                  (props.data[props.i].deathQtysum +
                    props.data[props.i].cullingQtysum +
                    props.data[props.i].harvestQty) ==
                0
                  ? '10%'
                  : '0',
            }}
          >
            [{props.data[props.i].farmCode}]{props.data[props.i].projCode}
          </li>
          {props.data[props.i].recvQty -
            (props.data[props.i].deathQtysum +
              props.data[props.i].cullingQtysum +
              props.data[props.i].harvestQty) ==
          0 ? (
            <li
              style={{ width: '10%', overflow: 'hidden' }}
              onClick={(e) => {
                props.fnSetSelectedProject(props.data[props.i]),
                  props.fnOpenConfirmModal(
                    'PC',
                    i18n.t('This Project will be Closed. Are you sure?')
                  );
              }}
            >
              <span>X</span>
            </li>
          ) : null}
        </dt>

        <div>
          <dd className="project_list_dt" style={{ marginTop: '10px' }}>
            <span>
              <Trans>Age</Trans> :
            </span>
            <span
              className="project_list_span1"
              style={{ paddingRight: '10px' }}
            >
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0 ||
              props.data[props.i].ageDay == undefined ||
              props.data[props.i].ageDay == 0
                ? 0
                : props.data[props.i].ageDay}
            </span>
            {props.data[props.i].broReceiveNo == undefined ||
            props.data[props.i].broReceiveNo == 0 ? (
              ''
            ) : (
              <span style={{ paddingRight: '10px' }}>/</span>
            )}

            {/* <span style={{ paddingRight: '10px' }}>
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0
                ? ''
                : moment(props.data[props.i].workDate).format('YYYY[-]MM[-]DD')}
            </span> */}
            <span style={{ paddingRight: '10px' }}>
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0 ||
              props.data[props.i].workDate == undefined
                ? ''
                : moment(props.data[props.i].workDate).format('YYYY[-]MM[-]DD')}
            </span>
          </dd>
          <dd className="project_list_dt">
            <span>
              <Trans>Pop</Trans> :
            </span>
            <span
              className="project_list_span1"
              style={{ paddingRight: '10px' }}
            >
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0 ||
              props.data[props.i].recvQty == undefined ||
              props.data[props.i].recvQty == 0
                ? //||
                  //props.data[props.i].deathQtysum == undefined ||
                  //props.data[props.i].deathQtysum == 0 ||
                  //props.data[props.i].cullingQtysum == undefined ||
                  //props.data[props.i].cullingQtysum == 0
                  0
                : props.data[props.i].recvQty -
                  (props.data[props.i].deathQtysum +
                    props.data[props.i].cullingQtysum +
                    //props.data[props.i].transferQty +
                    props.data[props.i].harvestQty)}
            </span>
            <span style={{ paddingRight: '10px' }}>/</span>
            <span style={{ paddingRight: '10px' }}>
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0
                ? 0
                : props.data[props.i].recvQty}
            </span>
          </dd>
          <dd className="project_list_dt">
            <span>
              <Trans>Dep</Trans> :
            </span>
            <span
              className="project_list_span1"
              style={{ paddingRight: '10px' }}
            >
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0
                ? //props.data[props.i].deathQtysum == undefined ||
                  //props.data[props.i].deathQtysum == 0 ||
                  //props.data[props.i].cullingQtysum == undefined ||
                  //props.data[props.i].cullingQtysum == 0
                  0
                : props.data[props.i].deathQtysum +
                  props.data[props.i].cullingQtysum +
                  props.data[props.i].harvestQty}
            </span>
            <span style={{ paddingRight: '10px' }}>/</span>
            <span style={{ paddingRight: '10px' }}>
              {props.data[props.i].broReceiveNo == undefined ||
              props.data[props.i].broReceiveNo == 0 ||
              props.data[props.i].recvQty == undefined ||
              props.data[props.i].recvQty == 0
                ? //||
                  //props.data[props.i].deathQtysum == undefined ||
                  //props.data[props.i].deathQtysum == 0 ||
                  //props.data[props.i].cullingQtysum == undefined ||
                  //props.data[props.i].cullingQtysum == 0
                  0 + '%'
                : parseInt(
                    ((props.data[props.i].deathQtysum +
                      props.data[props.i].cullingQtysum +
                      props.data[props.i].harvestQty) /
                      props.data[props.i].recvQty) *
                      100
                  ) + '%'}
            </span>
          </dd>
          <div
            style={{
              width:
                props.data[props.i].broReceiveNo != 0
                  ? 100 -
                    ((props.data[props.i].deathQtysum +
                      props.data[props.i].cullingQtysum +
                      props.data[props.i].harvestQty) /
                      props.data[props.i].recvQty) *
                      100 +
                    '%'
                  : '0%',

              height: '100%',
              backgroundColor: '#b1d0f2',
              position: 'absolute',
              top: '41px',
              zIndex: -2,
            }}
          ></div>
          {props.data[props.i].recvQty -
            (props.data[props.i].deathQtysum +
              props.data[props.i].cullingQtysum +
              props.data[props.i].transferQty) ==
          0 ? (
            <div>
              <li style={{ color: 'red' }}>
                ! <Trans>Please Check Project Status.</Trans>
              </li>
            </div>
          ) : null}
        </div>
      </dl>
    </Fragment>
  );
};

export default ProjectItem;
