pipeline {
    agent any
    environment {
        USERNAME = 'Teresa Oyarce'
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
                    docker.withRegistry('http://localhost:8082', '2289d21a-da56-4a4c-afaf-245fd81b42c7') {
                        sh 'docker build -t backend-base-devops:latest .'
                        sh "docker tag backend-base:latest localhost:8082/backend-base-devops:latest"
                        sh 'docker push localhost:8082/backend-base-devops:latest'
                        
                    }
                }
            }
        }
        stage('Deploy'){
            steps {
                script {
                    
                  
                    docker.withRegistry('http://localhost:8082', '2289d21a-da56-4a4c-afaf-245fd81b42c7') {
                        
                            sh "docker compose pull"
                            sh "docker compose --env-file .env up -d --force-recreate"
                        
                    }
                }
            }
        }
    }
}