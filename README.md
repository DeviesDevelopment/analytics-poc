# Analytics without third-party tools

A POC for collecting user behaviour data from any React app using no third-party libraries.

Live demo: http://devies-analytics-poc.s3-website-eu-west-1.amazonaws.com/

Read more about this experiment in [this blog post](https://sundin.github.io/implementation/2020/09/01/analytics-poc.html).

## How it works

Every time the path changes, an event is stored in the [Analytics](frontend/src/Analytics.jsx) component. When the browser session ends, all the collected events are sent (together with some metadata) in a single request to a lambda endpoint. The lambda then parses the data and saves it to a DynamoDB table.

This means that for every user session, only a single request is sent to the analytics endpoint, making this approach very lightweight.

## Local development

The backend needs to be deployed (see below) for any meaningful data to be displayed when running the application locally.

Configuration:
* Take the URL retrieved in the final step of backend deployment below and insert into [.env](frontend/.env) (no trailing slash).

### Launch frontend locally

    cd frontend
    npm ci
    npm start

## Deployment

Both the backend and frontend are deployed automatically when pushing to the master branch. For this to work, AWS IAM credentials and added to as Github Secrets under the keys `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

You can also deploy manually from your local computer as described in the following sections.

### Deploy backend

Prerequisites:
* Install [aws](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html) or [aws2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) CLI tool.
* Install [sam](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) CLI tool.
* Make sure the bucket `devies-analytics-poc` exists (again, replace with your own bucket name since bucket names are unique).

Package and deploy changes:

    cd backend

    sam package \
        --template-file template.yml \
        --output-template-file packaged.yml \
        --s3-bucket devies-analytics-poc

    sam deploy \
        --template-file packaged.yml \
        --stack-name devies-analytics-poc \
        --capabilities CAPABILITY_IAM \
        --region eu-west-1

Get the base URL for the API:

    aws2 cloudformation describe-stacks \
        --stack-name devies-analytics-poc \
        --region eu-west-1 \
        --query 'Stacks[].Outputs'

### Deploy frontend

Prerequisites:
* Install [aws](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html) or [aws2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) CLI tool.
* Make sure the bucket `devies-analytics-poc` exists (although bucket names need to be unique, so replace this with your own bucket names in all the follwing commands).
* Turn off "Block all public access" for the S3 bucket (under Permissions).
* Turn on "Static website hosting" for the S3 bucket (under Properties). Enter `index.html` as both Index document and Error document (the 404 page can be handled from within React instead).

Configuration:
* Take the URL retrieved in the final step of backend deployment above and insert into [.env](frontend/.env) (no trailing slash).

Publish to S3 bucket:

    cd frontend
    npm ci
    npm run build
    aws2 s3 sync build s3://devies-analytics-poc --region eu-west-1 --acl public-read

## Learnings

* User behaviour analytics can be collected anonymously without the need for any big tool or framework.
* SAM works great for quickly getting a POC up and running.
* Using DynamoDB DocumentClient when writing to Dynamo using JavaScript means you don't have to care about schemas.

## References

* Idea and some of the implementation taken from here: https://www.pcmaffey.com/roll-your-own-analytics/
* More details about this experiment can be found in my [blog post](https://sundin.github.io/implementation/2020/09/01/analytics-poc.html).

## Authors

* [Sundin](https://github.com/Sundin)
* [Dunklas](https://github.com/dunklas)
