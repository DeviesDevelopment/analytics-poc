var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

var ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function(event, context, callback) {
    console.log('Received body:', JSON.stringify(event.body, null, 2));

    var params = {
        TableName: process.env.DynamoTableName,
        Item: {
            'id': uuidv4(),
            'events': JSON.parse(event.body)
        }
    };

    return new Promise((resolve, reject) => {
        ddb.put(params, function(err, data) {
            if (err) {
                console.log("Error", err);
                reject(Error(err));
            } else {
                console.log("Success", data);
                resolve(200);
            }
        });
    });
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}