// 다국어 지원을 위한 Context API 설정
import { createContext } from 'react';

const LangContext = createContext({ lang: 'ko' });

export default LangContext;
