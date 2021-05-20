import * as React from 'react';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SessionUtil, CommonUtil } from 'utils';
import { moment } from 'components';

import axios from 'axios';
import qs from 'qs';

import { Server } from 'components/Properties';
import { message, Select } from 'antd';

const LangCode = (props) => {
  const [codes, setCodes] = useState([
    {
      codeText: '한국어',
      codeValue: 'KO',
    },
    {
      codeText: 'English',
      codeValue: 'EN',
    },
  ]);
  const [code, setCode] = useState(SessionUtil.getLang());
  const [disabled, setDisabled] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(
    (code) => {
      moment.locale(SessionUtil.getLang());
    },
    [code]
  );

  const onChange = (value) => {
    setCode(value);
    props.setCode(props.name, value);
    switch (value) {
      case 'ko':
      case 'en':
        if (props.changePossible) {
          i18n.changeLanguage(value);
          localStorage.setItem(props.name, value);
          console.log('18n.changeLanguage:', value);
        }
        break;
    }
  };

  return (
    <Select
      name="lang"
      className={props.className}
      defaultValue={props.code ? props.code.toLowerCase() : undefined}
      value={props.value ? props.value.toLowerCase() : code}
      onChange={onChange}
      placeholder={t('Select code')}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      disabled={props.disabled}
      style={props.style}
    >
      {codes.map((row, i) => {
        return (
          <Select.Option key={i} value={row.codeValue.toLowerCase()}>
            {row.codeText}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default LangCode;
