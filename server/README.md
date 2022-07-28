## Running the app - development

```bash
# 도커 이미지 가져오기
$ docker pull arh714/klaypod-api-dev:1.0.0

# docker-compose 로 개발 서버 실행
$ docker-compose -f docker-compose-dev.yml up
```

## Running the app - production

```bash
# 도커 이미지 가져오기
$ docker pull arh714/klaypod-api-prod:1.0.0

# 1. docker-compose.yml 로 서버 실행
$ docker-compose up

# 2. docker 로 서버 실행
$ docker run -it --env-file=src/config/env/.production.env --rm -p8080:8080 arh714/klaypod-api-prod:1.0.0
```
