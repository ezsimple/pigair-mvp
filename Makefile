all:
	(cd air-backend; ./gradlew.bat clean build)

run:
	(cd air-backend; java -jar ./build/libs/air-backend-0.0.1.war -Dspring.profiles.active=local)
