# DPAP Analytics POC

A POC for collecting user analytics in DPAP (or any other React app), developed during the innovation days.

Live demo: http://dpap-analytics-poc.s3-website-eu-west-1.amazonaws.com/

## How it works

Every time the path changes, an event is stored in the Analytics component. When the browser session ends, all the collected events are sent (together with some metadata) in a single request to a lambda endpoint. The lambda then parses the data and saves it to a DynamoDB table.

This means that for every user session, only a single request is sent to the analytics endpoint, making this approach very lightweight.

## Launch frontend

    cd frontend

    npm install

    npm start

## Deploying frontend

Publish to S3 bucket:

    cd frontend
    npm run build
    aws2 s3 sync build s3://dpap-analytics-poc --profile vwdpeu-iot --region eu-west-1 --acl public-read

## Deploying backend

Prerequisites:
* Install [aws](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html) or [aws2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) CLI tool.
* Install [sam](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) CLI tool.
* Make sure the bucket `dpap-analytics-poc` exists.

Package and deploy changes:

    cd backend
    sam package \
        --template-file template.yml \
        --output-template-file packaged.yml \
        --s3-bucket dpap-analytics-poc \
        --profile vwdpeu-iot

    sam deploy \
        --template-file packaged.yml \
        --stack-name dpap-analytics-poc \
        --capabilities CAPABILITY_IAM \
        --profile vwdpeu-iot \
        --region eu-west-1

Get the base URL for the API:

    aws2 cloudformation describe-stacks \
        --stack-name dpap-analytics-poc \
        --profile vwdpeu-iot \
        --region eu-west-1 \
        --query 'Stacks[].Outputs'

## Learnings

* User behaviour analytics can be collected anonymously without the need for any big tool or framework.
* SAM works great for quickly getting a POC up and running.
* Using DynamoDB DocumentClient when writing to Dynamo using JavaScript means you don't have to care about schemas.

## References

* Idea and some of the implementation taken from here: https://www.pcmaffey.com/roll-your-own-analytics/
