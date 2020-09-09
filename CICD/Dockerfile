FROM node:12.18.3 as builder

# 작업 폴더를 만들고 npm 설치
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
#RUN npm install 
#RUN npm install react-scripts@3.4.3 -g 

# listen port
EXPOSE 3000

# 소스를 작업폴더로 복사하고 앱 실행
COPY . /app
COPY ./public /app/public
COPY ./src /app/src
COPY ./node_modules /app/src
CMD ["npm", "start"]
