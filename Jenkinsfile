pipeline {
    agent any
    environment {
        WEBSITE_MOUNT = '/website/lumunarr'
        BUILD_CRED = credentials('lumunarr-org-increment')
        WORK_DIR = credentials('external_dir')
    }
    options {
        timeout(time: 10, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '3'))
    }
    stages {
        stage('Build') {
            when {
                branch 'main'
            }
            steps {
                script {
                    def buildNum = sh(script: 'curl -s https://increment.build/${BUILD_CRED} || echo "manual"', returnStdout: true).trim()
                    echo "Build number: ${buildNum}"

                    def hostWorkspace = WORKSPACE.replace('/var/jenkins_home', WORK_DIR)
                    // TEMP debug: show the bind-mount path without the masked secret
                    echo "WORKSPACE: ${WORKSPACE}"
                    echo "Host path: ${hostWorkspace.replace(WORK_DIR, '<WORK_DIR>')}"

                    sh """
                        docker run --rm \
                          -v "${hostWorkspace}":/app \
                          -w /app \
                          -e BUILD_NUMBER=${buildNum} \
                          node:26-alpine \
                          sh -c "npm ci && npm run build"
                    """
                }
            }
        }
        stage('Deploy to Filesystem') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    find ${WEBSITE_MOUNT} -mindepth 1 -delete
                    cp -a build/. ${WEBSITE_MOUNT}/
                    touch ${WEBSITE_MOUNT}/index.html
                """
            }
        }
    }
}
