# sends-to-s3-then-to-slack
It sends a file to s3 and then the generated link to slack

``
  npm i @danillosantos/sends-to-s3-then-to-slack
``
  

  This module is meant to be used in Bitbucket Pipelines, uploading a generated APK file. But it can be used for any file.
  
  Used environment variables:
  
- AWS_ACCESS_KEY
- AWS_SECRET_KEY
- FILE_PATH
- BUCKET_NAME
- BITBUCKET_BUILD_NUMBER (provided by Bitbucket Pipelines)
- BITBUCKET_BRANCH (provided by Bitbucket Pipelines)
- BITBUCKET_REPO_SLUG (provided by Bitbucket Pipelines)
- SLACK_TOKEN
- SLACK_CHANNEL

