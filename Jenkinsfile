pipeline {
    agent any
    stages {
        stage ('Sequential') {
            stage('Clone') {
                steps {
                    git url: 'https://github.com/yoanymora/js_automation_exercise.git', branch: 'api-testing'
                }
            }
            stage('Run UI Tests') {
                steps {
                    sh '''
                        cd src
                        npm install
                        npm run wdio
                    '''
                }
            }
            stage('UI Results') {
                junit '**/ui/reports/junit/*.xml'
            }
            stage('Run API Tests') {
                steps {
                    sh '''
                        npm run supertest
                    '''
                }
            }
        }
    }
}
