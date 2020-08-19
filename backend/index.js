var AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_REGION});

var ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async function(request, context, callback) {
    console.log('Received body:', JSON.stringify(request.body, null, 2));

    const body = JSON.parse(request.body);

    const events = body.events;
    const pageLoad = body.pageLoad;
    const userAgent = request.headers["User-Agent"];
    const sessionEnd = Date.now();

    for (let i = 0; i < events.length - 1; i++) {
        events[i].duration = events[i+1].timestamp - events[i].timestamp;
    }

    events[events.length - 1].duration = sessionEnd - events[events.length - 1].timestamp;

    for (let i = 0; i < events.length; i++) {
        events[i].timestamp = formatDateFull(events[i].timestamp);
    }


    var params = {
        TableName: process.env.DynamoTableName,
        Item: {
            'date': formatDateShort(sessionEnd),
            'timestamp-unique': `${sessionEnd}-${randomId()}`,
            'events': events,
            'pageLoad': pageLoad,
            'browser': userAgent,
            'sessionEnd': formatDateFull(sessionEnd)
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

function randomId() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDateFull(timestamp) {
    return new Date(timestamp).toISOString();
}

function formatDateShort(timestamp) {
    const d = new Date(timestamp);
    return d.getFullYear()
    + '-'
    + ('0' + (d.getMonth() + 1)).slice(-2)
    + '-'
    + ('0' + d.getDate()).slice(-2);
}
