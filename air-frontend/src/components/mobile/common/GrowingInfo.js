import React, { Fragment } from 'react';
import { Trans } from 'react-i18next';
import { moment } from 'components';
import { observer, inject } from 'mobx-react';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const GrowingInfo = inject('MGrowingStore')(
  observer((props) => {
    return (
      <Fragment>
        <div
          className="recebox2"
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          <ul>
            <li>
              <span
                style={{
                  width:
                    localStorage.getItem('i18nextLng') == 'ko' ? '15%' : '24%',
                }}
              >
                <Trans>workDate</Trans>
              </span>
              <span style={{ width: '2%' }}>(</span>
              <span style={{ width: '9%' }}>
                <Trans>Age</Trans>
              </span>
              <span
                style={{
                  width: '2%',
                  marginRight:
                    localStorage.getItem('i18nextLng') == 'ko' ? '32%' : '23%',
                }}
              >
                )
              </span>
              {moment(props.mProjectStore.selectedProject.workDate).format(
                'YYYY[-]MM[-]DD'
              )}
              (
              {props.mProjectStore.selectedProject.ageDay == undefined
                ? 0
                : props.mProjectStore.selectedProject.ageDay}
              )
            </li>
            <li>
              <span>
                <Trans>Population</Trans>
              </span>
              {props.mProjectStore.selectedProject.recvQty}
            </li>
          </ul>
        </div>
      </Fragment>
    );
  })
);

export default GrowingInfo;
