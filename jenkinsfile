pipeline {
    agent any

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E') {
            steps {
                sh 'npx playwright test'
            }       
    }
}
