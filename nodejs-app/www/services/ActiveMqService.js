import stompit from "stompit"


const connectOptions = {
    'host': 'localhost',
    'port': 61613,
    'connectHeaders': {
        'host': '/',
        'login': 'myuser',
        'passcode': 'mypwd',
        'heart-beat': '5000,5000'
    }
};

const sendHeaders = {
    'destination': 'fr.cpe.spring-app.in',
    'content-type': 'text/plain'
};

const subscribeHeaders = {
    'destination': 'fr.cpe.nodejs-app.in',
    'ack': 'client-individual'
};

class ActiveMqService {


    constructor(connectOptions, sendHeaders, subscribeHeaders) {
        this.connectOptions = connectOptions;
        this.sendHeaders = sendHeaders;
        this.subscribeHeaders = subscribeHeaders;

    }

    postMessage(jsonString, callback) {
        stompit.connect(connectOptions, (error, client) => {

            if (error) return callback(new Error('STOMPIT connect error ' + error.message));

            //EMIT
            const frame = client.send(sendHeaders);
            frame.write(jsonString);
            frame.end();

            //RECEIVE
            client.subscribe(subscribeHeaders, function (error, message) {

                if (error) return callback(new Error('STOMPIT subscribe error ' + error.message));

                message.readString('utf-8', (error, body) => {

                    if (error) return callback(new Error('read message error ' + error.message));

                    callback(null, body);

                    client.ack(message);

                    client.disconnect();
                });
            });



        })
    }




}


export default new ActiveMqService(connectOptions, sendHeaders, subscribeHeaders);