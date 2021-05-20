import React, { Fragment, useState } from 'react';
import { Trans } from 'react-i18next';
import ProjectItem from './ProjectItem';

/*
 ** [React 유의 사항 입니다]
 ** 1. <a href="#">...</a>은 <Link to="#"></Link>로 표현 부탁 드립니다.
 ** 2. <label for="">...</label>는 <label htmlFor="">...</label>으로 표현 부탁 드립니다.
 ** 3. 다국어 표현은 <Trans>글자</Trans>으로 부탁 드립니다.
 ** 4. 파일명과 클래스명을 동일하게 해 주세요.
 */

const ProjectItemList = (props) => {
  return (
    <Fragment>
      <p>
        <Trans>Select Project</Trans>
      </p>
      {props.projectList.map((data, i) => (
        <div key={i} className="project_list_wrapper">
          <ProjectItem
            data={props.projectList}
            i={i}
            fnSetSelectedProject={props.fnSetSelectedProject}
            fnOpenConfirmModal={props.fnOpenConfirmModal}
          />
        </div>
      ))}
    </Fragment>
  );
};

export default ProjectItemList;
