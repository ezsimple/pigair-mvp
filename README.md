1. React Frontend with nodejs
2. Springboot with maven
3. mongoDB for scale out 
4. using make build springboot jar include react js
5. run with scouter monitoring 
   - java -javaagent:scouter.agent.jar -Dscouter.config=scouter.conf -Dobj_name=pigAir -Dspring.profiles.active=dev -jar air-backend.war

## 백엔드 RESTful API 표준 적용##
  - URL은 유사하게 사용하면서 axios의 method 방식으로 기능 분리.
  - 참조 https://meetup.toast.com/posts/92
  - POST:생성, GET:조회, PUT:수정, DELETE:삭제
  
## 배포용 android APK 생성시 필요절차 ##
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
