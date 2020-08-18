# DPAP Analytics POC

A POC for collecting user analytics in DPAP from the innovation days.

## Launch frontend

    cd frontend

    npm install

    npm start

## Deploying backend

Make sure the bucket `dpap-analytics-poc` exists.

    sam package --template-file template.yml --output-template-file packaged.yml --s3-bucket dpap-analytics-poc --profile vwdpeu-iot

    sam deploy --template-file packaged.yml --stack-name dpap-analytics-poc  --capabilities CAPABILITY_IAM --profile vwdpeu-iot --region eu-west-1 

Get the base URL for the API:

    aws cloudformation describe-stacks \
        --stack-name dpap-analytics-poc \
        --profile vwdpeu-iot \
        --region eu-west-1 \
        --query 'Stacks[].Outputs'

## References

https://www.pcmaffey.com/roll-your-own-analytics/
