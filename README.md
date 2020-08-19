# DPAP Analytics POC

A POC for collecting user analytics in DPAP from the innovation days.

## Launch frontend

    cd frontend

    npm install

    npm start

## Deploying backend

Pre-requisites:
* Install aws or aws2 CLI tool.
* Install sam CLI tool.
* Make sure the bucket `dpap-analytics-poc` exists.

Package and deploy changes:

    sam package --template-file template.yml --output-template-file packaged.yml --s3-bucket dpap-analytics-poc --profile vwdpeu-iot

    sam deploy --template-file packaged.yml --stack-name dpap-analytics-poc  --capabilities CAPABILITY_IAM --profile vwdpeu-iot --region eu-west-1 

Get the base URL for the API:

    aws cloudformation describe-stacks \
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
