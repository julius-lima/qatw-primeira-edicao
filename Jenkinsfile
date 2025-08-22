pipeline {
    agent {
        docker {
            image 'juliocsllima/playwright-nj-v1.54.2-noble'
            args '--network  qatw-primeira-edicao_skynet'
        }
    }
    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Testes') {
            steps {
                sh 'npx playwright test'
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }       
        }
    }
}