FROM node:12.18.3 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app/react-frontend
WORKDIR /app/react-frontend

# listen port
EXPOSE 3000

# 소스를 작업폴더로 복사하고 앱 실행
COPY . /app/react-frontend
RUN ls -al
RUN echo $PWD
ENV PATH /app/react-frontend/node_modules/.bin:$PATH
CMD ["npm", "start"]
