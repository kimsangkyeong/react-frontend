// test
def git_url        = "https://github.com/kimsangkyeong/react-frontend.git"
def git_credential = "mygituser"
def ecr_url        = "847322629192.dkr.ecr.ap-northeast-2.amazonaws.com"
def ecr_repo       = "react-frontend-dualcidr"
def namespace      = "fruits"
def app            = "react-frontend"
def app_ver        = "1.0"
def ecr_credential = "not_yet"

def image_tag      = "${ecr_url}/${ecr_repo}:${app_ver}"
def label          = "jenkins-slave-jnlp-${UUID.randomUUID().toString()}"

podTemplate(label: label, cloud: 'kubernetes', serviceAccount: 'jenkins',
        containers: [
               containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:3.27-1', args: '${computer.jnlpmac} ${computer.name}',
                   envVars: [
                           envVar(key: 'JVM_HEAP_MIN', value: '-Xmx192m'),
                           envVar(key: 'JVM_HEAP_MAX', value: '-Xmx192m')
                   ]
               ),
               containerTemplate(name: 'node', image: 'node:12.18.3-alpine',             ttyEnabled: true, command: 'cat'),
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
                    git branch: "master", url: "${git_url}", credentialsId: "${git_credential}"
                }

                stage('build the source code via npm') {
                    container('node') {
                        sh 'rm -rf node_modules packaage-lock.json'
                        //sh 'npm cache clean --force'
                        sh 'npm install'
                        sh 'npm install react-scripts@3.4.3 -g'
                    }
                }

                stage('ECR Login') {
                    container('awscli') {
                        sh "aws ecr get-login-password --region ap-northeast-2"
                        ecr_credential = sh(script: "aws ecr get-login-password --region ap-northeast-2", returnStdout:true)
                    }
                }

                stage('Build Docker Image') {
                    container('docker') {
                        sh "docker build -t ${image_tag} -f ./CICD/Dockerfile ."
                        sh "docker login -u AWS -p '${ecr_credential}' ${ecr_url}"
                        sh "docker push ${image_tag}"
                    }
                }

                stage('k8s deploy image = ${image_tag}') {
                    container('kubectl') {
                        sh "kubectl apply -f CICD/Deployment.yaml"
                        //sh "kubectl get pod,svc,ingress,deployment -n ${namespace} -l app=${app}"
                        sh "kubectl get pod,svc,ingress,deployment -n ${namespace} --show-labels"
                    }
                }
        }
}
