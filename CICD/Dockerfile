FROM node:12.18.3 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app
WORKDIR /app

# listen port
EXPOSE 3000

# 소스를 작업폴더로 복사하고 앱 실행
COPY . /app
RUN ls -al
RUN ls -al node_modules/
ENV PATH /app/node_modules/.bin:$PATH
CMD ["npm", "start"]
