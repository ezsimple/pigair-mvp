import React from 'react';
import styled, { css } from 'styled-components';
import chick_loading from 'images/chick_loading.gif';

const Loading = (props) => {
  return (
    <React.Fragment>
      <div>
        <img src={chick_loading} />
      </div>
    </React.Fragment>
  );
};

export default Loading;

const Div = styled.div`
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
`;
