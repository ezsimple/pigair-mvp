import React, { Fragment } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Env, Server, Const } from 'components/Properties';

import { Input, Checkbox } from 'antd';
import { Button } from 'reactstrap';

export default class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contents: '',
      autoLineEnd: true,
    };
    this.logBox = React.createRef();
  }

  componentDidMount() {
    const webSock = Server.getRemoteHost() + '/ws/endpoint';
    const sockJS = new SockJS(webSock);
    const stompClient = Stomp.over(sockJS);
    stompClient.debug = (str) => {
      if (str.startsWith('<<< MESSAGE')) return;
      console.log(str);
    }; // log off (empty function)

    stompClient.connect({}, () => {
      stompClient.subscribe('/queue/log', (data) => {
        this.addLines(data);
      });
    });

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.contents !== this.state.contents) {
      if (this.state.autoLineEnd) {
        this.gotoLineEnd();
      }
    }
  }

  setContents = (contents) => {
    this.setState({ contents });
  };

  addLines = (message) => {
    this.setContents([...this.state.contents, message.body]);
  };

  onChangeCheckbox = (e) => {
    const { checked } = e.target;
    this.setState({ autoLineEnd: checked });
  };

  gotoLineEnd = () => {
    const { scrollHeight } = this.logBox.current;
    this.logBox.current.scrollTop = scrollHeight;
  };

  // document event handler
  handleKeyDown = (e) => {
    // ESC키 입력시 로그내용 삭제
    if (e.keyCode === 27) this.setContents('');

    // ENTER키 입력시 맨끝으로 이동
    if (e.keyCode === 13) this.gotoLineEnd();
  };

  render() {
    return (
      <React.Fragment>
        <Button
          color="danger"
          style={{ marginBottom: 10, float: 'left' }}
          onClick={() => this.setContents('')}
        >
          Clear Log
        </Button>
        <Checkbox
          onChange={this.onChangeCheckbox}
          checked={this.state.autoLineEnd}
          style={{ float: 'right', paddingTop: '20px' }}
        >
          Auto LineEnd
        </Checkbox>
        <br />
        <textarea
          rows={34}
          style={{ width: '100%' }}
          readOnly={true}
          spellCheck={false}
          value={this.state.contents}
          ref={this.logBox}
        />
      </React.Fragment>
    );
  }
}
