# Trello-clone
포트폴리오용으로 제작된 Trello 클론 코딩 프로젝트입니다.  
  
지속적으로 업데이트되고 있으며, 내용이 조금씩 바뀔 수 있습니다.  
  
클라이언트는 React, Redux, Styled-components 등을 사용하여 작성되었으며,   
  
서버는 Nodejs + Express를 사용하여 RESTful API 서버로 작성되었습니다.  

서버 Repo: [https://github.com/cjy9306/trello-clone-server](https://github.com/cjy9306/trello-clone-server)

*코드에 대한 의견 및 개선사항 모두 환영합니다!!*
  
![trello-1](https://user-images.githubusercontent.com/7731519/81029010-70770480-8ebe-11ea-84ff-626f6f9981c2.png)

![trello-2](https://user-images.githubusercontent.com/7731519/81029014-753bb880-8ebe-11ea-80f7-341783c616d4.png)

## 프로젝트 설치
```
git clone https://github.com/cjy9306/trello-clone.git
npm install
```

## 프로젝트 빌드 및 실행
빌드
```
npm run build
```

시작
```
npm start
```
빌드 환경의 경우 package.json의 NODE_ENV 환경변수를 변경하여 설정하실 수 있습니다.

## 프로젝트 구조
root
 - public: template으로 사용될 index.html 등 파일들이 있음.
 - .github/workflows: github actions에 쓰이는 CI/CD 설정 yml 
 - webpack.config.js: webpack 설정파일
 - src: src 파일들이 위치
   - common: 공통적으로 사용되는 함수, 상수
   - components: 공통적으로 많이 사용되는 JSX 컴포넌트들
   - containers: 실제 페이지에 해당하는 JSX Container들 ( 각 페이지의 컴포넌트들이 폴더로 구성되어 있음 )
   - hooks: custom hooks
   - lib: axios로 구성된 RESTful API 호출 모듈
   - modules: ducks패턴으로 구성된 redux store(action type, action, reducer가 각 모듈에 맞게 한 파일에 들어있음)
   - App.js: Root 컴포넌트
   - index.js: react entry
 
  

## 사용법
해당 프로젝트가 필요하신 분들은 아래 내용을 수정하신 후 사용하시면 됩니다.
1. src/components/FireBaseLogin.jsx에서 Firebase 관련 apikey 등 설정을 자신의 api로 설정하시면 됩니다.
2. src/lib/api/client.js에서 서버 주소도 본인의 trello-clone 서버주소로 바꾸시면 됩니다.
