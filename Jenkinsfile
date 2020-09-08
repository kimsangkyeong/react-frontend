//
// aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 847322629192.dkr.ecr.ap-northeast-2.amazonaws.com
// docker build -t react-frontend-dualcidr .
// docker tag react-frontend-dualcidr:latest 847322629192.dkr.ecr.ap-northeast-2.amazonaws.com/react-frontend-dualcidr:latest
// docker push 847322629192.dkr.ecr.ap-northeast-2.amazonaws.com/react-frontend-dualcidr:latest

def git_url        = "https://github.com/kimsangkyeong/react-frontend.git"
def git_credential = "mygituser"
def ecr_url        = "847322629192.dkr.ecr.ap-northeast-2.amazonaws.com"
def ecr_repo       = "react-frontend-dualcidr"
def namespace      = "fruits"
def app            = "react-frontend"
def app_ver        = "1.0"
def ecr_login      = "not_yet"

def image_tag      = "${ecr_url}/${ecr_repo}:${app_ver}"
def label          = "jenkins-slave-jnlp-${UUID.randomUUID().toString()}"

podTemplate(label: lable, cloud: 'kubernetes', serviceAccount: 'jenkins',
        containers: [
               containerTemplate(name: 'jnlp', iamge: 'jenkins/jnlp-slave:3.27-1', args: '${computer.jnlpmac} ${computer.name}',
                   envVars: [
                           envVar(key: 'JVM_HEAP_MIN', value: '-Xmx192m'),
                           envVar(key: 'JVM_HEAP_MAX', value: '-Xmx192m')
                   ]
               ),
               containerTemplate(name: 'maven',  image: 'maven:3.6.1-jdk-8-alpine',          ttyEnabled: true, command: 'cat'),
               containerTemplate(name: 'awscli', image: 'amazon/aws-cli:2.0.22',             ttyEnabled: true, command: 'cat'),
               containerTemplate(name: 'docker', image: 'docker:18.06',                      ttyEnabled: true, command: 'cat',
                                 resourceLimitMemory: '128Mi'),
               containerTemplate(name: 'kubectl',image: 'lachlanevenson/k8s-kubectl:latest', ttyEnabled: true, command: 'cat',
                                 resourceLimitMemory: '128Mi')
        ],
        volumes:[
                hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
                hostPathVolume(mountPath: '/etc/hosts',           hostPath: '/etc/hosts'),
                persistentVolumeClaim(mountPath: '/home/jenkins/agent/workspace', claimName:'jenkins-workspace'),
                persistentVolumeClaim(mountPath: '/root/.m2',                     claimName:'jenkins-maven-repo')
        ]
)
{
        node(label) {
                stage('CheckOut Source') {
                    echo "git checking out...'
                    git branch: "master", url: "${git_url}", credentialsId: "${git_credential}"
                }

                stage('ECR Login') {
                    container('awscli') {
                        echo "ecr logining '
                        sh "aws ecr get-login --region ap-northeast-2 | cut -d' ' -f1,2,3,4,5,6,9"
                        ecr_login = sh(script: "aws ecr get-login --region ap-northeast-2 | cut -d' ' -f1,2,3,4,5,6,9", returnStdout:true)
                        sh "echo ${ecr_login}"
                        echo " ... ${ecr_login}"
                    }
                }

                stage('Build Docker Image') {
                    container('docker') {
                        echo "docker building ...'
                        sh "docker build -t ${image_tag} -f ./CICD/Dockerfile ."
                        sh "${ecr_login}"
                        sh "docker push ${image_tag}"
                    }
                }
        }
}