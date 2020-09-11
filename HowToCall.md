1. Linux 환경에서 실행하기
  1-1. github에서 소스 가져오기
      # mkdir repository
      # cd repository
      # git init
      # git clone https://github.com/kimsangkyeong/react-frontend.git
      # cd react-frontend
  1-2. local에 관련 module 설치하기
      # npm install
      # npm install react-scripts@3.4.3 -g
  2-3. 서버실행하기
      # npm start

2. Dockerizing 하기
  2-1. docker build하기
      # cd repository/react-frontend
      # docker build -t  {tag명}:{버전} -f CICD/Dockerfile .
  2-2. docker repository에 push하기
      # 필요시 원격 docker repository 에 로그인 하기
        docker login -u {username} -p {password} {Server URL}
      # docker push imageId 

3. 현재 AWS Route53과 연계하여 작성한 Domain으로 호출하기
  3-1. http://app.pub.tbiz-atcl.net/ , https://app.pub.tbiz-atcl.net/
