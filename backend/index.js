console.log('Loading function');

var AWS = require('aws-sdk');
//var dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let responseBody = {
        message: "success"
    };
    
    let response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };

    console.log("response: " + JSON.stringify(response));

    callback(null, response);
};
