pipeline {
    agent any
    stages {

        stage("Build")
        {
            steps
            {
                script {
                        echo "INFO: Build Stage"
                        echo xml_parser
                        sh 'sed -i "s/libxmljs2/${xml_parser}/g" server.js'
                        sh 'sed -i "s/libxmljs2/${xml_parser}/g" package.json'
                        sh 'sed -i "s/noent:true/noent:false/g" server.js' // hotfix
                        withCredentials([file(credentialsId: 'd22d3b5e-68c2-4519-8aa9-8d9db8ee178f', variable: 'flag')]) {
                            writeFile file: 'flag', text: readFile(flag)
                        }
                        sh 'docker build -t payment-order-service:latest .'
                    }
            }
        }

        stage("Deploy")
        {
            steps
            {
                script {
                            echo "INFO: Deploy Stage"
                            sh 'docker rm -f payment-order-service || true'
                            sh 'docker run --restart always -p 3000:3000 -d --name payment-order-service payment-order-service:latest'
                            echo "INFO: Deployed"
                    }
            }
        }
    }
}