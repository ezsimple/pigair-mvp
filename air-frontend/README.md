### PigAIR frontend

PigAIR frontend 화면 구성

## Pre Installed Packages

Created with create-react-app (V2)

Support List
- reactstrap (bootstrap 4)
- tachyons (css library)
- react-router 4
- styled-components
- typescript (possible)
- node-sass (scss)
- mobx (using store)
- ant design 4
- ag-grid
- storybook

[기획안]
```
https://t.ly/ErBO
https://t.ly/cyES
https://t.ly/riXa
```

[개발환경(PC)]
```
# nvm & node.js (LTS버전) 설치하기

# nvm 설치
https://github.com/coreybutler/nvm-windows/releases


# open cmd windows
nvm install v10.16.0
nvm use 10.16.0
npm install —global yarn


# GIT 설치하기
https://git-scm.com/download/win


git clone http://mhlee@210.92.91.230:9000/pigair/air_frontend air_frontend
cd air_frontend
git checkout development

cat .env.dev # PORT 확인

# 패키지 설치
yarn install --wait-timeout=100000

# 서버 실행
yarn start
```
