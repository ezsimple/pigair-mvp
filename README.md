1. React Frontend with nodejs
2. Springboot with maven
3. mongoDB for scale out 
4. using make build springboot jar include react js
5. run with scouter monitoring 
   - java -javaagent:scouter.agent.jar -Dscouter.config=scouter.conf -Dobj_name=pigAir -Dspring.profiles.active=dev -jar air-backend.war

프로젝트 처음오픈시
  IDEA->Import project -> settings.gradle 선택. 

IntelliJ VM옵션  및  상용서버에서 jar 실행시 
  - "-Dspring.profiles.active=production" 옵션 추가 필요
  
IntelliJ세팅 추가
 "Delegate IDE build/run actions to Gradle" 옵션 켜기 in Settings (Preferences) | Build, Execution, Deployment | Build Tools | Gradle | Runner tab.
  
HTTPS 프론트엔드 실행시:
  HTTPS=true npm start
  
mongoDB: 
  - production - 172.16.10.120 비즈머스 서버로 추가

geth:   
  - local - 210.92.91.225 로 변경 중
  
  - ropsten - 210.92.91.236 으로 설정 중

FCM:
  - https://console.firebase.google.com/u/1/project/blocery-b7eef/overview
  - ID : ezfarm2015@gmail.com / PW : ezfarm3414

개발환경 - 기존과 동일 (아래 참조)
       https://bitbucket.org/ezfarmchain/chain/src/master/README.md
 
**userphone (React-Native)구동법 추가설명 필요**
  - android의 경우 안드로이드 스튜디오에서 에물레이터 구동
  
  - android 스튜디오에서 userPhone/android import 필요->gradle update 됨
 
  - $adb reverse tcp:8080 tcp:8080 로 해야 폰에서 localhost:8080으로 매핑됨.
  
  - $adb reverse tcp:3000 tcp:3000 로 해야 폰에서 localhost:3000으로 매핑됨.
  
  - $ react-native run-android
  
  - $react-native log-android 로 일부로그 조회가능.(console.log도 나옴)
  - (외부 라이브러리 사용시 $react-native link 필요)
  
  - ios 는 $pod install 필요(wiki참조)
    (19.8) 결제모듈 오류로 pod install 실패시 수동 수정 필요, node_modules/imaport-react-native/ios/IamportReactNative.podspec 파일 강제수정. (s.homepage=”http://blocery.com”))
  

##추가적용사항 - 백엔드 REST API 표준 적용##
  - URL은 유사하게 사용하면서 axios의 method 방식으로 기능 분리.
  - 참조 https://meetup.toast.com/posts/92

POST	
  - POST를 통해 해당 URI를 요청하면 리소스를 생성합니다.
  - 예) /login - login 시도, /producer - 생산자 생성
    
GET	
  - GET를 통해 해당 리소스를 조회합니다. 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져온다.
  - 예) /login - login정보 조회, /producer/1  아이디가 1번인 producer조회 
  
PUT	
  - PUT를 통해 해당 리소스를 수정합니다. (update)
  - 예) /producer/1  아이디가 1번인 producer수정
  
DELETE	
  - DELETE를 통해 리소스를 삭제합니다.
  - 예) /producer/1  아이디가 1번인 producer삭제
  
  
##배포용 android APK 생성시 필요절차 ##
  - apk 만들기 전 작업사항
    1. userPhone에서 아래 명령어를 실행한다.  
       cd android && ./gradlew assembleRelease
    
    2. 실행중 아래와같은 에러가 생기면 /node_modules/react-native/react.gradle file을 수동으로 수정후 다시 실행한다. 
      - Task :app:mergeReleaseResources FAILED
      - 수정사항
      <pre>
      doFirst { ... }
      doLast {
          def moveFunc = { resSuffix ->
              File originalDir = file("$buildDir/generated/res/react/release/drawable-${resSuffix}");
              if (originalDir.exists()) {
                  File destDir = file("$buildDir/../src/main/res/drawable-${resSuffix}");
                  ant.move(file: originalDir, tofile: destDir);
              }
          }
          moveFunc.curry("ldpi").call()
          moveFunc.curry("mdpi").call()
          moveFunc.curry("hdpi").call()
          moveFunc.curry("xhdpi").call()
          moveFunc.curry("xxhdpi").call()
          moveFunc.curry("xxxhdpi").call()
      }
      </pre>
     
    4. APK 파일은 android/app/build/outputs/apk/release/app-release.apk 여기 위치한다.
       
**구글 playStore 배포시 필요한 keystore파일 위치와 비밀번호정보 저장위치**
  - userPhone/android/app/blocery.keystore 
이 파일이 google playStore에서 우리 blocery 앱의 unique한 키 입니다 (동일한 keystore파일로 apk를 생성해야 playstore에서 앱 업데이트가 가능합니다.) 
  - react-native 특성상 keystore의 정보(비밀번호 포함)가 userPhone/android/gradle.properties에 평문으로 저장되어 있습니다. 
추후 보안상 유의하여야 합니다.
  
