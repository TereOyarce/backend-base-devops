pipeline {
    agent any
    environment {
        USERNAME = 'Teresa Oyarce'
        API_KEY = "12345"
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Build and test') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19' 
                    reuseNode true
                }
            }
            stages {
               stage('Instalar dependencias') {
                   steps {
                       sh 'npm install'
                   }
               } 
                stage('ejecucion de test') {
                   steps {
                       sh 'npm run test'
                   }
               } 
                stage('ejecucion de build') {
                   steps {
                       sh 'npm run build'
                   }
               } 
            }
        }
        stage('Code Quality'){
            stages {
                stage('SonarQube Analisis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli' 
                            args '--network="backend-base-devops_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner'
                        }
                    }
                }
             
            }
        }
        stage('Delivery'){
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t backend-base-devops:latest .'
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest"
                        sh 'docker push localhost:8082/backend-base-devops:latest'
                        
                    }
                }
            }
        }
        stage('Deploy'){
            steps {
                script {
                    
                    if (env.BRANCH_NAME == 'main') {
                        ambiente = 'prd'
                    } else {
                        ambiente = 'dev'
                    }
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                       sh "docker compose pull"
                       sh "docker compose up  --build -d"
                    }
                }
            }
        }
    }
}